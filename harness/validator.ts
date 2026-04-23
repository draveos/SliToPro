import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

const HEX = /^#[0-9a-fA-F]{6}$/;
const SLUG = /^[a-z0-9-]+$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const STYLES = [
  'editorial',
  'brutalist',
  'bento',
  'minimal-corporate',
  'maximalist',
] as const;

export const USE_CASES = [
  'pitch',
  'business',
  'academic',
  'education',
  'portfolio',
  'data',
  'product',
] as const;

export const TemplateSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().regex(SLUG),
  style: z.enum(STYLES),
  useCase: z.enum(USE_CASES),
  previewImage: z.string().startsWith('/previews/'),
  description: z.string().min(20).max(300),
  tags: z.array(z.string().min(1)).min(3).max(8),
  colorPalette: z.object({
    primary: z.string().regex(HEX),
    secondary: z.string().regex(HEX),
    accent: z.string().regex(HEX),
  }),
  typography: z.object({
    heading: z.string().min(1),
    body: z.string().min(1),
  }),
  layoutNotes: z.string().min(20),
  promptCore: z.string().min(120),
  goodFor: z.array(z.string().min(1)).min(2).max(5),
  avoidFor: z.array(z.string().min(1)).min(2).max(5),
  createdAt: z.string().regex(ISO_DATE),
  author: z.string().min(1),
});

export type ValidatedTemplate = z.infer<typeof TemplateSchema>;

export interface ValidationIssue {
  file: string;
  level: 'error' | 'warning';
  message: string;
}

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const TEMPLATES_DIR = path.join(REPO_ROOT, 'src/data/templates');
const PREVIEWS_DIR = path.join(REPO_ROOT, 'public/previews');

export function validateFile(filePath: string): ValidationIssue[] {
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

  const expectedFilename = `${data.slug}.json`;
  if (path.basename(filePath) !== expectedFilename) {
    issues.push({
      file: filePath,
      level: 'error',
      message: `filename must be ${expectedFilename}`,
    });
  }

  const previewName = data.previewImage.replace('/previews/', '');
  const previewPath = path.join(PREVIEWS_DIR, previewName);
  if (!fs.existsSync(previewPath)) {
    issues.push({
      file: filePath,
      level: 'warning',
      message: `previewImage not found at ${previewPath} (placeholder OK during v1)`,
    });
  }

  if (data.promptCore.length < 200) {
    issues.push({
      file: filePath,
      level: 'warning',
      message: `promptCore is short (${data.promptCore.length} chars). Consider regenerating.`,
    });
  }

  return issues;
}

export function validateAll(): { ok: boolean; issues: ValidationIssue[] } {
  if (!fs.existsSync(TEMPLATES_DIR)) {
    return { ok: true, issues: [] };
  }
  const files = fs
    .readdirSync(TEMPLATES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.join(TEMPLATES_DIR, f));

  const allIssues: ValidationIssue[] = [];
  const seenIds = new Map<string, string>();

  for (const file of files) {
    const issues = validateFile(file);
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
