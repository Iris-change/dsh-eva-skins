#!/bin/bash
# DSH EVA skins · macOS installer
# 四套皮肤：二号机(明日香) / 零号机(绫波丽) / 初号机(碇真嗣) / 八号机(真希波)
set -u

HERE="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="DeepSeek Harness.app"
DSH=""

echo ""
echo "  ================================================"
echo "   DSH EVA skins · installer  (macOS)"
echo "  ================================================"
echo ""

# ---------- 1. 找 DeepSeek Harness ----------
# 先看命令行里有没有 dsh
if command -v dsh >/dev/null 2>&1; then
  DSH="$(command -v dsh)"
fi

# 再按常见安装位置找 app 包里的 cli
if [ -z "$DSH" ]; then
  for base in "/Applications" "$HOME/Applications" "$HOME/Desktop" "/Users/Shared"; do
    for rel in \
      "Contents/Resources/runtime/cli/bin/dsh" \
      "Contents/Resources/runtime/bin/dsh" \
      "Contents/Resources/app.asar.unpacked/dsh/node_modules/@deepseek-ai/dsh-desktop-host/lib/cli.js"
    do
      cand="$base/$APP_NAME/$rel"
      if [ -f "$cand" ] && [ -x "$cand" ]; then DSH="$cand"; break 2; fi
    done
  done
fi

# 最后用 Spotlight 兜底
if [ -z "$DSH" ] && command -v mdfind >/dev/null 2>&1; then
  hit="$(mdfind -name "$APP_NAME" 2>/dev/null | head -n 1)"
  if [ -n "$hit" ]; then
    for rel in \
      "Contents/Resources/runtime/cli/bin/dsh" \
      "Contents/Resources/runtime/bin/dsh"
    do
      cand="$hit/$rel"
      if [ -f "$cand" ] && [ -x "$cand" ]; then DSH="$cand"; break; fi
    done
  fi
fi

if [ -z "$DSH" ]; then
  echo "  [x] 没找到 DeepSeek Harness。"
  echo ""
  echo "      1) 先装桌面版：https://www.deepseek.com/harness"
  echo "      2) 装好并打开过一次之后，再双击本文件。"
  echo ""
  echo "      如果已经装了但这里找不到，请在终端里执行下面这行，把结果发给作者："
  echo "        ls -d /Applications/*.app ~/Applications/*.app 2>/dev/null"
  echo ""
  read -n 1 -s -r -p "  按任意键退出… "
  echo ""
  exit 1
fi

echo "  [1/3] 找到 DSH："
echo "        $DSH"
echo ""

# ---------- 2. 去掉下载隔离标记 ----------
echo "  [2/3] 清理下载隔离标记…"
xattr -dr com.apple.quarantine "$HERE" 2>/dev/null || true
chmod +x "$HERE/install-mac.command" "$HERE/uninstall-mac.command" 2>/dev/null || true
echo "        完成"
echo ""

# ---------- 3. 安装 ----------
echo "  [3/3] 安装皮肤（第一次可能要 30–60 秒，别关窗口）…"
echo ""
"$DSH" plugin --profile desktop add "$HERE"
STATUS=$?

echo ""
if [ $STATUS -ne 0 ]; then
  echo "  [x] 安装失败（退出码 $STATUS）。"
  echo ""
  echo "      常见原因："
  echo "        · DSH 正开着 —— 先 Cmd+Q 完全退出，再重跑本脚本"
  echo "        · 没联网 —— pnpm 需要联网装链接"
  echo "        · 权限不足 —— 见 README-mac.txt 的排错一节"
  echo ""
  echo "      把上面红字截图发给作者即可。"
  echo ""
  read -n 1 -s -r -p "  按任意键退出… "
  echo ""
  exit $STATUS
fi

echo "  ================================================"
echo "   安装完成 ✓"
echo "  ================================================"
echo ""
echo "  已装的插件："
"$DSH" plugin --profile desktop list 2>/dev/null | sed 's/^/    /' || true
echo ""
echo "  现在请【彻底退出】DeepSeek Harness（Cmd+Q），再重新打开。"
echo "  打开后，输入框左下角会出现 ● UNIT-02 胶囊，点一下可切换："
echo "     默认主题 / UNIT-02(明日香) / UNIT-00(绫波丽) / UNIT-01(碇真嗣) / UNIT-08(真希波)"
echo ""
echo "  快捷键：Control+Option+U 开关皮肤   Control+Option+B 重播开机动画"
echo ""
read -n 1 -s -r -p "  按任意键退出… "
echo ""
