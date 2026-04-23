import { useState } from 'react';

interface Props {
  prompt: string;
}

export default function PromptBlock({ prompt }: Props) {
  const [copied, setCopied] = useState(false);
  const [editable, setEditable] = useState(prompt);

  async function copy() {
    try {
      await navigator.clipboard.writeText(editable);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable; user can still select manually
    }
  }

  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-[#0e0e0e]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)] bg-[#141414]">
        <span className="text-xs uppercase tracking-wider text-[var(--color-muted)]">Prompt — paste into Claude / ChatGPT / Gemini</span>
        <button
          onClick={copy}
          className="text-xs px-3 py-1 rounded-sm border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
        >
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <textarea
        value={editable}
        onChange={(e) => setEditable(e.target.value)}
        spellCheck={false}
        className="w-full bg-transparent p-4 font-mono text-sm text-[var(--color-fg)] leading-relaxed resize-y min-h-[24rem] focus:outline-none"
      />
    </div>
  );
}
