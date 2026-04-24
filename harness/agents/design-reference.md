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

**COMPOSITIONAL FRAMES** — wrap the whole slide as identity, not decoration.
Pick at most ONE per template (then apply consistently across both kinds).
- **Outer slate frame + inner canvas** — 40–80px solid neutral border on
  all four edges (slate gray, ink, or warm taupe), with a white/cream
  inner panel. Whole slide reads as "report inside a folio". Forces the
  content to live in a bounded inner-rect, not edge-to-edge.
- **Notebook + paperclip frame** — thin rounded outer outline + small
  paperclip silhouette top-left, hamburger or dot-menu icon top-right.
  Reads as "stationery / organized thinking", great for biz reports.
- **Card-on-pasteboard** — slide is a single white card centered on a
  tinted pasteboard background (with shadow optional). App-like, modern.
- **Edge-to-edge full bleed** — no frame at all, the chrome is just
  whitespace and a hairline footer. Premium minimal default.

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
- **Dual-pill section indicator** — two small rounded pills stacked
  vertically, both showing the same numeral: a colored pill on top
  (yellow / accent) over a near-black pill below. Used as a deliberate
  identity anchor on every slide of a marketing/campaign deck.

### Section labels & kickers
- **Uppercase tracked** — workhorse, mono + high letter-spacing.
- **Numbered + rule** — `01 ── METHOD`. Film-credit energy.
- **Bracket frame** — `[ method ]`. Engineering-manual tone.
- **Pill badges** — multiple small tags. Use sparingly.
- **Underlined kicker** — sans-serif label with accent underline.
- **Serif italic** — lowercase, essayistic, slow.
- **Vertical kicker** — rotated label in the margin.
- **Status dot + label** — colored dot before kicker. "Live" feel.
- **Checkmark + label** — `✓ 제목`. Small filled checkmark prefixing
  the section title. Korean biz / report register, polite and orderly.
- **Dark rounded pill label** — fully filled near-black rounded
  rectangle (height ~50–70px) with white sans label inside. Used as a
  stable identifier on lighter beige/white backgrounds; can repeat
  3–6× per slide as the structural rhythm.

### Rules & dividers
- **Hairline** — 1px neutral, full width. Quietest, most reliable.
- **Heavy black bar** — short + thick. Above section titles.
- **Dotted** — technical, "cut here".
- **Double rule** — two thin parallels. Newspaper masthead.
- **Asymmetric split** — weighted/unweighted halves, implies direction.
- **Vertical rule** — between columns or signaling a pull-quote.
- **Accent marker bar** — short vertical fill as title marker.
- **Ornamental dots** — centered dingbats. Book-chapter transitions, rare.
- **Bracket rule** — `━━━━ TEXT ━━━━` thick horizontal rules on both
  sides of a centered short label. Editorial gravitas, used as section
  divider on portfolio / minimal decks.
- **Black-pierce bar** — a thick solid black horizontal bar (slide-wide
  or 80% wide, ~120–180px tall) with the headline TEXT positioned so it
  overlaps/clips into the bar (top half on white, bottom half over the
  bar — or vice versa). Hero-only, very identity-defining.

### Callouts & emphasis
- **Oversized open quote** — giant serif `"` as visual anchor.
- **Bracket frame** — `[phrase]`, definitional.
- **Asterisk footnote** — `Title*` with bottom note. Honesty.
- **Arrow marker** — `→ takeaway`. The "so what" line.
- **Badge sticker** — tilted round stamp. Once per deck max.
- **Margin annotation** — sidebar note past hairline. Edwardian.
- **Circled word** — hand-drawn ellipse. One per slide.
- **Bracket + label** — `}── label` joining a range to a label.
- **Highlight tag** — solid near-black rectangle (no rounding, or
  slight 4–8px) with white sans label INSIDE, sized like a marker pen
  swipe over a key word/phrase. Limit ≤3 per slide; they're loud.
- **Skill speed-bar row** — uniform thin horizontal progress bars
  stacked (4–6 rows), each with a label on the left and a percentage
  on the right. Resume / portfolio specific, never on body slides.

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
- **Pastel gradient blob watermark** — one large soft pastel gradient
  blob (sky→lavender, peach→cream) bleeding off one corner. Adds
  atmosphere without competing with type. Editorial portfolio register.

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

