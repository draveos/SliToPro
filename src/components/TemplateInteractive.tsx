import { useMemo, useState } from 'react';
import type { Template, Palette, ExampleKind } from '../lib/types';
import { EXAMPLE_KIND_LABEL } from '../lib/types';
import { buildPrompt } from '../lib/promptBuilder';

interface Props {
  template: Template;
  palettes: Palette[];
}

function recolorSvg(svg: string, from: Palette, to: Palette): string {
  if (from.id === to.id) return svg;
  const swaps: Array<[string, string]> = [
    [from.primary, to.primary],
    [from.secondary, to.secondary],
    [from.accent, to.accent],
    [from.neutral, to.neutral],
  ];
  // Use placeholders to avoid chained replacements colliding when colors overlap
  const placeholders = swaps.map((_, i) => `__SWAP_${i}__`);
  let out = svg;
  swaps.forEach(([f], i) => {
    out = out.split(f).join(placeholders[i]);
    out = out.split(f.toLowerCase()).join(placeholders[i]);
    out = out.split(f.toUpperCase()).join(placeholders[i]);
  });
  swaps.forEach(([, t], i) => {
    out = out.split(placeholders[i]).join(t);
  });
  return out;
}

export default function TemplateInteractive({ template, palettes }: Props) {
  const defaultPalette = palettes.find((p) => p.id === template.defaultPaletteId) ?? palettes[0];
  const [paletteId, setPaletteId] = useState<string>(defaultPalette.id);
  const [activeKind, setActiveKind] = useState<ExampleKind>('title');
  const [copied, setCopied] = useState(false);
  const [editPrompt, setEditPrompt] = useState<string | null>(null);

  const palette = palettes.find((p) => p.id === paletteId) ?? defaultPalette;

  const recoloredExamples = useMemo(() => {
    return template.examples.map((ex) => ({
      ...ex,
      svg: recolorSvg(ex.svg, defaultPalette, palette),
    }));
  }, [template.examples, defaultPalette, palette]);

  const prompt = useMemo(() => buildPrompt(template, activeKind, palette), [template, activeKind, palette]);

  // Reset editable prompt when prompt source changes
  const promptText = editPrompt ?? prompt;
  function resetPrompt() {
    setEditPrompt(null);
  }
  // Re-sync edit buffer when source changes
  useMemo(() => setEditPrompt(null), [prompt]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback: user can select manually
    }
  }

  return (
    <div className="space-y-10">
      {/* Examples row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {recoloredExamples.map((ex) => (
          <button
            key={ex.kind}
            onClick={() => setActiveKind(ex.kind)}
            className={`group block text-left border rounded-lg overflow-hidden bg-[#0e0e0e] transition-all ${
              activeKind === ex.kind ? 'border-[var(--color-accent)]' : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/60'
            }`}
          >
            <div className="aspect-video overflow-hidden border-b border-[var(--color-border)]" dangerouslySetInnerHTML={{ __html: ex.svg.replace('<svg ', '<svg class="block w-full h-auto" ') }} />
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-[var(--color-fg)]">{EXAMPLE_KIND_LABEL[ex.kind]}</span>
              <span className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
                {activeKind === ex.kind ? 'Selected' : 'Click to select'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Palette switcher */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs uppercase tracking-wider text-[var(--color-muted)]">Palette — {palette.name}</h3>
          {paletteId !== defaultPalette.id && (
            <button onClick={() => setPaletteId(defaultPalette.id)} className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
              Reset to default
            </button>
          )}
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
          {palettes.map((p) => (
            <button
              key={p.id}
              onClick={() => setPaletteId(p.id)}
              title={p.name}
              className={`relative h-10 rounded-md border overflow-hidden transition-all ${
                paletteId === p.id ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]' : 'border-[var(--color-border)] hover:border-[var(--color-fg)]/40'
              }`}
            >
              <div className="absolute inset-0 grid grid-cols-4">
                <div style={{ background: p.primary }} />
                <div style={{ background: p.secondary }} />
                <div style={{ background: p.accent }} />
                <div style={{ background: p.neutral }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-2xl">Prompt — {EXAMPLE_KIND_LABEL[activeKind]}</h2>
          <div className="flex items-center gap-2">
            {editPrompt !== null && (
              <button onClick={resetPrompt} className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">Reset</button>
            )}
            <button
              onClick={copy}
              className="text-xs px-3 py-1.5 rounded-sm border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
        </div>
        <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-[#0e0e0e]">
          <textarea
            value={promptText}
            onChange={(e) => setEditPrompt(e.target.value)}
            spellCheck={false}
            className="w-full bg-transparent p-4 font-mono text-sm text-[var(--color-fg)] leading-relaxed resize-y min-h-[24rem] focus:outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-sm text-[var(--color-muted)]">
          <span>Open in:</span>
          <a href="https://claude.ai/new" target="_blank" rel="noopener" className="px-2.5 py-1 border border-[var(--color-border)] rounded-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">Claude</a>
          <a href="https://chat.openai.com/" target="_blank" rel="noopener" className="px-2.5 py-1 border border-[var(--color-border)] rounded-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">ChatGPT</a>
          <a href="https://gemini.google.com/" target="_blank" rel="noopener" className="px-2.5 py-1 border border-[var(--color-border)] rounded-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">Gemini</a>
        </div>
      </div>
    </div>
  );
}
