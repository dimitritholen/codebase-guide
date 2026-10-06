# Meridian / Design & Authoring Guide

Version 1.0. A reusable editorial language for documents that need to be understood, checked, and acted on.

## 1. Design Intent

**Considered, not decorated.** Meridian borrows the discipline of an editorial page, not the appearance of a software dashboard. Its identity lives in the contrast between generous serif headlines, precise sans-serif text, small monospaced reference marks, and fine rules.

The distinctive motif is the **meridian line**: a thin annotation, an axis, a boundary, a source-to-conclusion connection. The custom mark and the two cover illustrations express this idea. They are optional editorial artwork, not mandatory ornaments.

Three principles govern every decision:

1. Make the reading order obvious before adding decoration.
2. Put evidence close to the claim it supports.
3. Let a reader skim, read, and inspect at different levels of detail.

Do not add gradients, glass panels, blurred blobs, floating dashboard cards, emoji icons, heavy shadows, rainbow charts, or rounded containers around every paragraph. Avoid treating every document as a landing page.

## 2. Color

`assets/tokens.css` is the single source of truth. These values are original choices for Meridian, not samples from a reference product.

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#ffffff` | Main reading surface |
| `--canvas` | `#f5f6f4` | Navigation and quiet grouped content |
| `--wash` | `#edefeb` | Chart tracks and hover surface |
| `--ink` | `#232824` | Primary text and strong rules |
| `--muted` | `#626861` | Secondary text, labels, baseline data |
| `--faint` | `#777e75` | Reserved; not approved for small text on all surfaces |
| `--line` | `#d8ddd5` | Decorative separators and chart grid |
| `--line-strong` | `#9aa296` | Nonessential structural outlines |
| `--accent` | `#b43c2c` | Editorial emphasis, focus, key data series |
| `--accent-soft` | `#faeee9` | Caution or recommendation surface |
| `--positive` | `#47654c` | Explicit positive status, never decoration |
| `--positive-soft` | `#eef3eb` | Reserved positive surface |
| `--blue` | `#466a80` | Secondary data or print syntax when needed |
| `--dark` | `#252c27` | Lead-story and code surface |
| `--on-dark` | `#f5f6ef` | Main text on dark |
| `--on-dark-muted` | `#b8c2b8` | Secondary text on dark |
| `--code-keyword` | `#ffaf98` | Code keywords and dark-surface accent |
| `--code-string` | `#c3dbaa` | String literals |
| `--code-function` | `#e5d7b0` | Function names |

Use accent as a precise mark, not a wash over the whole document. A red figure is an editorial highlight, not automatically a negative value. Status always includes text. Charts use direct labels, different line styles, or patterns in addition to color.

The light gray rules are intentionally subtle and decorative. Do not use them alone to identify an interactive control or essential graphical element. New text/background pairs must meet WCAG AA contrast (4.5:1 normal text; 3:1 large text), and meaningful graphics must meet 3:1.

## 3. Typography

| Role | Typeface | Treatment |
| --- | --- | --- |
| Document title | Newsreader | 50-92px fluid; regular; 1.01 line height; -0.045em tracking |
| Section heading | Newsreader | 30-44px fluid; regular; 1.14 line height |
| Body | Public Sans | 16px; 1.65 line height; normal tracking |
| Standfirst | Public Sans | 18px desktop, 16px mobile; 1.65-1.7 line height |
| Subheading | Public Sans | 22px; medium; 1.35 line height |
| Small reading text | Public Sans | 14px; figures, notes, summaries |
| Utility labels | Public Sans | 10-13px; metadata and navigation only |
| Eyebrow | Public Sans | 11px; medium; uppercase; 0.13em tracking |
| Reference marks / code | System monospace | 10-13px reference marks; 12px selectable code |

All production sizes use rem or rem-based `clamp()`. Tiny type is restricted to nonessential metadata, not paragraph content or important instructions. Do not shrink body text to fit. The nominal body measure is `65ch`; narrower columns adapt naturally on mobile.

Use serif italic for a short phrase in the title, never an entire paragraph. Avoid repeated manual line breaks in normal prose. Title line breaks are a deliberate exception; check them at 320px and with enlarged text. Public Sans is used only in roman styles; do not introduce faux italic body text.

Use proper quotation marks and punctuation. The source examples use HTML entities to preserve ASCII source files. Use percentage points for absolute changes in rates. Right-align tabular numbers; put units in labels or column headers.

## 4. Space, Shape & Layout

Spacing ladder: **4, 8, 12, 16, 24, 32, 48, 64, 96px** (`--space-1` through `--space-9`). Component-specific optical adjustments are allowed but should not create a second scale.

