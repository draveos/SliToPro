# Design Reference (slide-renderer appendix)

A vocabulary and quality bar for SVG slide generation. Distilled from
designer-built reference assets. Use what fits the template's category
and slide kind — not everything every time.

---

## 1 · Layout reference (1920×1080, 80px margin, 12-col grid)

The 12 column lines sit at these x-coordinates (px from left):
80, 227, 373, 520, 667, 813, 960, 1107, 1253, 1400, 1547, 1693, 1840.

Slide kinds you will render are usually `title` or `content`. Use these
zone patterns as a starting structure — bend them for the category.

**TITLE** — typographic, no body text needed.
- Optional kicker / eyebrow (cols 1–4, ~y=120)
- Headline (cols 1–8 to 1–12, y≈260–520, oversized)
- Optional subtitle/dek (cols 1–6, y≈560–700)
- Footer band: presenter / date / venue OR colophon-style metadata
  (cols 1–12, y≈900–1000)
- Page number: USUALLY OMITTED on title slides.

**CONTENT** — substance: bullets, pull quote, stat, or feature row.
Pick ONE primary content gesture; do not stack multiple.
- Slide title (cols 1–6, y≈140–240)
- Optional kicker above title (y≈110)
- Body region: roughly y=300–880
  - Bullets-3: 3 stacked rows, generous spacing (y=320, 500, 680)
  - Bullets-5: tighter rows at y=300, 410, 520, 630, 740
  - Two-column compare: cols 1–6 vs 7–12, labeled headers
  - Three-up feature: cols 1–4, 5–8, 9–12 with icon/headline/body
  - Pull quote: cols 2–11, oversized, attribution underneath
  - Stat callout: huge numeral cols 1–7, label cols 8–12 OR centered
- Page number bottom-right (cols 11–12, y≈1000)

---

## 2 · Decoration vocabulary

Pick 1–3 per slide. Avoid stacking many (looks busy). The art is
restraint with intent.

### Page numbers / position indicators
- **Corner mono** — small monospace numeral, outer corner. Default.
- **Fraction** — `03 / 12`. Adds urgency in long decks.
- **Progress bar** — thin rule across bottom, partial fill.
- **Section dots** — 3–7 dots, one filled. Good for short decks.
- **Center numeral** — book-style centered with em-dash flourishes. Editorial.
- **Vertical tick rail** — side-margin rule with sunk number. Architectural.
- **Stacked label + numeral** — "CHAPTER · 02".
- **Oversized fraction** — only on closing pages.

### Section labels & kickers
- **Uppercase tracked** — workhorse, mono + high letter-spacing.
- **Numbered + rule** — `01 ── METHOD`. Film-credit energy.
- **Bracket frame** — `[ method ]`. Engineering-manual tone.
- **Pill badges** — multiple small tags. Use sparingly.
- **Underlined kicker** — sans-serif label with accent underline.
- **Serif italic** — lowercase, essayistic, slow.
- **Vertical kicker** — rotated label in the margin.
- **Status dot + label** — colored dot before kicker. "Live" feel.

### Rules & dividers
- **Hairline** — 1px neutral, full width. Quietest, most reliable.
- **Heavy black bar** — short + thick. Above section titles.
- **Dotted** — technical, "cut here".
- **Double rule** — two thin parallels. Newspaper masthead.
- **Asymmetric split** — weighted/unweighted halves, implies direction.
- **Vertical rule** — between columns or signaling a pull-quote.
- **Accent marker bar** — short vertical fill as title marker.
- **Ornamental dots** — centered dingbats. Book-chapter transitions, rare.

### Callouts & emphasis
- **Oversized open quote** — giant serif `"` as visual anchor.
- **Bracket frame** — `[phrase]`, definitional.
- **Asterisk footnote** — `Title*` with bottom note. Honesty.
- **Arrow marker** — `→ takeaway`. The "so what" line.
- **Badge sticker** — tilted round stamp. Once per deck max.
- **Margin annotation** — sidebar note past hairline. Edwardian.
- **Circled word** — hand-drawn ellipse. One per slide.
- **Bracket + label** — `}── label` joining a range to a label.

### Corner treatments
- **Corner ticks** — small L-marks. Cropped-frame feel.
- **Registration marks** — printer's crosshairs diagonally.
- **Crop marks** — perpendicular tick pairs outside trim.
- **Fold marks** — single tick at edge midpoints. Brochure heritage.
- **Rubber stamp** — tilted bordered status label.
- **Single corner dot** — one colored dot. Carries the palette.
- **Dog-eared fold** — triangular corner. "Bookmarked".
- **Serial / ref code** — filing-cabinet metadata. Archival.

