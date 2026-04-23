import type { Template, Palette } from './types';
import palettesJson from '../data/palettes.json';

const modules = import.meta.glob<{ default: Template }>(
  '../data/templates/*.json',
  { eager: true },
);

export const templates: Template[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.title.localeCompare(b.title));

export const palettes: Palette[] = palettesJson as Palette[];

const paletteById = new Map(palettes.map((p) => [p.id, p]));

export function getTemplate(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getPalette(id: string): Palette {
  const p = paletteById.get(id);
  if (!p) throw new Error(`Unknown palette id: ${id}`);
  return p;
}

export function relatedTemplates(t: Template, limit = 3): Template[] {
  return templates.filter((other) => other.slug !== t.slug && other.category === t.category).slice(0, limit);
}