The main frame is at most 72rem wide. Desktop has a 14rem secondary navigation rail, reduced to 12rem at intermediate widths. At 960px the rail becomes a top navigation strip; at 650px documents become single-column. Content never relies on absolute-positioned text.

Reading pages use a main column and optional 10-12rem margin-note column. The margin note moves directly after its related text on narrow screens. A digest uses an asymmetric main/aside layout. Technical diagrams use an ordered-list grid that becomes vertical on mobile.

Borders are usually 1px. The 3px corner radius is reserved for controls and the code surface. Editorial panels are square. No elevation or card-shadow scale is needed. A border marks structure; whitespace marks hierarchy.

No decorative animation is part of this system. Smooth anchor scrolling is disabled for reduced-motion preferences.

## 5. Document Anatomy

Every document needs a title, concise standfirst, useful metadata, ordered sections, and an honest source/scope note. The collection sidebar is demonstration navigation, not required branding for every future document.

**Research report:** title -> executive summary -> optional metrics -> evidence -> implications -> recommended action -> sources.

**Weekly digest:** masthead -> one lead idea -> ranked short items -> compact supporting evidence -> reading list -> one takeaway question.

**Technical note:** title -> abstract -> system diagram -> implementation example -> trade-offs -> acceptance criteria -> references and limits.

**Short summary:** title -> summary box -> two or three sections -> decision/next step -> sources. Leave out artwork and metrics that do not earn their space.

Removing the sidebar requires removing the workspace offset too: `.workspace { margin-left: 0; }`. Do not leave a blank 14rem gutter. Keep one main landmark and one h1.

## 6. Component Recipes

Copy the enclosing structure from the nearest example. Compose only what the content requires.

### Numbered section

```html
<section class="document-section" id="findings" aria-labelledby="findings-title">
  <div class="section-heading">
    <span class="section-number">01</span>
    <h2 id="findings-title">What the evidence tells us</h2>
  </div>
  <div class="prose"><p>The finding, written plainly.</p></div>
</section>
```

### Summary and margin note

```html
<div class="summary">
  <span class="eyebrow">The central finding</span>
  <p>One useful conclusion, with <strong>one point of emphasis.</strong></p>
</div>
<div class="reading-grid">
  <div class="prose"><p>The explanation and supporting evidence.</p></div>
  <aside class="margin-note">
    <span class="eyebrow">A useful distinction</span>
    <p>A qualification that belongs beside this explanation.</p>
  </aside>
</div>
```

### Metric

```html
<dl class="metrics" aria-label="Pilot results">
  <div class="metric">
    <dt>Median review time</dt>
    <dd>12 min</dd>
    <dd class="metric-note"><small>Down from 18 min in the comparison period</small></dd>
  </div>
</dl>
```

The default strip has three columns. For one or two metrics, explicitly set `grid-template-columns: repeat(2, minmax(0, 1fr))` or use a prose statement instead. Never invent more metrics to fill the layout. Metric notes belong inside `dd`, not directly in a definition-list group.

### Figure

Use `.figure` with a `.figure-heading`, descriptive h3, labeled chart or diagram, and `figcaption`. Caption structure: `.figure-number` plus conclusion, source, date, and qualification. The accessible name belongs on the SVG (`title` and `desc`), not only on the surrounding box. Exact values belong in a visible table or a `details.data-disclosure`.

### Dispatch with a compact table

A `.dispatch` may hold one short semantic table (for example the key files of a component) after its prose; it is spaced from the text above it. Keep it to two columns and a few rows.

### Structure diagram

For relationships an ordered `.pipeline` cannot show (branches, feedback loops, calls over time), draw an inline `svg.diagram` inside a focusable `.chart-scroll` region within a `.figure`. Give the SVG `role="img"`, a `title` and a `desc` with unique IDs. Style it only with the diagram classes; never hard-code colors or fonts in the SVG:

- Boxes: `g.node` (component), `g.node.node-focus` (the one focal component), `g.node.node-actor` (a person or outside caller), `g.node.node-data` (files, stores, external data; dashed). Each holds a square `rect`, a `text.node-title` and an optional `text.node-sub` (mono path) or `text.node-note` (short italic remark).
- Connections: `path.edge` for calls and data flow, `path.edge.edge-alt` for returns or conditional paths, with markers filled by `.arrowhead` or `.arrowhead-alt`. Label them with `text.edge-label` (add `.edge-label-alt` beside a dashed edge).
- Sequences: `line.lifeline` per participant, `rect.activation` for work in progress, `rect.frame` plus `path.frame-tab` and `text.frame-label` for a loop or condition, and `g.badge` (`circle` plus two-digit `text`) for step numbers that match an ordered list below the figure.

Explain line styles in the caption rather than in a legend. The diagram scrolls inside its region on narrow screens (minimum 640px) and shrinks to fit in print. Branches and the order of steps must also be stated in text: the caption, a `.branch-note`, or a numbered list.

