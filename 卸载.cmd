@echo off
chcp 936 >nul 2>&1
title UNIT-02 皮肤 · 卸载
setlocal enabledelayedexpansion
color 07

echo.
echo   正在卸载 UNIT-02 皮肤...
echo.

set "DSH=%LOCALAPPDATA%\Programs\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd"

if not exist "%DSH%" (
  echo   [x] 没找到 DeepSeek Harness
  pause
  exit /b 1
)

call "%DSH%" plugin --profile desktop remove dsh-unit02-skin

echo.
echo   已卸载。关掉 DeepSeek Harness 窗口再重新打开，就回到默认界面了。
echo   想再装回来，双击「一键安装.cmd」即可。
echo.
pause