/**
 * One-shot migration: rewrite v1 template JSONs into v2 schema.
 *
 * v1 had: style, useCase, colorPalette, typography, layoutNotes, single promptCore.
 * v2 has: category, examples[{kind, promptCore, svg}], defaultPaletteId, philosophy.
 *
 * For each v1 template:
 *   - map (style, useCase) -> category
 *   - find nearest palette by color distance
 *   - generate placeholder SVGs for title + content examples (palette-tinted)
 *   - move old promptCore into a `philosophy` field (keep as-is for now)
 *   - remove obsolete fields
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(REPO_ROOT, 'src/data/templates');
const PALETTES_PATH = path.join(REPO_ROOT, 'src/data/palettes.json');

interface V1Template {
  id: string;
  title: string;
  slug: string;
  style: string;
  useCase: string;
  previewImage?: string;
  description: string;
  tags: string[];
  colorPalette: { primary: string; secondary: string; accent: string };
  typography: { heading: string; body: string };
  layoutNotes: string;
  promptCore: string;
  goodFor: string[];
  avoidFor: string[];
  createdAt: string;
  author: string;
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

const STYLE_USECASE_TO_CATEGORY: Record<string, string> = {
  'editorial|academic': 'academic-paper',
  'editorial|portfolio': 'editorial-mag',
  'editorial|business': 'editorial-mag',
  'editorial|education': 'academic-paper',
  'brutalist|portfolio': 'brutalist',
  'brutalist|education': 'brutalist',
  'brutalist|pitch': 'brutalist',
  'bento|pitch': 'pitch-hero',
  'bento|product': 'bento-grid',
  'bento|business': 'bento-grid',
  'minimal-corporate|business': 'corporate-pro',
  'minimal-corporate|data': 'data-dashboard',
  'minimal-corporate|pitch': 'corporate-pro',
  'maximalist|education': 'maximalist-collage',
  'maximalist|portfolio': 'maximalist-collage',
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function colorDistance(a: string, b: string): number {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return Math.hypot(r1 - r2, g1 - g2, b1 - b2);
}

function nearestPalette(v1: V1Template['colorPalette']): string {
  let best = palettes[0];
  let bestScore = Infinity;
  for (const p of palettes) {
    const score =
      colorDistance(v1.primary, p.primary) +
      colorDistance(v1.secondary, p.secondary) +
      colorDistance(v1.accent, p.accent);
    if (score < bestScore) {
      bestScore = score;
      best = p;
    }
  }
  return best.id;
}

function isLight(hex: string): boolean {
  const [r, g, b] = hexToRgb(hex);
  return r + g + b > 384;
}

function makeTitleSvg(t: V1Template, p: PaletteRecord): string {
  const textOnPrimary = isLight(p.primary) ? p.secondary : p.secondary;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
  <rect width="1920" height="1080" fill="${p.primary}"/>
  <rect x="160" y="160" width="200" height="6" fill="${p.accent}"/>
  <text x="160" y="320" font-family="Georgia, ui-serif, serif" font-size="120" font-weight="700" fill="${textOnPrimary}">${escapeXml(t.title.split('—')[0].trim() || t.title)}</text>
  <text x="160" y="420" font-family="Georgia, ui-serif, serif" font-size="64" font-weight="400" fill="${p.neutral}" font-style="italic">${escapeXml(t.title.split('—')[1]?.trim() || t.style)}</text>
  <rect x="160" y="900" width="120" height="2" fill="${p.accent}"/>
  <text x="160" y="950" font-family="ui-monospace, monospace" font-size="22" letter-spacing="3" fill="${p.accent}">${t.useCase.toUpperCase()}</text>
  <text x="1760" y="990" text-anchor="end" font-family="ui-monospace, monospace" font-size="20" fill="${p.neutral}">01 / 02</text>
</svg>`;
}

function makeContentSvg(t: V1Template, p: PaletteRecord): string {
  const textOnPrimary = isLight(p.primary) ? p.secondary : p.secondary;
  const bullets = t.goodFor.slice(0, 3);
  const bulletSvg = bullets
    .map((b, i) => {
      const y = 480 + i * 100;
      return `<text x="200" y="${y}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="40" fill="${textOnPrimary}">— ${escapeXml(b.length > 60 ? b.slice(0, 57) + '…' : b)}</text>`;
    })
    .join('\n  ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
  <rect width="1920" height="1080" fill="${p.primary}"/>
  <rect x="160" y="160" width="80" height="6" fill="${p.accent}"/>
  <text x="160" y="280" font-family="Georgia, ui-serif, serif" font-size="80" font-weight="700" fill="${textOnPrimary}">${escapeXml(t.title.split('—')[0].trim() || 'Section')}</text>
  <text x="160" y="360" font-family="ui-sans-serif, system-ui, sans-serif" font-size="32" fill="${p.neutral}">${escapeXml(t.description.length > 80 ? t.description.slice(0, 77) + '…' : t.description)}</text>
  ${bulletSvg}
  <rect x="160" y="900" width="120" height="2" fill="${p.accent}"/>
  <text x="160" y="950" font-family="ui-monospace, monospace" font-size="22" letter-spacing="3" fill="${p.accent}">${t.useCase.toUpperCase()}</text>
  <text x="1760" y="990" text-anchor="end" font-family="ui-monospace, monospace" font-size="20" fill="${p.neutral}">02 / 02</text>
</svg>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function migrate(v1: V1Template) {
  const key = `${v1.style}|${v1.useCase}`;
  const category = STYLE_USECASE_TO_CATEGORY[key];
  if (!category) throw new Error(`No category mapping for ${key}`);

  const paletteId = nearestPalette(v1.colorPalette);
  const palette = palettes.find((p) => p.id === paletteId)!;

  const titleSvg = makeTitleSvg(v1, palette);
  const contentSvg = makeContentSvg(v1, palette);

  return {
    id: v1.id,
    slug: v1.slug,
    title: v1.title,
    category,
    description: v1.description,
    philosophy: v1.promptCore,
    tags: v1.tags,
    examples: [
      {
        kind: 'title',
        promptCore: v1.promptCore,
        svg: titleSvg,
        layoutNotes: v1.layoutNotes,
      },
      {
        kind: 'content',
        promptCore: v1.promptCore,
        svg: contentSvg,
        layoutNotes: v1.layoutNotes,
      },
    ],
    defaultPaletteId: paletteId,
    goodFor: v1.goodFor,
    avoidFor: v1.avoidFor,
    createdAt: v1.createdAt,
    author: 'harness-migrated',
  };
}

function main() {
  const files = fs.readdirSync(TEMPLATES_DIR).filter((f) => f.endsWith('.json'));
  let migrated = 0;
  let skipped = 0;
  for (const f of files) {
    const full = path.join(TEMPLATES_DIR, f);
    const raw = JSON.parse(fs.readFileSync(full, 'utf-8'));
    if (raw.examples) {
      console.log(`  · ${f} already v2, skip`);
      skipped++;
      continue;
    }
    const v2 = migrate(raw as V1Template);
    fs.writeFileSync(full, JSON.stringify(v2, null, 2) + '\n');
    console.log(`  ✓ ${f} -> ${v2.category} / ${v2.defaultPaletteId}`);
    migrated++;
  }
  console.log(`\n${migrated} migrated, ${skipped} skipped`);
}

main();
