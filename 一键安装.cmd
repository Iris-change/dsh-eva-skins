@echo off
chcp 936 >nul 2>&1
title UNIT-02 皮肤 · 一键安装
setlocal enabledelayedexpansion
color 0C

echo.
echo   ============================================
echo      EVA / ASUKA  UNIT-02  皮肤  一键安装
echo   ============================================
echo.

set "HERE=%~dp0"
set "PKG=%HERE:~0,-1%"
set "DSH=%LOCALAPPDATA%\Programs\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd"

if not exist "%DSH%" (
  echo   [x] 没找到 DeepSeek Harness
  echo.
  echo       请先安装 DeepSeek Harness 桌面版，
  echo       装好后再双击本文件。
  echo.
  pause
  exit /b 1
)

echo   [1/2] 找到 DeepSeek Harness
echo   [2/2] 正在安装皮肤，请稍等（第一次要 30 秒左右）...
echo.

call "%DSH%" plugin --profile desktop add "%PKG%"

if errorlevel 1 (
  echo.
  echo   [x] 安装失败。把上面的红字截图发给作者。
  echo.
  pause
  exit /b 1
)

echo.
echo   ============================================
echo      装好了！
echo   ============================================
echo.
echo      现在请：关掉 DeepSeek Harness 窗口，再重新打开。
echo      打开后，输入框左侧会出现  UNIT-02  胶囊，
echo      点开可切换 二号机 / 零号机 / 默认主题。
echo.
pause