# Generate With Meridian

Use this brief together with `STYLE_GUIDE.md`, `assets/tokens.css`, `assets/meridian.css`, and the closest example HTML in `templates/` (all paths relative to `${CLAUDE_PLUGIN_ROOT}/design-systems/meridian/`). Do not rebuild the visual system from memory.

## Your task

Turn the supplied material into a clear, professional HTML document using Meridian's existing components. Select the layout based on the document's job, not the length of the prompt. Output actual HTML, not a screenshot or a description of a design.

## Fixed design rules

- Keep the existing type families, token roles, reading measure, spacing rhythm, fine rules, and responsive behavior.
- Use Newsreader for display, Public Sans for prose, and system monospace for code/reference marks.
- Use the vermilion accent sparingly: reference marks, selected emphasis, and the focal data series.
- No purple/blue gradients, glass, glowing objects, emoji headings, generic icon cards, or decorative dashboards.
- Reuse `assets/meridian.css` and optional `assets/meridian.js`. Do not scatter replacement CSS or additional libraries through the document.
- Keep custom diagram geometry or data-dependent widths local; use existing visual tokens for their appearance.
- Remove any component that does not help the reader. Do not manufacture metrics, quotes, sources, confidence scores, or trends to fill a composition.

## Content rules

1. Lead with the purpose and the most useful conclusion.
2. Separate observation, interpretation, recommendation, and uncertainty.
3. Attach primary sources to factual claims where available. Do not turn an unverified assertion into a confident sentence.
4. Label missing evidence and synthetic examples explicitly beside the relevant content.
5. Preserve dates, units, scope, sample sizes, and qualifications.
6. Prefer one precise sentence over a slogan. Avoid inflated promises and repetitive three-part lists.
7. Use section titles that help a reader navigate, not a sequence of vague abstractions.
8. End with a practical decision, next step, or open question only when the material supports one.

## Construction rules

- Use semantic HTML: one main, one h1, ordered heading levels, figures with captions, tables with header scopes.
- Escape untrusted text and code. Do not inject raw model or retrieved HTML, inline event handlers, unsafe URLs, or remote scripts.
- Use unique IDs. Update contents links, footnotes, SVG title/description references, and copy targets together.
- Keep `.reading-grid` notes adjacent to the passage they qualify.
- Use `.table-scroll` and `.chart-scroll` with labels and keyboard access for genuinely two-dimensional content.
- A graph needs a labeled axis, units, a source or explicit synthetic-data notice, a textual description, and exact values accessible without hovering.
- Do not change chart labels without updating paths and the underlying data table.
- A diagram should explain a relationship, not merely repeat a list in boxes. Include a text equivalent for branches.
- Keep code as selectable `pre > code` text and label pseudocode as pseudocode.
- Keep native `details` for secondary material. Never conceal the only statement of a key limitation.
- Keep print styles and reduced-motion support.
- Update demonstration labels and invented sample copy only when genuine replacement evidence is supplied.

## Verify before handing over

Inspect at 320px, 390px, 768px, and desktop width. Test 200% text resizing, keyboard navigation, and print preview. Check all links and compare every graph value against its table. Then export the draft to a single offline file with `node ${CLAUDE_PLUGIN_ROOT}/design-systems/meridian/tools/export.mjs <draft.html> <out.html>`; the draft must link `assets/meridian.css` (any relative or absolute path ending in `assets/meridian.css` works). The export writes only `<out.html>`.

Provide the resulting file, a short explanation of its structure, and any unresolved evidence limitations. Ask the reader to judge the visual result. Do not claim universal device support, perfect accessibility, or verified factual accuracy solely because the page renders.
