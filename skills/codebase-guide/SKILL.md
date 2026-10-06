---
name: codebase-guide
description: Write a visual, single-file HTML onboarding report for the repo in the working directory, in the design system the plugin's design_system setting names (default meridian; builtin = the bundled template.html), so a beginner understands it on the first read and an expert finds any file in five minutes. Use on /codebase-guide:codebase-guide, or when the user asks for a codebase guide, onboarding doc, architecture overview or "explain this repo". Writes one HTML file, no other edits.
---

You write one HTML report that teaches any developer what this codebase
does, how it is built and where everything lives.

The look comes from the `design_system` setting (switch it in `/config`, or
per session with `CODEBASE_GUIDE_DESIGN_SYSTEM`; `builtin` = this skill's own
template).

# Scope

- Default output: `docs/codebase-guide.html`. Use the path the user gives.
- Target: the repo in the session's working directory. A named module gets
  depth; the whole repo gets breadth.

# Design system

Run `python3 "${CLAUDE_PLUGIN_ROOT}/lib/design_system.py"` first.

- Non-zero exit: show its stderr to the user and stop. Do not fall back.
- `builtin`: follow **Builtin** below.
- `<name> <dir>`: follow **Design system `<dir>`** below.

# Analyze first

Read before you write. Base every claim on code you read, and flag anything
unclear or apparently unused instead of guessing (a caveat callout).

1. **Purpose**: README, CLAUDE.md/AGENTS.md, docs.
2. **Entry points** and the main components with their dependencies.
3. **One or two real flows**, traced through actual functions and files.
4. **Patterns and conventions** that recur, and the reason for each.
5. **Core data types**: where data comes from and where it goes.
6. **Feature-to-file map**: every feature, and the common tasks.

# Template

The template is a worked sample of a fictional project, "Quill". Keep its
head, styles, script and shell; replace only the content, following its
`SLOT:` comments, and drop the sample comments. Metadata: real repository,
the commit hash you read, today's date, an honest reading time; fill the
colophon the same way. The result is one file that works offline: no
external fonts, scripts, images, styles or other URLs; well formed, tags
balanced, ids unique.

## Builtin

Read `${CLAUDE_PLUGIN_ROOT}/skills/codebase-guide/template.html`. Write the
guide straight to the output path.

- Keep the `<head>`, all CSS, the theme tokens, the layout and the script
  exactly as they are. Replace only the masthead, the `.toc` entries and the
  content of `<main>`.
- Reuse the template's components and classes. Do not invent styles. If
  something truly has no component, add the smallest CSS for it using the
  existing tokens (`--paper-2`, `--rule`, `--ink-2`, `--c1`…`--c6`).
- Tables and `<details>` have no component. Add this one block at the end
  of the `<style>` element and use it for sections 6 and 8:

  ```css
  .map { width: 100%; border-collapse: collapse; font: .92rem/1.5 var(--sans); }
  .map th, .map td { text-align: left; padding: 9px 12px 9px 0; border-bottom: 1px solid var(--rule); vertical-align: top; }
  .map th { font: 600 .68rem/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); }
  details { border: 1px solid var(--rule); border-radius: 10px; background: var(--paper-2); padding: 12px 18px; margin: 14px 0; }
  summary { cursor: pointer; font: 600 1rem var(--sans); }
  ```

- Extend the sidebar `<ol>` to all eight sections, in the template's
  `<li><a href="#id"><span>NN</span>Title</a></li>` form.
- Each section is `<section class="section" id="…">` with a `.section-head`
  (`.section-num`, `h2`, optional `.section-intro`). Per section:
  1. `.prose` (first sentence `.lead.dropcap`), a `.facts` strip, the
     diagram in a `.figure` (`.figure-frame` svg, `figcaption`, `.legend`).
  2. `dl.glossary` of `.term` entries (`dt`, `dd`, optional `.see`).
  3. `.parts` grid, one `article.part cN` per component with `part-head`,
     `part-root`, `part-what`, `ul.resp`, `ul.files` and `.talks` chips, each
     `id="part-<name>"`; reuse its colour class in the diagrams. Caveats in
     `.callout.caveat`.
  4. `ol.steps` whose `.step-n` numbers match the `d-badge` numbers in the
     SVG; each step has `.where` (path and `code.fn`). Side notes in
     `.callout.note`.
  5. One `article.pattern` each with `.pattern-tag`, `h3`, description, a
     `figure.code` (`code-head` with path and line range; `pre` with
     `data-lang`, `data-start` and `data-hl` set to real line numbers) and
     a `p.why`.
  6. `table.map`, `code.path` for files and folders.
  7. `figure.code` blocks with `data-lang="sh"`.
  8. One `<details><summary>` block each.
- Diagrams use only the `d-*` classes and `cN` colour tokens: `d-node`,
  `d-data`, `d-actor`, `d-title`, `d-sub`, `d-edge`, `d-elabel`,
  `d-lifeline`, `d-activation`, `d-badge`, `d-frame`.

## Design system `<dir>`

1. Read `<dir>/AI_AUTHORING.md` and follow it. Read
   `<dir>/templates/codebase-guide.html`; if it does not exist, use the
   closest generic template that `AI_AUTHORING.md` names.
2. Use the template's components, classes and `SLOT:` comments for every
   section and diagram; they replace the Builtin class rules.
3. Write the draft next to the output as `<output>.draft.html`, never under
   the plugin directory, with every `../assets/` link rewritten to the
   absolute `<dir>/assets/`.
4. Export and clean up:
   `node "<dir>/tools/export.mjs" <draft> <output> && rm <draft>`.
   If the export fails, show its stderr, fix the draft and rerun.

# Sections, in order

1. **In one minute** (`in-one-minute`): 3–5 plain sentences, a strip of
   real numbers, and the big-picture diagram.
2. **Key words** (`key-words`): 6–12 terms, each defined in 1–2 sentences,
   optionally pointing to the defining file.
3. **The main parts** (`main-parts`): one card per component: root folder,
   what it does, responsibilities, key files, what it talks to. Add a
   folder-map diagram here or in section 1. Unclear or unused code goes in
   a caveat.
4. **How it runs** (`how-it-runs`): a sequence or flow diagram of one real
   run, then numbered steps matching the diagram's numbers; each step names
   its path and function. Side notes go in a note.
5. **Patterns to know** (`patterns`): one entry per convention: tag, title,
   short description, a real 5–15 line excerpt (path and real line range
   in its header; escape `<` and `&`) and why it is done this way.
6. **Where to find things** (`where-to-find`): a table with "I want to…"
   first and the file or folder second. Cover every feature and common task.
7. **Run it yourself** (`run-it`): setup, run and test commands copied from
   the repo (README, Makefile, package.json, pyproject.toml).
8. **Going deeper** (`going-deeper`): invariants, trade-offs, limits and
   gotchas, each collapsible.

Label diagram boxes with real names, give unique ids to `title`, `desc` and
markers, and add a one-line caption to each.

# Style

Short sentences, plain words, each term defined on first use, an analogy
where it helps. Good: "The runner is like a race referee: it starts both
lanes, times them, and writes down the results." Bad: "The runner
orchestrates lane execution and persists telemetry." Summary on top, expert
detail in collapsible blocks. Only real repo-relative paths and real symbol
names.

# Verify before finishing

- Every feature appears in section 6.
- Design system path: the output has no `assets/` references and the draft
  is gone.

Final reply: the output path, the design system used, and a three-line
summary.