### Bullet markers
- **Em-dash** `—` — editorial, letter-from-a-friend.
- **Numbered mono** `01.` — checklist, protocol.
- **Arrow** `→` — directional, cause-effect.
- **Circle states** `○ ◐ ●` — not-started / in-progress / done.
- **Checkbox** `☐` — literal to-do.
- **Geometric shapes** `■ ◆ ▲` — taxonomy via shape.
- **Plus / minus** `+ −` — changelog, pros/cons.
- **Roman numerals** `i. ii.` — classical, contemplative.

### Stat emphasis
- **Oversized display** — huge bold numeral + small caption. Usually right.
- **Mixed-weight unit** — heavy value, thin unit. Magnifies digit.
- **Accent underline** — thick colored bar beneath number.
- **Reverse fill** — dark slide, light number, accent on one digit.
- **Before / after** — old struck-through, arrow, new at full weight.
- **Spelled-out serif** — number written as italic serif word.
- **Stacked fraction** — big numerator + small "out of N".
- **Signed delta** `+12 −3` — emphasizes change-over-time.

### Edge behavior
- **Full bleed** — all four edges. Cinematic, openers.
- **Breathing margin** — generous padding. Editorial, unhurried.
- **Ruled border** — thin hairline rectangle. Diploma, ceremonial.
- **Asymmetric bleed** — color block to one edge only. Magazine-spread.
- **Layered overlap** — foreground panel on full-bleed art.
- **Half-bleed band** — image fills top/bottom half, text fills other.
- **Single-edge rule** — rule only top or bottom. Quiet but structured.
- **Inset card** — slide is a card on tinted pasteboard. App-like.

---

## 3 · Typography personalities

Pick the personality that fits the category. All sizes scale to 1920×1080.

### Scholarly Serif  (academic-paper, editorial-mag, korean-modern)
- eyebrow 34px italic 400
- heading 118px roman 500 with italic 400 emphasized words
- body 32px roman 400, leading 1.55
- caption 20px italic 400
- tracking: heading −1.5%, body 0, caption +1%
- hierarchy: weight contrast (400↔500) + italic vs roman, NOT size alone
- avoid: ALL CAPS heading, wide tracking on serif body

### Geometric Sans Modern  (corporate-pro, minimalist, bento-grid, pitch-hero)
- eyebrow 20px 500 UPPERCASE +18% tracking
- heading 132px 600, leading 1.02
- body 28px 400, leading 1.50
- caption 16px 500 UPPERCASE +18% tracking
- tracking: heading −3.5% (geometric opens at display)
- hierarchy: size + weight only. No italics, no rules, no decoration.
- avoid: using the geometric display face for 28px body — pair with humanist sans

### Mono Tech  (cyberpunk-neon, data-dashboard, brutalist[some], y2k-retro[some])
- eyebrow 22px 500 mono
- heading 104px 700 mono, leading 1.08
- body 26px 400 humanist sans (NOT mono — readability)
- caption 16px 400 mono
- tracking: display mono −4%, enable lining numerals + slashed zero
- hierarchy: cadence. Prefixes (`$`, `→`, paths) act as micro-hierarchy.
- avoid: 3-line body paragraphs in monospace — punishing to read

### Display Condensed  (promo-bold, ad-banner, editorial-mag[covers], luxe-dark-gold)
- eyebrow 20px 600 UPPERCASE + rule, +24% tracking
- heading 200px 500 UPPERCASE
- body 28px 400, leading 1.50
- caption 18px 600 italic
- tracking: condensed heading −1.5%
- hierarchy: scale is the point — headline 7× body. Eyebrow + short rule anchor.
- avoid: condensed at 60–80px (cramped). Either huge or absent.

### Hand-drawn Casual  (sketchy-hand, newsletter-info[some], pastel-soft[some])
- eyebrow 42px 500 hand, rotated −1.5°
- heading 170px 700 hand
- body 28px 400 Inter (clean sans does the structural work)
- caption 30px 500 hand, rotated −0.8°
- tracking: 0 — hand faces are drawn with their own spacing
- hierarchy: hand face is JEWELRY. One heading, one accent mark, one caption. Sans does work.
- avoid: body copy or data labels in hand face — readability collapses.

