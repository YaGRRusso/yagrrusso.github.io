#!/usr/bin/env bash
# Sync agents/*.md to .cursor/rules/*.mdc using agents/cursor-manifest.yaml.
# Usage: bash scripts/sync-cursor-rules.sh [repo-root]
# Run from repo root after editing agents/*.md.
set -euo pipefail

ROOT="${1:-.}"
MANIFEST="${ROOT}/agents/cursor-manifest.yaml"
AGENTS="${ROOT}/agents"
OUT="${ROOT}/.cursor/rules"

if [[ ! -f "$MANIFEST" ]]; then
  echo "error: missing manifest at $MANIFEST" >&2
  exit 1
fi

python3 - "$MANIFEST" "$AGENTS" "$OUT" <<'PY'
import sys
from pathlib import Path

manifest_path = Path(sys.argv[1])
agents_dir = Path(sys.argv[2])
out_dir = Path(sys.argv[3])


def parse_manifest(text: str) -> list[dict]:
    rules: list[dict] = []
    block: dict | None = None
    in_rules = False

    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line == "rules:":
            in_rules = True
            continue
        if not in_rules:
            continue
        if line.startswith("- source:"):
            if block:
                rules.append(block)
            block = {"source": line.split(":", 1)[1].strip()}
            continue
        if block is None:
            continue
        if line.startswith("target:"):
            block["target"] = line.split(":", 1)[1].strip()
        elif line.startswith("description:"):
            val = line.split(":", 1)[1].strip()
            block["description"] = val.strip('"').strip("'")
        elif line.startswith("alwaysApply:"):
            block["alwaysApply"] = line.split(":", 1)[1].strip().lower() == "true"
        elif line.startswith("globs:"):
            block["globs"] = line.split(":", 1)[1].strip()

    if block:
        rules.append(block)
    return rules


def yaml_quote(value: str) -> str:
    if any(c in value for c in ':"{}[],&*#?|-<>=!%@`'):
        return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'
    return value


rules = parse_manifest(manifest_path.read_text(encoding="utf-8"))
if not rules:
    print("error: no rules in manifest", file=sys.stderr)
    sys.exit(1)

out_dir.mkdir(parents=True, exist_ok=True)

for rule in rules:
    for key in ("source", "target", "description"):
        if key not in rule:
            print(f"error: rule missing {key}: {rule}", file=sys.stderr)
            sys.exit(1)

    source = agents_dir / rule["source"]
    if not source.is_file():
        print(f"error: missing source {source}", file=sys.stderr)
        sys.exit(1)

    body = source.read_text(encoding="utf-8")
    if body.startswith("---"):
        print(f"error: {source} must not include YAML frontmatter", file=sys.stderr)
        sys.exit(1)

    lines = ["---", f"description: {yaml_quote(rule['description'])}"]
    if rule.get("alwaysApply"):
        lines.append("alwaysApply: true")
    if rule.get("globs"):
        lines.append(f"globs: {rule['globs']}")
    lines.append("---")
    lines.append("")

    target = out_dir / rule["target"]
    target.write_text("\n".join(lines) + body.rstrip() + "\n", encoding="utf-8")
    print(f"synced {source.name} -> {target}")

print("done")
PY
