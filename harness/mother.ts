/**
 * SliToPro Harness — Mother Orchestrator (v2)
 *
 * Pipeline per template:
 *   seed.yaml
 *     → generator agent          → template metadata
 *     → for each kind in [title, content]:
 *         → example-planner agent → { layoutNotes, promptCore }
 *         → slide-renderer agent  → svg
 *     → assemble template
 *     → validator
 *     → src/data/templates/{slug}.json
 *
 * Uses @anthropic-ai/claude-agent-sdk. Auth via Claude Code's local login.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { query } from '@anthropic-ai/claude-agent-sdk';
import {
  TemplateSchema,
  validateFile,
  CATEGORIES,
  EXAMPLE_KINDS,
} from './validator.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const SEEDS_DIR = path.join(REPO_ROOT, 'harness/seeds');
const DRAFTS_DIR = path.join(REPO_ROOT, 'harness/drafts');
const TEMPLATES_DIR = path.join(REPO_ROOT, 'src/data/templates');
const AGENTS_DIR = path.join(REPO_ROOT, 'harness/agents');
const PALETTES_PATH = path.join(REPO_ROOT, 'src/data/palettes.json');

const TEXT_MODEL = process.env.HARNESS_TEXT_MODEL ?? 'sonnet';
const RENDER_MODEL = process.env.HARNESS_RENDER_MODEL ?? 'opus';
const MAX_RETRIES = 2;

interface Seed {
  id: string;
  category: string;
  brief: string;
  constraints?: string[];
  inspiration?: string[];
  paletteHint?: string;
}

interface PaletteRecord {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
}

const palettes: PaletteRecord[] = JSON.parse(fs.readFileSync(PALETTES_PATH, 'utf-8'));
const paletteById = new Map(palettes.map((p) => [p.id, p]));

function loadAgent(name: string): string {
  return fs.readFileSync(path.join(AGENTS_DIR, `${name}.md`), 'utf-8');
}

function loadSeed(seedPath: string): Seed {
  const raw = fs.readFileSync(seedPath, 'utf-8');
  const parsed = yaml.load(raw) as Seed;
  if (!parsed?.id || !parsed.category) {
    throw new Error(`Seed ${seedPath} missing required fields (id, category)`);
  }
  if (!CATEGORIES.includes(parsed.category as (typeof CATEGORIES)[number])) {
    throw new Error(`Seed ${seedPath} has unknown category "${parsed.category}"`);
  }
  return parsed;
}

async function runAgent(systemPrompt: string, userPrompt: string, model: string): Promise<string> {
  const chunks: string[] = [];
  for await (const message of query({
    prompt: userPrompt,
    options: { systemPrompt, model, tools: [], maxTurns: 1 },
  })) {
    if (message.type === 'assistant') {
      for (const block of message.message.content) {
        if (block.type === 'text') chunks.push(block.text);
      }
    }
  }
  return chunks.join('').trim();
}

function stripJsonFences(text: string): string {
  let s = text.trim();
  if (s.startsWith('```')) {
    s = s.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }
  return s.trim();
}

function stripSvgFences(text: string): string {
  let s = text.trim();
  if (s.startsWith('```')) {
    s = s.replace(/^```(?:svg|xml)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }
  // Strip XML prolog if present
  s = s.replace(/^<\?xml[^?]*\?>\s*/, '');
  return s.trim();
}

const today = () => new Date().toISOString().slice(0, 10);

function paletteListForGenerator(): string {
  return palettes
    .map((p) => `- ${p.id}  (${p.name})  primary ${p.primary}, secondary ${p.secondary}, accent ${p.accent}, neutral ${p.neutral}`)
    .join('\n');
}

function buildGeneratorPrompt(seed: Seed): string {
  return `Today's date: ${today()}

Allowed categories: ${CATEGORIES.join(', ')}

Available palettes (pick the BEST id for this seed):
${paletteListForGenerator()}

SEED:
\`\`\`yaml
${yaml.dump(seed).trim()}
\`\`\`

Produce the template metadata JSON per the schema. Output JSON only.`;
}

function buildPlannerPrompt(metadata: Record<string, unknown>, kind: string): string {
  return `Template metadata:
\`\`\`json
${JSON.stringify(metadata, null, 2)}
\`\`\`

Now produce { layoutNotes, promptCore } for the **${kind}** slide of this template. JSON only.`;
}