---

## 4 · Genre exemplars (quality bar)

These are **what excellence looks like** for 5 specific categories.
When rendering for these, aim for this level of considered craft.

### aqua-glass · "A window into elsewhere"
- **Palette**: deep navy field with two diffused colored orbs (indigo + teal). ONE cyan accent for every highlight. No secondary accent.
- **Type**: Inter 300/500 at ~168px, tight tracking −0.045em. ONE word in 500 with white→cyan gradient as focal point. Mono for micro-labels.
- **Decoration**: ONE big frosted card (44px radius, 1px inner highlight), pill chip floating above. Caustic starfield behind to prove the blur is real.
- **Risk**: commit to ONE surface, not stacked panels. Restraint.

### brutalist · "FORM/FIRST FUNCTION"
- **Palette**: paper + ink + ONE alarm color (hazard orange). No gradients, no shadows. Flat ink-on-paper.
- **Type**: Archivo Black-equivalent narrowed to ~420px headline, line-height 0.82, letter-spacing crank negative. Mono for everything else.
- **Decoration**: 2px hairlines (no rounding anywhere). 80px baseline grid VISIBLE. Rotated black sticker crashing into title. Color block as knockout, not decoration.
- **Risk**: let words BREAK across lines and clip baseline. The slash + sticker + shifted color block are intentional friction.

### editorial-mag · "The Quiet Room"
- **Palette**: cream paper + ink + single oxblood reserved for italics, kicker, drop cap. Photo well brings warm sienna.
- **Type**: variable serif (SOFT axis +100 on italics) for display & body, sans for micro-labels. Massive Roman headline meets oxblood italic. Drop cap at ~130px.
- **Decoration**: strict 12-col grid with uneven spans (kicker ⅓, title ¾, body ½, pull-quote ½). Hairline rules top + bottom. Two-col drop-cap with vertical column-rule. 1-col photo well captioned "Fig. 1".
- **Risk**: let body copy SHARE the title slide. The slide IS the spread: kicker + head + dek + pull-quote + photo cohabit.

### korean-modern · "고요의 방" (Rooms of Stillness)
- **Palette**: hanji cream + ink-stick brown-black for type. Dancheong accents (blue, vermillion, ochre, pine green) as a ribbon. ONE red 낙관 seal as signature.
- **Type**: serif Hangul at ~280px (sageuk calligraphic scale). Inter at ~56px for Latin gloss. One Hangul character set in vermillion for emphasis.
- **Decoration**: fine 1px hairlines top + bottom (book frame). Paper texture via radial dots + fractal noise at multiply. Rotated red seal as signature, not ornament.
- **Risk**: bilingual at EQUAL weight. Hangul leads at 280px, English is subtitle. Forcing hierarchy to respect the language.

### cyberpunk-neon · "AFTERLIGHT"
- **Palette**: near-black violet base + pink/cyan duotone. Everything glows via stacked text-shadow. NO third color.
- **Type**: wide geometric display (Orbitron-equiv) at ~304px wordmark. Mono for micro HUD. Headline gets 3-layer RGB-split glitch (pink offset left, cyan offset right).
- **Decoration**: CSS-only perspective floor (crossed gradients rotated 68° on X). Starfield. Scanlines at overlay blend. Vertical Latin column right (faux katakana). HUD chrome top + bottom.
- **Risk**: the word IS a marquee, not a headline. Sub-copy lives at the bottom like a footer. Trust the wordmark to hold the room.

