import { useEffect, useMemo, useState } from 'react';
import type { Template } from '../lib/types';
import { CATEGORIES, CATEGORY_LABEL } from '../lib/types';

interface Props {
  templates: Template[];
}

export default function FilterBar({ templates }: Props) {
  const [category, setCategory] = useState<string>('all');
  const [q, setQ] = useState<string>('');

  const filtered = useMemo(() => {
    const lower = q.trim().toLowerCase();
    return templates.filter((t) => {
      if (category !== 'all' && t.category !== category) return false;
      if (!lower) return true;
      const haystack = [t.title, t.description, t.philosophy, ...t.tags, t.category].join(' ').toLowerCase();
      return haystack.includes(lower);
    });
  }, [templates, category, q]);

  useEffect(() => {
    const visibleSlugs = new Set(filtered.map((t) => t.slug));
    document.querySelectorAll<HTMLElement>('[data-slug]').forEach((el) => {
      const slug = el.dataset.slug!;
      el.style.display = visibleSlugs.has(slug) ? '' : 'none';
    });
    const empty = document.getElementById('empty-state');
    if (empty) empty.style.display = filtered.length === 0 ? '' : 'none';
  }, [filtered]);

  const presentCategories = useMemo(() => {
    const set = new Set(templates.map((t) => t.category));
    return CATEGORIES.filter((c) => set.has(c));
  }, [templates]);

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto] mb-8">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name, tag, mood…"
        className="bg-[#0e0e0e] border border-[var(--color-border)] rounded-md px-4 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-[#0e0e0e] border border-[var(--color-border)] rounded-md px-3 py-2.5 text-sm text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
      >
        <option value="all">All categories ({templates.length})</option>
        {presentCategories.map((c) => (
          <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>
        ))}
      </select>
    </div>
  );
}