function buildRendererPrompt(
  metadata: Record<string, unknown>,
  kind: string,
  layoutNotes: string,
  promptCore: string,
  palette: PaletteRecord,
): string {
  return `Template: ${metadata.title}
Category: ${metadata.category}
Slide kind: ${kind}

Design philosophy:
${metadata.philosophy}

Layout for this slide:
${layoutNotes}

Mood for this slide:
${promptCore}

Palette — use ONLY these four hex values:
- primary:   ${palette.primary}
- secondary: ${palette.secondary}
- accent:    ${palette.accent}
- neutral:   ${palette.neutral}

Output the SVG only. Begin with <svg and end with </svg>.`;
}

interface GeneratedMetadata {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  philosophy: string;
  tags: string[];
  defaultPaletteId: string;
  goodFor: string[];
  avoidFor: string[];
  createdAt: string;
  author: string;
}

async function runGenerator(seed: Seed): Promise<GeneratedMetadata> {
  const sys = loadAgent('generator');
  let userPrompt = buildGeneratorPrompt(seed);
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const raw = await runAgent(sys, userPrompt, TEXT_MODEL);
    const cleaned = stripJsonFences(raw);
    fs.writeFileSync(path.join(DRAFTS_DIR, `${seed.id}.metadata.json`), cleaned);
    let parsed: GeneratedMetadata;
    try {
      parsed = JSON.parse(cleaned) as GeneratedMetadata;
    } catch (e) {
      userPrompt = `${buildGeneratorPrompt(seed)}\n\nPREVIOUS ATTEMPT WAS NOT VALID JSON:\n${(e as Error).message}\n\nTry again. Output JSON only.`;
      continue;
    }
    if (!paletteById.has(parsed.defaultPaletteId)) {
      userPrompt = `${buildGeneratorPrompt(seed)}\n\nPREVIOUS ATTEMPT picked unknown defaultPaletteId "${parsed.defaultPaletteId}". Pick one from the list. Output JSON only.`;
      continue;
    }
    if (parsed.id !== seed.id || parsed.slug !== seed.id || parsed.category !== seed.category) {
      userPrompt = `${buildGeneratorPrompt(seed)}\n\nPREVIOUS ATTEMPT had wrong id/slug/category. id and slug must equal "${seed.id}", category must be "${seed.category}". Output JSON only.`;
      continue;
    }
    return parsed;
  }
  throw new Error(`generator failed after ${MAX_RETRIES + 1} attempts`);
}

interface PlannerOutput {
  layoutNotes: string;
  promptCore: string;
}

async function runPlanner(metadata: GeneratedMetadata, kind: string): Promise<PlannerOutput> {
  const sys = loadAgent('example-planner');
  let userPrompt = buildPlannerPrompt(metadata as unknown as Record<string, unknown>, kind);
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const raw = await runAgent(sys, userPrompt, TEXT_MODEL);
    const cleaned = stripJsonFences(raw);
    let parsed: PlannerOutput;
    try {
      parsed = JSON.parse(cleaned) as PlannerOutput;
    } catch (e) {
      userPrompt = `${buildPlannerPrompt(metadata as unknown as Record<string, unknown>, kind)}\n\nPREVIOUS ATTEMPT WAS NOT VALID JSON:\n${(e as Error).message}\n\nOutput JSON only.`;
      continue;
    }
    if (!parsed.layoutNotes || parsed.layoutNotes.length < 30) {
      userPrompt = `${buildPlannerPrompt(metadata as unknown as Record<string, unknown>, kind)}\n\nPREVIOUS layoutNotes too short. Try again.`;
      continue;
    }
    if (!parsed.promptCore || parsed.promptCore.length < 120) {
      userPrompt = `${buildPlannerPrompt(metadata as unknown as Record<string, unknown>, kind)}\n\nPREVIOUS promptCore too short (need ${parsed.promptCore?.length ?? 0} → 120+ chars).`;
      continue;
    }
    if (/#[0-9a-fA-F]{6}/.test(parsed.promptCore)) {
      userPrompt = `${buildPlannerPrompt(metadata as unknown as Record<string, unknown>, kind)}\n\nPREVIOUS promptCore contained hex colors — it must NOT.`;
      continue;
    }
    return parsed;
  }
  throw new Error(`planner failed for ${kind} after ${MAX_RETRIES + 1} attempts`);
}