### Dual-Weight Hangul  (corporate-pro, korean-modern, academic-paper, tech-seminar[covers])
- eyebrow 24px 500 sans (Pretendard Medium) UPPERCASE +12% tracking
- heading line 1: 180px **200 (Thin/Light)** Hangul — outline weight
- heading line 2: 180px **800 (ExtraBold)** Hangul — heavy weight
- subhead 28px 500 sans, near-black
- body 26px 400 sans, leading 1.55
- caption 14px 400 UPPERCASE +18% tracking
- tracking: heading −2%
- hierarchy: WEIGHT contrast within the same size — light line + heavy line stacked. Both lines hold the same x-height; the visual rhythm comes from stroke weight, not size. The heavy line carries the noun; the light line carries the modifier.
- avoid: changing size between the two lines (kills the gesture). Don't go below 120px (contrast collapses). Don't add italic — the duality is the design.

### Serif Italic Editorial Latin  (pastel-soft, editorial-mag, luxe-dark-gold, [bilingual portfolio])
- eyebrow 18px 400 sans UPPERCASE +20% tracking
- heading 144px 400 italic serif (Playfair-class) — Latin word(s) only
- subhead 28px 400 sans, near-black
- body 22px 400 sans, leading 1.55
- caption 14px 400 italic serif
- tracking: heading −1%
- hierarchy: serif italic Latin = identity, sans = context. On bilingual decks, the Latin word leads at display size; Korean sub-title sits beneath in light sans (Noto Sans KR Light at 36–42px).
- avoid: serif italic for body (readability collapses). Pair with humanist sans always. Don't use a roman serif for the headline — the italic is the gesture.

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