### tech-seminar · "ML/DL paper review style" (bilingual KR/EN)
- **Palette**: white base, near-black sans for headlines, vivid blue (~#1f7ae0) for numerals + emphasis. Section banner uses purple→cyan horizontal gradient (~#7e5de8 → #5fd4e0). Section ornaments may add a third gradient fade (orange tail) when the slide is "intro/title" mood.
- **Type**: clean humanist sans, Pretendard/Noto Sans KR-style. Korean and Latin coexist at NEAR-EQUAL weight — neither dominates. Headlines roman 600 at 60–80px (no italics, no all-caps for body). All-caps reserved for ID labels ("CONTENTS", "ASSIGNMENT 3 — REPORT PRESENTATION").
- **Decoration**: signature **section banner** in top-left = small rectangular tag, gradient-filled (purple→cyan), label in white inside, with a tiny accent square sitting just below-right of the banner. Background ornament is a single recurring motif per section (mesh-wave for intro, polygon-network for DL, dotted-grid for data). Cards use thin 1.5px rounded-rectangle outlines (radius ~16px), occasional gradient stroke. Numbered TOC items: large vivid-blue numeral + light gray label, generous spacing. Step boxes (1→6 flow): small gradient-filled rounded squares with white numeral inside, connected by thin curved lines, each tied to an outlined card containing one line of body text.
- **Risk**: the section banner is the entire identity. It's tiny but unmistakable. Hero images sit in their own gradient-stroke frames (never bleeds). Bilingual is a discipline, not an afterthought — Hangul and Latin lines align by baseline, and key technical terms keep English form (e.g., "ML/DL", "Taxonomy", "NIDS") inside Hangul prose. Avoid: heavy decoration, color-blocked backgrounds, illustration-heavy slides. The vibe is **quiet authority + technical precision**.

---

---

## 5 · Image-led layout patterns

The slide-renderer cannot embed external photos, but the **compositional
grammar** of photo-led decks is reusable: substitute photos with abstract
image zones (gradient panels, textured rectangles, soft radial glows,
geometric shape compositions). The layout itself is the value.

### Pattern A — Asymmetric photo-left split  (lifestyle / editorial premium)
- 50/50 horizontal split, with a hard or soft vertical seam at the midline.
- LEFT half: image zone — full-height, edge-to-edge. In SVG: a gradient
  block, a soft radial glow, or a clipped abstract shape composition.
  Treat it as the "stillness" of the slide.
- RIGHT half: vertical text stack with generous padding —
  - small kicker (year, issue, date) at the top in italic serif
  - very large serif headline (one or two words, mixed roman + italic)
  - subtle subtitle in lighter serif or sans
  - one paragraph of body, narrow measure (~30 chars/line)
- Page number bottom-right with thin vertical rule above it.
- Mood: editorial premium, breathing, slow. Best for: editorial-mag,
  minimalist, luxe-dark-gold, pastel-soft.

### Pattern B — Organic blob + ornament  (friendly / educational warm)
- One large rounded "blob" (organic curve, oval, or pill) on the right,
  framing the visual zone (gradient, soft texture).
- One large background ornament on the left (soft gray semicircle, big
  pill, or curved arc) BLEEDING off the slide edge.
- Headline OVERLAPS the boundary between blob and background — the type
  is the bridge.
- Optional small "Next →" pill button bottom-center for pace.
- Logo placeholder top-left in light gray.
- Color: muted neutrals + one warm accent. NEVER high contrast.
- Mood: warm, approachable, classroom or community. Best for:
  newsletter-info, pastel-soft, sketchy-hand, earth-tone.

### Pattern C — Full-bleed + translucent shape overlay  (corporate classic)
- Full-bleed background takes the entire slide. In SVG: a layered radial
  + linear gradient that suggests skyline, depth, or atmosphere; or an
  abstract textured composition.
- One large translucent geometric SHAPE (circle, rectangle, hexagon)
  overlaid on the right or center — opacity 0.35–0.6, accent palette color.
- Headline (often in serif) sits INSIDE the translucent shape.
- Subtle subtitle below the headline.
- Logo / wordmark in the translucent shape's bottom area.
- Mood: corporate classic, stock-photo heritage, real-estate / consulting
  / finance feel. Best for: corporate-pro, ad-banner, promo-bold,
  pitch-hero.

### Substitution discipline (when no real photo)

Since SVG can't carry a photo, the "image zone" is a deliberate abstract.
Two reliable recipes:
1. **Atmospheric gradient** — 2–3 stacked radial gradients with the palette
   colors at low opacity over a base color, suggesting depth and lighting
   without being literal.
2. **Geometric composition** — overlapping circles, arcs, or angled rects
   in the palette colors at varying opacity (0.15–0.85) — feels designed
   rather than placeholder.

Whichever you choose, commit to ONE recipe per slide. Don't mix gradient
and geometric in the same image zone.

---

## How to use this reference

1. **Pick the slide kind** (title or content) and use its zone pattern as scaffold.
2. **Pick the typography personality** matching the category.
3. **Pick 1–3 decoration patterns** that fit the genre — never pile on.
4. **For the 5 genre exemplars above**, aim for the documented quality bar. For other categories, derive a similar set of 4 dimensions (palette / type / decoration / risk) before drawing.
5. **The risk dimension is the difference** between a competent slide and a memorable one. Find the one bold creative choice.