async function runRenderer(
  metadata: GeneratedMetadata,
  kind: string,
  plan: PlannerOutput,
  palette: PaletteRecord,
): Promise<string> {
  const sys = loadAgent('slide-renderer');
  let userPrompt = buildRendererPrompt(metadata as unknown as Record<string, unknown>, kind, plan.layoutNotes, plan.promptCore, palette);
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const raw = await runAgent(sys, userPrompt, RENDER_MODEL);
    const cleaned = stripSvgFences(raw);
    if (!cleaned.startsWith('<svg') || !cleaned.endsWith('</svg>')) {
      userPrompt = `${buildRendererPrompt(metadata as unknown as Record<string, unknown>, kind, plan.layoutNotes, plan.promptCore, palette)}\n\nPREVIOUS ATTEMPT did not start with <svg or end with </svg>. Output ONLY the SVG.`;
      continue;
    }
    if (cleaned.length < 200) {
      userPrompt = `${buildRendererPrompt(metadata as unknown as Record<string, unknown>, kind, plan.layoutNotes, plan.promptCore, palette)}\n\nPREVIOUS SVG too short — needs real composition, not just a rectangle. Try again.`;
      continue;
    }
    return cleaned;
  }
  throw new Error(`renderer failed for ${kind} after ${MAX_RETRIES + 1} attempts`);
}

interface RunResult {
  ok: boolean;
  outputPath?: string;
  errors?: string[];
}

async function processOne(seedPath: string): Promise<RunResult> {
  const seed = loadSeed(seedPath);
  const slug = seed.id;
  console.log(`\n→ ${slug} (${seed.category})`);

  fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true });

  let metadata: GeneratedMetadata;
  try {
    console.log(`  [generator]`);
    metadata = await runGenerator(seed);
  } catch (e) {
    return { ok: false, errors: [(e as Error).message] };
  }

  const palette = paletteById.get(metadata.defaultPaletteId)!;

  const examples: { kind: string; promptCore: string; svg: string; layoutNotes: string }[] = [];
  for (const kind of EXAMPLE_KINDS) {
    try {
      console.log(`  [planner:${kind}]`);
      const plan = await runPlanner(metadata, kind);
      console.log(`  [renderer:${kind}]`);
      const svg = await runRenderer(metadata, kind, plan, palette);
      examples.push({ kind, promptCore: plan.promptCore, svg, layoutNotes: plan.layoutNotes });
    } catch (e) {
      return { ok: false, errors: [`example ${kind} failed: ${(e as Error).message}`] };
    }
  }

  const final = {
    ...metadata,
    createdAt: today(),
    author: 'harness',
    examples,
  };

  const finalPath = path.join(TEMPLATES_DIR, `${slug}.json`);
  fs.writeFileSync(finalPath, JSON.stringify(final, null, 2) + '\n');

  // Validate via Zod
  const result = TemplateSchema.safeParse(JSON.parse(fs.readFileSync(finalPath, 'utf-8')));
  if (!result.success) {
    return {
      ok: false,
      outputPath: finalPath,
      errors: result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
    };
  }

  // Run file-level validator (id/slug/filename/palette existence)
  const fileIssues = validateFile(finalPath);
  const errors = fileIssues.filter((i) => i.level === 'error');
  if (errors.length > 0) {
    return { ok: false, outputPath: finalPath, errors: errors.map((e) => e.message) };
  }

  console.log(`  ✓ ${path.relative(REPO_ROOT, finalPath)}`);
  return { ok: true, outputPath: finalPath };
}

async function main() {
  const args = process.argv.slice(2);
  let seedPaths: string[];

  if (args.includes('--all')) {
    if (!fs.existsSync(SEEDS_DIR)) {
      console.error(`Seeds directory not found: ${SEEDS_DIR}`);
      process.exit(1);
    }
    seedPaths = fs
      .readdirSync(SEEDS_DIR)
      .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
      .map((f) => path.join(SEEDS_DIR, f));
  } else {
    seedPaths = args.filter((a) => !a.startsWith('--')).map((a) => path.resolve(a));
  }

  if (seedPaths.length === 0) {
    console.error('Usage: pnpm harness <seed.yaml> [more seeds...]   |   pnpm harness:all');
    process.exit(1);
  }

  const results: { seed: string; result: RunResult }[] = [];
  for (const seedPath of seedPaths) {
    try {
      const result = await processOne(seedPath);
      results.push({ seed: seedPath, result });
    } catch (e) {
      results.push({ seed: seedPath, result: { ok: false, errors: [(e as Error).message] } });
    }
  }

  console.log('\n=== Summary ===');
  let failures = 0;
  for (const { seed, result } of results) {
    const name = path.basename(seed);
    if (result.ok) {
      console.log(`✓ ${name}`);
    } else {
      failures++;
      console.log(`✗ ${name}`);
      for (const err of result.errors ?? []) console.log(`    ${err}`);
    }
  }
  console.log(`\n${results.length - failures}/${results.length} succeeded`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