### corporate-pro-slate · "Filed and squared" (Korean report aesthetic)
- **Palette**: cool slate frame (~#5b6878) wrapping the slide on all sides + warm-white inner canvas (~#fbfbf8) + ink (~#222) + ONE restrained accent (steel blue or warm tan). The whole slide reads as a report inside a folio.
- **Type**: Dual-Weight Hangul personality for the hero — line 1 light (200), line 2 heavy (800), both at 180px. Body 28px 400 sans (Pretendard Regular). Eyebrow 16px UPPERCASE Latin with `✓` checkmark prefix.
- **Decoration**: ALL slides wear the slate outer frame + white inner canvas — non-negotiable. Section header = `✓ 제목` followed by a hairline rule beneath. Process slide = three light-gray circles (radius ~120px) with line icons inside, connected by dotted lines. Card grid = light gray header strip (~#e8e8eb) + thin 1px border body. Page number always omitted (frame already grounds the slide).
- **Risk**: the slate frame makes the deck feel filed, not floating — every slide must wear it. The dual-weight hero must keep BOTH lines at the same size — change weight, not size. Resist adding any third color; restraint is the brand.

### korean-biz-paperclip · "Folio / Notebook page" (Korean stationery aesthetic)
- **Palette**: soft beige paper base (~#efeae0 to #f5f0e6) + ink black for type + cool gray for sub-text. ONE pale accent (sage, muted blue, or warm tan) used only inside dark-pill labels' icons. Whole slide reads as a notebook page.
- **Type**: heavy Korean sans (Pretendard Bold/Black-class) at 80–110px for headers, 24–28px regular for body. ALL CAPS Latin reserved for date footer. Eyebrow uses `✓` checkmark + uppercase tracked.
- **Decoration**: signature = small **paperclip silhouette** top-left + hamburger or `≡` icon top-right (always present, every slide). Outer thin rounded notebook frame. Section labels live INSIDE **dark rounded pills** (height ~50–60px, near-black fill, white sans inside, often prefixed with `✓`). Beige content panels nest inside the white area. Calendar week-grid (5×7 cells with ranges highlighted) for schedule slides. Use thick black arrow `→` between issue/response columns.
- **Risk**: the paperclip is the entire identity — tiny but unmistakable. EVERY slide gets the paperclip + hamburger chrome. Use the dark rounded pill labels generously (3–6 per slide is fine) — they're the structural rhythm. Avoid: sans body, gradients, photographs.

### marketing-pop-yellow · "Highlighter campaign" (Korean marketing deck)
- **Palette**: cream/off-white base (~#fafaf5) + ink black + ONE saturated yellow (~#FFD83A or #FFE94A) used like a marker pen. Cool gray for chart bars. NO third color.
- **Type**: heavy Korean sans (Pretendard Bold/Black) at 60–90px for headers — center-set on most slides. Body 22–28px regular. ALL CAPS Latin only inside the section pill or footer.
- **Decoration**: signature = **dual-pill section indicator** at top-center (yellow rounded pill above near-black rounded pill, both showing the same numeral, e.g. `02` / `02`). **Highlight tags** wrap key takeaways (yellow fill, black text, marker-pen feel). Round line-icons sit inside soft circle wells. Closing slide = giant `"` open-quote symbol in yellow + black above the gratitude line. Optional: friendly people line illustrations (small, anchoring corner). Section pages always show subtitle in mid-gray sans below the centered hero.
- **Risk**: yellow is the marker pen, NOT the background. It marks 1–3 specific things per slide; the rest stays cream + ink. Black is the structural workhorse. The dual section-pill is ALWAYS present — it's the through-line. Avoid: gradients, more than one accent color, dark backgrounds.

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

## 6 · UI/UX portfolio variants (5 sub-grammars)

Five distinct grammars derived from real Korean UI/UX presentation
references. All target designer/agency portfolios but commit to very
different visual systems. Mix-and-match elements within these grammars
when generating portfolio-leaning slides.

### V1 — Tech-spec mono (light gray, iPhone-outline motif)
- Background: very light warm-gray (~#ebebeb).
- Type: very heavy black sans Korean headlines (Pretendard-style), Latin
  ALL-CAPS subtitle in mid-gray.
- Recurring motif: iPhone outline (line-art rounded rectangle ~280×580px
  proportion) — used as both content frame AND chapter-divider container.
- Chrome: hamburger icon top-left, chevron-right top-right, monogram logo
  bottom-right, fine body text bottom-left.
- Mood: planning-doc, design-system, "internal spec sheet" energy.

### V2 — Bold portfolio dark (black + 4 vibrant shapes)
- Background: pure black, full bleed.
- Type: huge white display sans (Helvetica-bold-equiv) for the headline,
  often prefixed with `#` (hashtag = identity).
- Signature: 4-cell grid of vibrant geometric icons (single-color saturated
  blocks: purple square, pink asterisk-flower, orange staircase, green
  arches) — each in its own black-bordered cell.
- Footer band: solid orange (~#FF5A1F) running edge-to-edge with
  centered URL in white sans.
- Hashtag-style metadata in top-right + above footer.
- Mood: contemporary tech portfolio, contrast-driven, Canva
  "REALLYGREATSITE" template heritage.

### V3 — Journey badge portfolio (winding road metaphor)
- Background: very light gray.
- Type: heavy black "Creative" + soft purple "Portfolio" stacked (color
  contrast on second word). Small kicker with em-dash above.
- Signature: a winding ROAD illustration (dark gray with dashed white
  centerline) snaking diagonally with hexagonal badge ICONS at each bend
  (purple/blue/teal hexagons containing simple line-art icons + service
  label below each).
- Contact card stack at bottom-left: solid black bar with name, plus
  purple bars with URL and phone (offset slightly).
- Mood: friendly creative portfolio, journey metaphor, soft-modern.

### V4 — Editorial agency (serif + organic blobs + UI mockup)
- Background: white with subtle gray accent panels.
- Type: classic high-contrast serif (Didone-influenced) for the giant
  display word ("UI/UX"), light sans tracking for KICKER ABOVE and
  DESIGNER BELOW. Wide letter-spacing.
- Signature: 1-2 organic BLOB shapes (orange + soft gray + occasional
  black) bleeding off corners as ornament.
- Right side: framed UI/website mockup zone (in SVG: an abstract dashboard
  composition with header bar + sidebar + grid of cards).
- Footer: black solid CTA pill ("Start Slide ▸") bottom-left.
- Top nav strip with brand wordmark + 3 menu items.
- Mood: agency portfolio, editorial-lifestyle, professional-warm.

### V5 — Big-type minimalist Korean (silhouette ornaments)
- Background: very light warm-gray, edge-to-edge.
- Type: ENORMOUS thin/regular weight Korean sans (Noto Sans KR Light/
  Regular) at 200–300px — the headline is the entire slide.
- Signature: faint silhouette icons (chat bubbles, message icons) in
  light gray (~#dadada) sitting BEHIND the headline as quiet ornaments.
- Footer: 3-column metadata strip (name + phone | role + email | URL)
  separated by generous whitespace.
- Brand monogram top-left, chip-style label top-right.
- Mood: confident silence, "the type IS the design", premium minimal
  Korean.

### V6 — B&W black-bar editorial (Korean designer minimal)
- Background: pure white edge-to-edge — no frame, no ornament.
- Type: heavy black Korean sans (Pretendard ExtraBold-class) at 130–160px,
  set as a single name centered. Mono Latin subtitle ("Product Designer")
  in mid-gray above the name. Footer subtitle in tracked sans, very small.
- Signature: a thick **BLACK horizontal bar** (~80% slide width, ~140px
  tall) sits behind the centered Korean name — the name's letters
  PIERCE the bar (top half on white, bottom half over the bar, OR vice
  versa). The bar is shorter than the text on either side — that
  asymmetric overrun creates the "pierce" effect.
- Section dividers: `━━━━ 주요 프로젝트 ━━━━` — thick black rules
  bracketing centered sans label. Use as standalone divider slides
  between major sections.
- Highlight tags: solid black rectangles with white sans label inside
  (used as nav/identity, not just emphasis). Stack them vertically as
  TOC items or scatter as project labels.
- Project slides: small image placeholder + black highlight tag label +
  short body paragraph. Composition asymmetric, unhurried.
- Closing slide: same black-bar-pierce treatment with `감사합니다` +
  small subtitle below (`OOO이었습니다` / `[Your Name] thanks you`).
- Mood: confident silent minimalism, fashion-magazine portfolio,
  "the bar IS the brand". Pure ink-on-paper; resist any color.

### V7 — Pastel serif editorial portfolio (mist + gradient blob)
- Background: misty warm-gray (~#e7e6e2) with ONE large pastel gradient
  blob (sky blue → soft lavender) bleeding from a corner as atmosphere.
  Blob opacity ~0.4–0.6, no hard edges.
- Type: classic **serif italic English** ("Portfolio", "Contents",
  "About Me", "Skills & Competencies", "Key Projects", "Portfolio
  Showcase", "Education & Certifications") at 96–144px italic 400 — these
  English section words ARE the identity. Korean sub-title in light sans
  (Noto Sans KR Light at 36–42px) sits beside the English word.
- TOC pattern: large serif italic "Contents" left + bilingual numbered
  list right (`01 자기 소개 (About Me)`, `02 역량 및 스킬 (Skills &
  Competencies)`, etc).
- About / profile page: small label `OOO Your Name` left + body bullet
  highlighted with bold underline + photo placeholder right.
- Skill speed-bar pattern: 4–6 uniform thin bars with `기술명` label
  left + percentage right; partial-fill in dark accent.
- Project page: full image placeholder left or right + key/value meta
  column on opposite side (목표 / 기간 / 기여도 / 결과 / 사용 툴).
  Generous breathing room, hairline section divider beneath the title.
- Education / timeline: left column = year ranges (`2015.8 - 2018.12`)
  + right column = labeled items, each with a sub-line.
- Closing slide: small serif italic "Thank you" centered between two
  thin horizontal rules, with one-line subtitle below in light sans.
- Mood: museum-catalog quietness, premium humanist editorial, soft
  and slow. The Latin word leads, Korean sub-title follows.

---

## How to use this reference

1. **Pick the slide kind** (title or content) and use its zone pattern as scaffold.
2. **Pick the typography personality** matching the category.
3. **Pick 1–3 decoration patterns** that fit the genre — never pile on.
4. **For the 5 genre exemplars above**, aim for the documented quality bar. For other categories, derive a similar set of 4 dimensions (palette / type / decoration / risk) before drawing.
5. **The risk dimension is the difference** between a competent slide and a memorable one. Find the one bold creative choice.
