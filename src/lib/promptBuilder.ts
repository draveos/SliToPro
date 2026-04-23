import type { Template } from './types';
import { STYLE_LABEL, USE_CASE_LABEL } from './types';

/**
 * Assembles the final user-copyable prompt.
 *
 * Design contract: `template.promptCore` carries only mood/composition/
 * philosophy — no concrete hex values, no font specifics, no layout numbers.
 * Those structured fields are injected here so the user's LLM sees them
 * exactly once.
 */
export function buildPrompt(template: Template): string {
  return `You are designing a single presentation slide.

STYLE: ${STYLE_LABEL[template.style]} — for ${USE_CASE_LABEL[template.useCase]} use
DESCRIPTION: ${template.description}

DESIGN INTENT:
${template.promptCore}

COLORS:
- Primary: ${template.colorPalette.primary}
- Secondary: ${template.colorPalette.secondary}
- Accent: ${template.colorPalette.accent}

TYPOGRAPHY:
- Headings: ${template.typography.heading}
- Body: ${template.typography.body}

LAYOUT:
${template.layoutNotes}

CONTENT TO PLACE:
[Replace this with your slide content: title, bullet points, image descriptions]

OUTPUT: Describe the slide visually in detail, then provide HTML/CSS or SVG code that renders it at 1920x1080.`;
}
