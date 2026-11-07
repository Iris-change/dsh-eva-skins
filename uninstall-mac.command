#!/bin/bash
# DSH EVA skins · macOS uninstaller
set -u

HERE="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="DeepSeek Harness.app"
DSH=""

echo ""
echo "  ================================================"
echo "   DSH EVA skins · uninstaller  (macOS)"
echo "  ================================================"
echo ""

if command -v dsh >/dev/null 2>&1; then
  DSH="$(command -v dsh)"
fi

if [ -z "$DSH" ]; then
  for base in "/Applications" "$HOME/Applications" "/Users/Shared"; do
    cand="$base/$APP_NAME/Contents/Resources/runtime/cli/bin/dsh"
    if [ -f "$cand" ] && [ -x "$cand" ]; then DSH="$cand"; break; fi
  done
fi

if [ -z "$DSH" ] && command -v mdfind >/dev/null 2>&1; then
  hit="$(mdfind -name "$APP_NAME" 2>/dev/null | head -n 1)"
  if [ -n "$hit" ] && [ -x "$hit/Contents/Resources/runtime/cli/bin/dsh" ]; then
    DSH="$hit/Contents/Resources/runtime/cli/bin/dsh"
  fi
fi

if [ -z "$DSH" ]; then
  echo "  [x] 没找到 DeepSeek Harness，无法卸载。"
  echo "      手动卸载：在 DSH 里打开 设置 → 插件，找到 dsh-eva-skins 删除即可。"
  echo ""
  read -n 1 -s -r -p "  按任意键退出… "
  echo ""
  exit 1
fi

PKG="dsh-eva-skins"
echo "  [1/2] DSH：$DSH"
echo "  [2/2] 卸载 $PKG …"
echo ""
"$DSH" plugin --profile desktop remove "$PKG"
STATUS=$?

echo ""
if [ $STATUS -ne 0 ]; then
  echo "  [x] 卸载失败（退出码 $STATUS）。"
  echo "      也可以在 DSH 设置 → 插件 里手动删除 $PKG。"
  echo ""
  read -n 1 -s -r -p "  按任意键退出… "
  echo ""
  exit $STATUS
fi

echo "  ================================================"
echo "   已卸载 ✓"
echo "  ================================================"
echo ""
echo "  请 Cmd+Q 彻底退出 DeepSeek Harness，再重新打开。"
echo "  界面会回到默认主题。"
echo ""
read -n 1 -s -r -p "  按任意键退出… "
echo ""