### Code and annotations

Use `.code-layout` with `.code-panel` and `.annotation-list`. Code goes in `pre > code`; syntax spans use `.code-keyword`, `.code-string`, `.code-function`, and `.code-comment`. HTML-escape source code. Avoid line numbers that contaminate copied text.

A copy button uses `data-copy="unique-code-id"`, `type="button"`, and `hidden`; the script reveals it. The shared `data-copy-status` live region reports success or denied clipboard access. With multiple code blocks, the current enhancer uses one shared status region; locate it where feedback remains understandable.

### Comparison, recommendation, checklist

Use semantic tables with captions and `scope` on header cells. Put wide tables in a focusable `.table-scroll` region with a specific accessible label. Use `.callout` for an actionable recommendation, `.decision` for a named choice and rationale, and `.checklist` for static review criteria. Checklist squares are not checkboxes and imply no persisted completion state.

### Source notes and disclosures

Use `.sources` with an ordered list and stable IDs for footnotes. Link superscripts with meaningful accessible labels. Native `details` and `summary` provide disclosure without JavaScript. Do not hide the only copy of a major conclusion inside a disclosure.

## 7. Data Visualization Grammar

1. Give the chart a conclusion-led heading, not just a chart-type name.
2. Name the measure, unit, period, denominator, and source.
3. Use the accent for the focal series and dashed muted lines for a comparator.
4. Use a zero baseline for bars. If a line chart truncates an axis, label and justify it.
5. Keep labels horizontal. Prefer direct end labels to distant legends.
6. Use light horizontal grid lines; avoid unnecessary vertical grids.
7. Annotate meaningful changes with a thin guide and short text.
8. Include exact accessible data, and distinguish missing data from zero.
9. Label synthetic or illustrative data next to the visualization.
10. Preserve legibility on mobile. Scroll a complex chart internally rather than shrinking labels to illegibility.

SVG graphics are static in these examples. When changing data, update the paths, labels, descriptions, and corresponding data table together. Do not give the appearance of a working filter or tooltip unless it is actually implemented.

For process diagrams, prefer semantic ordered HTML stages. Arrows are decorative because order and text carry meaning. Essential branches must be explained in text. Keep diagrams to four or five stages before considering a more suitable layout.

## 8. Interaction & Accessibility

- Links keep clear text and a visible keyboard focus ring. Body links are underlined. Dark surfaces use `--code-keyword` for the ring; the normal accent is too dark there.
- Navigation uses `aria-current="page"` for the active document.
- Buttons have real actions; unavailable JS controls remain hidden.
- Clipboard failure gives a manual-copy instruction, never a false success.
- Controls have at least 24px targets or sufficient spacing; primary controls are 44px high.
- Keep heading levels meaningful. Visual eyebrow styling does not change heading semantics.
- Never express data or status by color alone.
- Supply `lang`, viewport metadata, skip link, main landmark, and one h1.
- Test at 320px, 200% text size, and with WCAG text-spacing overrides.
- Do not disable browser zoom or hide page overflow to conceal layout bugs.
- Native disclosure and reading remain functional with JavaScript disabled.
- No disabled, loading, or empty states are needed for static text. If adding dynamic content, design and announce those states explicitly.

## 9. Print & Distribution

The print stylesheet removes the shell, linearizes complex layouts, uses A4 margins, keeps related content together where practical, and changes code to a light surface. JavaScript opens disclosures for print and restores them afterward. Without JavaScript, open disclosures manually before printing.

Use the browser's Print / Save as PDF with background graphics enabled and browser headers/footers disabled for the intended composition. Review page breaks on the actual output. Avoid claiming that a browser-generated PDF is tagged or PDF/UA-conformant without separate validation.

For sharing a document as a single file, run `node ${CLAUDE_PLUGIN_ROOT}/design-systems/meridian/tools/export.mjs <draft.html> <out.html>`. Both arguments are required and only `<out.html>` is written. All rendering assets are embedded, but links to sibling examples and the authoring guide still require those files alongside it. Remove collection-only links when distributing just one document. Font licenses are retained inside the HTML source. The export step does not sanitize untrusted content; escape generated text and restrict unsafe markup before it enters any document.

## 10. Release Checklist

- A reader can identify the purpose and main conclusion in ten seconds.
- A skeptical reader can find sources and limitations without guessing.
- Typography, colors, and spacing use the shared system rather than local reinvention.
- Every visible control works; cross-document and fragment links resolve.
- Charts and tables agree on every displayed value and unit.
- No important content disappears at small widths or enlarged text.
- The desktop and mobile screenshots have been inspected, not only generated.
- Automated checks pass; human visual acceptance is still requested.
