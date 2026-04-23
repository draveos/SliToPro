import { useEffect, useMemo, useState } from 'react';
import type { Template } from '../lib/types';
import { STYLES, USE_CASES, STYLE_LABEL, USE_CASE_LABEL } from '../lib/types';

interface Props {
  templates: Template[];
}

export default function FilterBar({ templates }: Props) {
  const [style, setStyle] = useState<string>('all');
  const [useCase, setUseCase] = useState<string>('all');
  const [q, setQ] = useState<string>('');

  const filtered = useMemo(() => {
    const lower = q.trim().toLowerCase();
    return templates.filter((t) => {
      if (style !== 'all' && t.style !== style) return false;
      if (useCase !== 'all' && t.useCase !== useCase) return false;
      if (!lower) return true;
      const haystack = [t.title, t.description, ...t.tags, t.style, t.useCase].join(' ').toLowerCase();
      return haystack.includes(lower);
    });
  }, [templates, style, useCase, q]);

  useEffect(() => {
    const visibleSlugs = new Set(filtered.map((t) => t.slug));
    document.querySelectorAll<HTMLElement>('[data-slug]').forEach((el) => {
      const slug = el.dataset.slug!;
      el.style.display = visibleSlugs.has(slug) ? '' : 'none';
    });
    const empty = document.getElementById('empty-state');
    if (empty) empty.style.display = filtered.length === 0 ? '' : 'none';
  }, [filtered]);

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto] mb-8">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name, tag, mood…"
        className="bg-[#0e0e0e] border border-[var(--color-border)] rounded-md px-4 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
      />
      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="bg-[#0e0e0e] border border-[var(--color-border)] rounded-md px-3 py-2.5 text-sm text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
      >
        <option value="all">All styles</option>
        {STYLES.map((s) => <option key={s} value={s}>{STYLE_LABEL[s]}</option>)}
      </select>
      <select
        value={useCase}
        onChange={(e) => setUseCase(e.target.value)}
        className="bg-[#0e0e0e] border border-[var(--color-border)] rounded-md px-3 py-2.5 text-sm text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
      >
        <option value="all">All uses</option>
        {USE_CASES.map((u) => <option key={u} value={u}>{USE_CASE_LABEL[u]}</option>)}
      </select>
    </div>
  );
}
