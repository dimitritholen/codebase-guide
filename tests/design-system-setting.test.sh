#!/usr/bin/env bash
# Tests for lib/design_system.py, the design_system setting resolver. Runs a
# copy of the resolver inside a temp plugin root with its own design-systems/
# fixture tree, so the result does not depend on what the repo ships. Needs
# python3; no network.
set -u

ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd -P)"
fail=0
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

plugin="$work/plugin"
mkdir -p "$plugin/lib" "$plugin/design-systems/meridian" "$plugin/design-systems/extra" "$plugin/design-systems/no-guide"
cp "$ROOT/lib/design_system.py" "$plugin/lib/"
: > "$plugin/design-systems/meridian/AI_AUTHORING.md"
: > "$plugin/design-systems/extra/AI_AUTHORING.md"
: > "$plugin/design-systems/no-guide/README.md"
real_plugin="$(CDPATH= cd -- "$plugin" && pwd -P)"

check_eq() {
  if [ "$2" = "$3" ]; then
    printf 'ok   %s\n' "$1"
  else
    printf 'FAIL %s\n  got:  %s\n  want: %s\n' "$1" "$2" "$3"
    fail=1
  fi
}

# Runs the resolver from an unrelated cwd with both settings cleared, then
# the given assignments; sets $out, $err and $code.
run() {
  out="$(cd "$work" && env -u CODEBASE_GUIDE_DESIGN_SYSTEM -u CLAUDE_PLUGIN_OPTION_DESIGN_SYSTEM "$@" \
    python3 "$plugin/lib/design_system.py" 2>"$work/err")"
  code=$?
  err="$(cat "$work/err")"
}

run
check_eq "default resolves to meridian" "$out" "meridian $real_plugin/design-systems/meridian"
check_eq "default exits 0" "$code" 0

run CODEBASE_GUIDE_DESIGN_SYSTEM=builtin
check_eq "env override: builtin" "$out" "builtin"

run CLAUDE_PLUGIN_OPTION_DESIGN_SYSTEM=builtin
check_eq "option: builtin" "$out" "builtin"

run CODEBASE_GUIDE_DESIGN_SYSTEM=extra CLAUDE_PLUGIN_OPTION_DESIGN_SYSTEM=builtin
check_eq "env wins over option" "$out" "extra $real_plugin/design-systems/extra"

run CODEBASE_GUIDE_DESIGN_SYSTEM= CLAUDE_PLUGIN_OPTION_DESIGN_SYSTEM=extra
check_eq "empty env falls through to option" "$out" "extra $real_plugin/design-systems/extra"

run CODEBASE_GUIDE_DESIGN_SYSTEM=" Meridian "
check_eq "value is case- and whitespace-insensitive" "$out" "meridian $real_plugin/design-systems/meridian"

run CODEBASE_GUIDE_DESIGN_SYSTEM=bogus
check_eq "unknown value: exit 2" "$code" 2
check_eq "unknown value: no stdout" "$out" ""
check_eq "unknown value: stderr names valid values" \
  "$(printf '%s' "$err" | grep -c "\['builtin', 'extra', 'meridian'\]")" 1

run CLAUDE_PLUGIN_OPTION_DESIGN_SYSTEM=no-guide
check_eq "directory without AI_AUTHORING.md is rejected" "$code" 2

rm -rf "$plugin/design-systems/meridian"
run
check_eq "default fails loudly when meridian is missing" "$code" 2

# The shipped resolver, run in place, answers for this repo's own root.
real_out="$(cd "$work" && env -u CODEBASE_GUIDE_DESIGN_SYSTEM -u CLAUDE_PLUGIN_OPTION_DESIGN_SYSTEM \
  CODEBASE_GUIDE_DESIGN_SYSTEM=builtin python3 "$ROOT/lib/design_system.py")"
check_eq "shipped resolver runs from any cwd" "$real_out" "builtin"

# plugin.json offers the setting with meridian as default.
check_eq "plugin.json design_system default" \
  "$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["userConfig"]["design_system"]["default"])' "$ROOT/.claude-plugin/plugin.json")" \
  "meridian"

exit $fail
