/**
 * SliToPro Harness — Mother Orchestrator
 *
 * Pipeline: seed.yaml → generator → draft.json → translator → promptCore
 *           → merged.json → validator → src/data/templates/{slug}.json
 *
 * Uses @anthropic-ai/claude-agent-sdk. No API key needed — relies on Claude
 * Code's local auth. Caller should be logged in via `claude login` (or have
 * Max subscription auth in place).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { query } from '@anthropic-ai/claude-agent-sdk';
import { TemplateSchema, validateFile, type ValidatedTemplate } from './validator.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const SEEDS_DIR = path.join(REPO_ROOT, 'harness/seeds');
const DRAFTS_DIR = path.join(REPO_ROOT, 'harness/drafts');
const TEMPLATES_DIR = path.join(REPO_ROOT, 'src/data/templates');
const AGENTS_DIR = path.join(REPO_ROOT, 'harness/agents');

const MODEL = process.env.HARNESS_MODEL ?? 'sonnet';
const MAX_RETRIES = 2;

interface Seed {
  id: string;
  style: string;
  useCase: string;
  brief: string;
  constraints?: string[];
  inspiration?: string[];
  colorHint?: string;
}

function loadAgentPrompt(name: string): string {
  return fs.readFileSync(path.join(AGENTS_DIR, `${name}.md`), 'utf-8');
}

function loadSeed(seedPath: string): Seed {
  const raw = fs.readFileSync(seedPath, 'utf-8');
  const parsed = yaml.load(raw) as Seed;
  if (!parsed?.id || !parsed.style || !parsed.useCase) {
    throw new Error(`Seed ${seedPath} missing required fields (id, style, useCase)`);
  }
  return parsed;
}

async function runAgent(systemPrompt: string, userPrompt: string): Promise<string> {
  const chunks: string[] = [];
  for await (const message of query({
    prompt: userPrompt,
    options: {
      systemPrompt,
      model: MODEL,
      tools: [],
      maxTurns: 1,
    },
  })) {
    if (message.type === 'assistant') {
      const content = message.message.content;
      for (const block of content) {
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

function buildGeneratorPrompt(seed: Seed): string {
  const today = new Date().toISOString().slice(0, 10);
  return `Today's date: ${today}

SEED:
\`\`\`yaml
${yaml.dump(seed).trim()}
\`\`\`

Produce the complete template JSON per the schema. Remember: \`promptCore\` is the empty string \`""\`. Output JSON only.`;
}

function buildTranslatorPrompt(draft: object): string {
  return `Here is the complete template JSON. Read all fields, then write only the promptCore paragraph (no JSON wrapping, no quotes, just the raw text).

\`\`\`json
${JSON.stringify(draft, null, 2)}
\`\`\``;
}

function buildRetryPrompt(originalPrompt: string, errorMessages: string[]): string {
  return `${originalPrompt}

PREVIOUS ATTEMPT FAILED VALIDATION:
${errorMessages.map((m) => `- ${m}`).join('\n')}

Try again. Address every error above. Output JSON only.`;
}

interface RunResult {
  ok: boolean;
  outputPath?: string;
  errors?: string[];
}

async function processOne(seedPath: string): Promise<RunResult> {
  const seed = loadSeed(seedPath);
  const slug = seed.id;
  console.log(`\n→ ${slug}`);

  fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true });

  const generatorPrompt = loadAgentPrompt('generator');
  const translatorPrompt = loadAgentPrompt('translator');

  // ---- Stage 1: Generate ----
  let draft: ValidatedTemplate | null = null;
  let userPrompt = buildGeneratorPrompt(seed);
  let lastErrors: string[] = [];

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    console.log(`  [generator] attempt ${attempt + 1}`);
    const raw = await runAgent(generatorPrompt, userPrompt);
    const cleaned = stripJsonFences(raw);
    fs.writeFileSync(path.join(DRAFTS_DIR, `${slug}.draft.json`), cleaned);

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      lastErrors = [`JSON parse error: ${(e as Error).message}`];
      userPrompt = buildRetryPrompt(buildGeneratorPrompt(seed), lastErrors);
      continue;
    }

    // Patch: allow empty promptCore at this stage (translator fills it next)
    const candidate = { ...(parsed as Record<string, unknown>) };
    if (candidate.promptCore === '') candidate.promptCore = 'PLACEHOLDER_FOR_VALIDATOR_'.padEnd(150, '_');
    const result = TemplateSchema.safeParse(candidate);
    if (!result.success) {
      lastErrors = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
      userPrompt = buildRetryPrompt(buildGeneratorPrompt(seed), lastErrors);
      continue;
    }

    draft = result.data;
    draft.promptCore = '';
    break;
  }

  if (!draft) {
    return { ok: false, errors: [`generator failed after ${MAX_RETRIES + 1} attempts`, ...lastErrors] };
  }

  // ---- Stage 2: Translate ----
  let promptCore = '';
  let translatorErrors: string[] = [];

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    console.log(`  [translator] attempt ${attempt + 1}`);
    const promptForTranslator =
      attempt === 0
        ? buildTranslatorPrompt(draft)
        : `${buildTranslatorPrompt(draft)}\n\nPREVIOUS ATTEMPT TOO SHORT OR INVALID:\n${translatorErrors.join('\n')}\n\nTry again. Output the paragraph only.`;
    const raw = await runAgent(translatorPrompt, promptForTranslator);
    const cleaned = raw.replace(/^["'`]+|["'`]+$/g, '').trim();
    if (cleaned.length < 200) {
      translatorErrors = [`promptCore too short (${cleaned.length} chars, need 200+)`];
      continue;
    }
    if (/#[0-9a-fA-F]{6}/.test(cleaned)) {
      translatorErrors = [`promptCore must NOT contain hex color codes`];
      continue;
    }
    promptCore = cleaned;
    break;
  }

  if (!promptCore) {
    return { ok: false, errors: [`translator failed`, ...translatorErrors] };
  }

  // ---- Stage 3: Merge + Validate ----
  const final = { ...draft, promptCore };
  const finalPath = path.join(TEMPLATES_DIR, `${slug}.json`);
  fs.writeFileSync(finalPath, JSON.stringify(final, null, 2) + '\n');

  const issues = validateFile(finalPath);
  const errors = issues.filter((i) => i.level === 'error');
  if (errors.length > 0) {
    return { ok: false, outputPath: finalPath, errors: errors.map((e) => e.message) };
  }

  for (const w of issues.filter((i) => i.level === 'warning')) {
    console.log(`  ⚠ ${w.message}`);
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
