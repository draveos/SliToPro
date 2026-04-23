# SliToPro

**Slide to Prompt.** A static gallery of slide design templates, each paired with a structured prompt you can paste into Claude / ChatGPT / Gemini to generate slides in that style. No accounts, no API, no subscription.

🌐 https://draveos.github.io/SliToPro

## Architecture

Two layers, fully decoupled:

- **Website** (`src/`) — Astro + Tailwind 4 + a single React island. Reads JSON templates at build time. Static output, hosted on GitHub Pages.
- **Harness** (`harness/`) — Local pipeline that *produces* templates. Uses `@anthropic-ai/claude-agent-sdk` to run two agents (generator → translator) per seed and writes validated JSON into `src/data/templates/`.

The website never calls an API. The harness only runs locally when you want to add templates.

## Setup

```bash
pnpm install
pnpm dev          # http://localhost:4321/SliToPro/
pnpm build        # outputs to dist/
pnpm preview
```

Requires Node 20+ and pnpm 10+.

## Generating templates with the harness

```bash
# Single template
pnpm harness harness/seeds/editorial-academic-01.yaml

# All seeds
pnpm harness:all

# Validate everything in src/data/templates/
pnpm validate
```

Auth: the Agent SDK uses Claude Code's local login. If you're signed into Claude Code, the harness works with no API key.

Pick a faster/cheaper model for the harness:
```bash
HARNESS_MODEL=sonnet pnpm harness:all   # default
HARNESS_MODEL=opus pnpm harness:all     # higher quality, slower
```

## Adding a new template

1. Create `harness/seeds/{slug}.yaml` (see existing seeds for the format).
2. Run `pnpm harness harness/seeds/{slug}.yaml`.
3. Inspect the generated JSON at `src/data/templates/{slug}.json`. Edit the seed and re-run if it's off.
4. Commit both the seed and the generated JSON.

The site picks it up on the next build.

## Project structure

```
slitopro/
├── harness/
│   ├── agents/             # System prompts for generator & translator
│   ├── seeds/              # YAML seeds — the human-creative input
│   ├── drafts/             # Intermediate generator output (gitignored)
│   ├── mother.ts           # Orchestrator (Agent SDK)
│   ├── validator.ts        # Zod schema + duplicate/quality checks
│   └── AGENTS.md
├── src/
│   ├── components/         # TemplateCard, FilterBar, PromptBlock, etc.
│   ├── data/templates/     # Final template JSON (one per template)
│   ├── lib/                # types, loadTemplates, promptBuilder
│   ├── layouts/Base.astro
│   └── pages/              # index, /template/[slug], about
└── .github/workflows/deploy.yml
```

## Design contract

`promptCore` (in each template JSON) carries **mood and composition only**. Concrete values — hex colors, typography, layout numerics — live in their own structured fields and are injected once into the user-copyable prompt by `promptBuilder.ts`. This avoids duplication in the final output the user pastes into their LLM.

## Deploy

GitHub Actions builds and deploys to Pages on every push to `main`. The workflow lives at `.github/workflows/deploy.yml`. No secrets needed.

To enable Pages: in repo settings → Pages → Source = "GitHub Actions".

## License

See `LICENSE`.
