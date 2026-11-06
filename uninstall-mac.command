#!/bin/bash
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
FOUND=""
for c in \
  "/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh" \
  "$HOME/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"
do
  if [ -x "$c" ]; then FOUND="$c"; break; fi
done
if [ -z "$FOUND" ] && command -v dsh >/dev/null 2>&1; then FOUND="$(command -v dsh)"; fi
if [ -z "$FOUND" ]; then echo "DeepSeek Harness not found."; exit 1; fi
"$FOUND" plugin --profile desktop remove dsh-unit02-skin
echo ""
echo "Removed. Quit and reopen DeepSeek Harness to go back to the default look."
read -n 1 -s -r -p "  按任意键退出 / press any key "