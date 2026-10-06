#!/usr/bin/env python3
"""Resolve the design_system setting: which design system document-producing
skills use. CODEBASE_GUIDE_DESIGN_SYSTEM wins, then
CLAUDE_PLUGIN_OPTION_DESIGN_SYSTEM (the /config option), then "meridian";
an empty value counts as unset. Valid values are "builtin" (the skill's own
template) plus every directory under <plugin root>/design-systems/ that holds
an AI_AUTHORING.md, so a new design system needs no code change here (only a
new entry in plugin.json's options). The plugin root is this file's parent's
parent, never the cwd. Stdlib only.

CLI: python3 "${CLAUDE_PLUGIN_ROOT}/lib/design_system.py" prints
"<name> <absolute dir>" for a design system or "builtin", and exits 2 with
the valid values on stderr for an unknown one."""

import os
import sys

DEFAULT = "meridian"
BUILTIN = "builtin"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def available(root=ROOT):
    """Design system name -> absolute directory, for every valid directory."""
    base = os.path.join(root, "design-systems")
    try:
        names = sorted(os.listdir(base))
    except OSError:
        return {}
    return {
        name: os.path.join(base, name)
        for name in names
        if name != BUILTIN and os.path.isfile(os.path.join(base, name, "AI_AUTHORING.md"))
    }


def resolve(root=ROOT):
    """(name, directory) under the precedence above; directory is None for
    builtin. Raises ValueError naming the source and the valid values."""
    source, value = "default", DEFAULT
    for name in ("CODEBASE_GUIDE_DESIGN_SYSTEM", "CLAUDE_PLUGIN_OPTION_DESIGN_SYSTEM"):
        raw = os.environ.get(name, "").strip()
        if raw:
            source, value = name, raw
            break
    if value.lower() == BUILTIN:
        return BUILTIN, None
    systems = available(root)
    for name, path in systems.items():
        if name.lower() == value.lower():
            return name, path
    valid = [BUILTIN] + list(systems)
    raise ValueError(f"{source} must be one of {valid}, got {value!r}")


def main():
    try:
        name, path = resolve()
    except ValueError as e:
        print(f"design_system: {e}", file=sys.stderr)
        return 2
    print(name if path is None else f"{name} {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
