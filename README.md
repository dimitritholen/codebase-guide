# codebase-guide

A Claude Code plugin that writes a visual, single-file HTML onboarding guide
for the repo in your working directory. A beginner should understand the
codebase on the first read; an expert should find any file in five minutes.

The guide has eight sections: a one-minute overview with a big-picture
diagram, key words, the main parts, a traced run of one real flow, patterns
to know, a "where to find things" table, the commands to run it yourself, and
collapsible notes for going deeper. Every claim is based on code that was
read; anything unclear or apparently unused is flagged instead of guessed.

## Install

```bash
claude plugin marketplace add dimitritholen/codebase-guide
claude plugin install codebase-guide@codebase-guide
```

## Use

```
/codebase-guide:codebase-guide
```

Or ask for a codebase guide, an onboarding doc, an architecture overview, or
"explain this repo". The guide is written to `docs/codebase-guide.html`
unless you name another path, and no other file is edited.

## Settings

- `design_system` (meridian/builtin, default meridian): the look of the
  guide. `meridian` is an editorial design system with embedded fonts;
  `builtin` uses the skill's own template. Change it in `/config`, or for one
  shell with `CODEBASE_GUIDE_DESIGN_SYSTEM`.

See [design-systems/README.md](design-systems/README.md) for the contract a
new design system has to meet.

## Requirements

- `python3` to resolve the design-system setting.
- `node` to export a design-system draft into one offline HTML file (not
  needed for `builtin`).

## Tests

No keys or network needed:

```bash
for t in tests/*.test.sh; do bash "$t"; done
```

## Licenses

The bundled Newsreader and Public Sans fonts are under the SIL Open Font
License; the notices sit next to the font files in
`design-systems/meridian/assets/fonts/` and are embedded in every exported
guide.
