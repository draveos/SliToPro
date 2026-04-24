import type { Template, Palette, ExampleKind } from './types';
import { CATEGORY_LABEL } from './types';

/**
 * Assembles the user-copyable prompt for a single example slide of a template,
 * with the chosen palette injected as the only source of concrete colors.
 *
 * `example.promptCore` carries mood/composition only — concrete hex values
 * live in the palette and are added here exactly once.
 */
export function buildPrompt(template: Template, kind: ExampleKind, palette: Palette): string {
  const example = template.examples.find((e) => e.kind === kind);
  if (!example) throw new Error(`Template ${template.slug} has no '${kind}' example`);

  const layout = example.layoutNotes ? `\n\nLAYOUT:\n${example.layoutNotes}` : '';

  return `You are designing a single presentation slide.

CATEGORY: ${CATEGORY_LABEL[template.category]}
TEMPLATE: ${template.title}
DESCRIPTION: ${template.description}

DESIGN PHILOSOPHY:
${template.philosophy}

DESIGN INTENT FOR THIS SLIDE:
${example.promptCore}

PALETTE — "${palette.name}":
- Primary (background or dominant): ${palette.primary}
- Secondary (text or supporting): ${palette.secondary}
- Accent (emphasis, rules, callouts): ${palette.accent}
- Neutral (muted text, borders): ${palette.neutral}${layout}

CONTENT TO PLACE:
[Replace this with your slide content: title, bullet points, stats, image descriptions, etc. If left empty, ASK the user what content they want before drawing.]

OUTPUT: Describe the slide visually in detail, then provide HTML/CSS or SVG code that renders it at 1920x1080.`;
}
