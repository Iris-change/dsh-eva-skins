#!/bin/bash
# UNIT-02 skin · macOS installer
set -u

HERE="$(cd "$(dirname "$0")" && pwd)"
FOUND=""

for c in \
  "/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh" \
  "$HOME/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh" \
  "/Applications/DeepSeek Harness.app/Contents/Resources/runtime/bin/dsh"
do
  if [ -x "$c" ]; then FOUND="$c"; break; fi
done

if [ -z "$FOUND" ] && command -v dsh >/dev/null 2>&1; then
  FOUND="$(command -v dsh)"
fi

echo ""
echo "  ============================================"
echo "     EVA / ASUKA  UNIT-02  skin  installer"
echo "  ============================================"
echo ""

if [ -z "$FOUND" ]; then
  echo "  [x] DeepSeek Harness not found."
  echo "      Install the desktop app first, then run this again."
  echo ""
  echo "      没找到 DeepSeek Harness，请先安装桌面版。"
  echo ""
  read -n 1 -s -r -p "  按任意键退出 / press any key "
  exit 1
fi

echo "  [1/2] found: $FOUND"
echo "  [2/2] installing skin, please wait (about 30s)..."
echo ""

"$FOUND" plugin --profile desktop add "$HERE"
STATUS=$?

if [ $STATUS -ne 0 ]; then
  echo ""
  echo "  [x] Install failed. Send the red text above to the author."
  echo ""
  read -n 1 -s -r -p "  按任意键退出 / press any key "
  exit $STATUS
fi

echo ""
echo "  ============================================"
echo "      Done!"
echo "  ============================================"
echo ""
echo "      Now QUIT DeepSeek Harness completely (Cmd+Q)"
echo "      and open it again."
echo ""
echo "      现在请彻底退出 DeepSeek Harness（Cmd+Q），再重新打开。"
echo "      打开后，输入框左侧会出现 UNIT-02 胶囊，点开可切换 二号机 / 零号机 / 默认主题。"
echo ""
read -n 1 -s -r -p "  按任意键退出 / press any key "