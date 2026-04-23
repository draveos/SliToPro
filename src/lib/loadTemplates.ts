import type { Template } from './types';

const modules = import.meta.glob<{ default: Template }>(
  '../data/templates/*.json',
  { eager: true },
);

export const templates: Template[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.title.localeCompare(b.title));

export function getTemplate(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function relatedTemplates(t: Template, limit = 3): Template[] {
  return templates
    .filter((other) => other.slug !== t.slug)
    .filter((other) => other.style === t.style || other.useCase === t.useCase)
    .slice(0, limit);
}
