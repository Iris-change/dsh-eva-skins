@echo off
chcp 936 >nul 2>&1
title EVA 皮肤合集 · 一键安装
setlocal enabledelayedexpansion
color 0C

echo.
echo   ============================================
echo      DeepSeek Harness  EVA 皮肤合集
echo      二号机 / 零号机 / 初号机 / 八号机
echo   ============================================
echo.

set "HERE=%~dp0"
set "PKG=%HERE:~0,-1%"
set "DSH="

for %%R in ("%LOCALAPPDATA%\Programs" "%ProgramFiles%" "%ProgramW6432%" "%ProgramFiles(x86)%") do (
  if exist "%%~R\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd" (
    set "DSH=%%~R\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd"
  )
)

if not defined DSH (
  for /f "delims=" %%P in ('where dsh.cmd 2^>nul') do (
    set "DSH=%%P"
  )
)

if not defined DSH (
  echo   [x] 没找到 DeepSeek Harness
  echo.
  echo       请先安装 DeepSeek Harness 桌面版，
  echo       装好并能正常打开后，再双击本文件。
  echo.
  echo       如果你确定装了但这里没找到，把下面这一行
  echo       截图发给作者：
  echo       %LOCALAPPDATA%\Programs\DeepSeek Harness
  echo.
  pause
  exit /b 1
)

echo   [1/2] 找到 DeepSeek Harness
echo         %DSH%
echo   [2/2] 正在安装皮肤，请稍等（第一次约 30 秒）...
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
echo      接下来这一步别省：
echo        彻底退出 DeepSeek Harness（不是关窗口）
echo        任务栏图标右键退出，或任务管理器结束它，
echo        然后重新打开。
echo.
echo      打开后输入框左侧会出现胶囊，
echo      点开可切换：二号机 / 零号机 / 初号机 / 八号机 / 默认主题。
echo.
pause