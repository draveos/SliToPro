import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

const HEX = /^#[0-9a-fA-F]{6}$/;
const SLUG = /^[a-z0-9-]+$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const CATEGORIES = [
  'minimalist',
  'aqua-glass',
  'promo-bold',
  'ad-banner',
  'editorial-mag',
  'brutalist',
  'bento-grid',
  'corporate-pro',
  'maximalist-collage',
  'y2k-retro',
  'sketchy-hand',
  'luxe-dark-gold',
  'pastel-soft',
  'data-dashboard',
  'pitch-hero',
  'academic-paper',
  'cyberpunk-neon',
  'earth-tone',
  'newsletter-info',
  'korean-modern',
  'tech-seminar',
  'portfolio',
] as const;

export const EXAMPLE_KINDS = ['title', 'content'] as const;

const ExampleSchema = z.object({
  kind: z.enum(EXAMPLE_KINDS),
  promptCore: z.string().min(80),
  svg: z.string().min(40).regex(/^<svg[\s\S]+<\/svg>\s*$/, 'svg must be a valid <svg>...</svg> string'),
  layoutNotes: z.string().min(20).optional(),
});

export const TemplateSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(SLUG),
  title: z.string().min(1),
  category: z.enum(CATEGORIES),
  description: z.string().min(20).max(400),
  philosophy: z.string().min(40),
  tags: z.array(z.string().min(1)).min(3).max(8),
  examples: z.array(ExampleSchema).length(2),
  defaultPaletteId: z.string().regex(SLUG),
  goodFor: z.array(z.string().min(1)).min(2).max(5),
  avoidFor: z.array(z.string().min(1)).min(2).max(5),
  createdAt: z.string().regex(ISO_DATE),
  author: z.string().min(1),
});

export const PaletteSchema = z.object({
  id: z.string().regex(SLUG),
  name: z.string().min(1),
  primary: z.string().regex(HEX),
  secondary: z.string().regex(HEX),
  accent: z.string().regex(HEX),
  neutral: z.string().regex(HEX),
});

export type ValidatedTemplate = z.infer<typeof TemplateSchema>;
export type ValidatedPalette = z.infer<typeof PaletteSchema>;

export interface ValidationIssue {
  file: string;
  level: 'error' | 'warning';
  message: string;
}

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const TEMPLATES_DIR = path.join(REPO_ROOT, 'src/data/templates');
const PALETTES_PATH = path.join(REPO_ROOT, 'src/data/palettes.json');

function loadPaletteIds(): Set<string> {
  if (!fs.existsSync(PALETTES_PATH)) return new Set();
  const raw = JSON.parse(fs.readFileSync(PALETTES_PATH, 'utf-8'));
  return new Set(raw.map((p: { id: string }) => p.id));
}

export function validateFile(filePath: string, paletteIds?: Set<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const raw = fs.readFileSync(filePath, 'utf-8');

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    issues.push({ file: filePath, level: 'error', message: `Invalid JSON: ${(e as Error).message}` });
    return issues;
  }

  const result = TemplateSchema.safeParse(parsed);
  if (!result.success) {
    for (const issue of result.error.issues) {
      issues.push({
        file: filePath,
        level: 'error',
        message: `${issue.path.join('.')}: ${issue.message}`,
      });
    }
    return issues;
  }

  const data = result.data;

  if (data.id !== data.slug) {
    issues.push({ file: filePath, level: 'error', message: `id (${data.id}) must equal slug (${data.slug})` });
  }

  if (path.basename(filePath) !== `${data.slug}.json`) {
    issues.push({ file: filePath, level: 'error', message: `filename must be ${data.slug}.json` });
  }

  const kinds = data.examples.map((e) => e.kind);
  if (!kinds.includes('title') || !kinds.includes('content')) {
    issues.push({ file: filePath, level: 'error', message: `examples must include both 'title' and 'content' kinds` });
  }

  const ids = paletteIds ?? loadPaletteIds();
  if (ids.size > 0 && !ids.has(data.defaultPaletteId)) {
    issues.push({ file: filePath, level: 'error', message: `defaultPaletteId "${data.defaultPaletteId}" not in palettes.json` });
  }

  return issues;
}

export function validatePalettes(): ValidationIssue[] {
  if (!fs.existsSync(PALETTES_PATH)) return [];
  const raw = JSON.parse(fs.readFileSync(PALETTES_PATH, 'utf-8'));
  const result = z.array(PaletteSchema).safeParse(raw);
  const issues: ValidationIssue[] = [];
  if (!result.success) {
    for (const issue of result.error.issues) {
      issues.push({ file: PALETTES_PATH, level: 'error', message: `${issue.path.join('.')}: ${issue.message}` });
    }
    return issues;
  }
  const seen = new Set<string>();
  for (const p of result.data) {
    if (seen.has(p.id)) issues.push({ file: PALETTES_PATH, level: 'error', message: `duplicate palette id "${p.id}"` });
    seen.add(p.id);
  }
  return issues;
}

export function validateAll(): { ok: boolean; issues: ValidationIssue[] } {
  const allIssues: ValidationIssue[] = [];

  const paletteIssues = validatePalettes();
  allIssues.push(...paletteIssues);

  if (!fs.existsSync(TEMPLATES_DIR)) {
    return { ok: !allIssues.some((i) => i.level === 'error'), issues: allIssues };
  }

  const paletteIds = loadPaletteIds();
  const files = fs
    .readdirSync(TEMPLATES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.join(TEMPLATES_DIR, f));

  const seenIds = new Map<string, string>();
  for (const file of files) {
    const issues = validateFile(file, paletteIds);
    allIssues.push(...issues);

    if (!issues.some((i) => i.level === 'error')) {
      const data = JSON.parse(fs.readFileSync(file, 'utf-8')) as ValidatedTemplate;
      if (seenIds.has(data.id)) {
        allIssues.push({
          file,
          level: 'error',
          message: `Duplicate id "${data.id}" — also in ${seenIds.get(data.id)}`,
        });
      } else {
        seenIds.set(data.id, file);
      }
    }
  }

  const ok = !allIssues.some((i) => i.level === 'error');
  return { ok, issues: allIssues };
}

function reportAndExit(issues: ValidationIssue[], ok: boolean): never {
  for (const issue of issues) {
    const tag = issue.level === 'error' ? 'ERROR' : 'WARN ';
    console.error(`[${tag}] ${path.relative(REPO_ROOT, issue.file)}: ${issue.message}`);
  }
  if (ok) {
    console.log(`OK — ${issues.filter((i) => i.level === 'warning').length} warnings`);
    process.exit(0);
  } else {
    console.error(`FAILED — ${issues.filter((i) => i.level === 'error').length} errors`);
    process.exit(1);
  }
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const arg = process.argv[2];
  if (arg) {
    const issues = validateFile(path.resolve(arg));
    reportAndExit(issues, !issues.some((i) => i.level === 'error'));
  } else {
    const { ok, issues } = validateAll();
    reportAndExit(issues, ok);
  }
}
