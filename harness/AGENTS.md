# SliToPro Harness

Offline template generation pipeline. Produces JSON template specs into
`src/data/templates/` for the Astro site to consume at build time.

## How it runs

`harness/mother.ts` is the orchestrator (the "mother"). It uses
`@anthropic-ai/claude-agent-sdk` to invoke two roles in sequence:

1. **Generator** — system prompt: `agents/generator.md`. Input: a seed YAML.
   Output: a draft template JSON with `promptCore: ""`.
2. **Translator** — system prompt: `agents/translator.md`. Input: the draft
   JSON. Output: the `promptCore` string (only). Mother merges it into the
   draft to produce the final template.
3. **Validator** — `validator.ts` runs against the final JSON. On failure, the
   mother retries (with the validation error appended to the prompt) up to
   `MAX_RETRIES`. On success, writes to `src/data/templates/{slug}.json`.

## Usage

```bash
# Single seed
pnpm harness harness/seeds/editorial-academic-01.yaml

# All seeds
pnpm harness:all
```

Drafts land in `harness/drafts/` (gitignored). Final templates land in
`src/data/templates/`. Commit the final templates; the site picks them up.

## Adding a new template

1. Write `harness/seeds/{slug}.yaml` matching the seed schema (see existing seeds).
2. `pnpm harness harness/seeds/{slug}.yaml`.
3. Inspect the output at `src/data/templates/{slug}.json`. If wrong, edit the
   seed and re-run, or manually edit the JSON.
4. Commit.

## Constraints

- No API key required: the SDK uses Claude Code's local auth.
- Each seed → template should complete in under 2 minutes of agent time.
- Validator is strict — invalid templates never reach `src/data/templates/`.
