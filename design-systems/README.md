# Design systems

Document-producing skills style their HTML output with the design system named
by the plugin setting `design_system`. Each value other than `builtin` is a
directory here: `design-systems/<name>/`.

`builtin` is reserved and never a directory: it means "use the skill's own
template", as the skill did before design systems existed.

## Contract for `design-systems/<name>/`

- `AI_AUTHORING.md` (required): the rules an agent follows when writing a
  document in this system. Paths in it are relative to the system's directory
  or spelled `${CLAUDE_PLUGIN_ROOT}/design-systems/<name>/...`.
- `templates/` (required): named HTML templates that open in a browser
  straight from this directory. A skill looks up `templates/<skill-name>.html`
  first (for example `codebase-guide.html`), then falls back to the system's
  generic templates, which `AI_AUTHORING.md` describes.
- `tools/export.mjs <in.html> <out.html>` (required): turns a draft into one
  self-contained HTML file that works offline (styles, fonts, images and
  scripts embedded). Both arguments are required; relative paths resolve
  against the current directory. It writes only `<out.html>` and nothing under
  the plugin directory, which may be read-only. Node built-ins only; exit
  non-zero with a message on bad input.
- License files for every bundled font or third-party asset, next to the
  asset, and retained in the exported HTML.

Anything else (style guide, asset layout) is the system's own business.

## Adding a system

1. Create `design-systems/<name>/` meeting the contract above.
2. Add `<name>` to the allowed values of the `design_system` setting.
3. Extend `tests/design-systems.test.sh` to export its templates.

## Systems

- `meridian` (default): editorial documents; see `meridian/AI_AUTHORING.md`
  and `meridian/STYLE_GUIDE.md`.
