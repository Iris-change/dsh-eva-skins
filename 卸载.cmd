@echo off
chcp 936 >nul 2>&1
title UNIT-02 Ƥ�� �� ж��
setlocal enabledelayedexpansion
color 07

echo.
echo   ����ж�� UNIT-02 Ƥ��...
echo.

set "DSH=%LOCALAPPDATA%\Programs\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd"

if not exist "%DSH%" (
  echo   [x] û�ҵ� DeepSeek Harness
  pause
  exit /b 1
)

call "%DSH%" plugin --profile desktop remove dsh-eva-skins

echo.
echo   ��ж�ء��ص� DeepSeek Harness ���������´򿪣��ͻص�Ĭ�Ͻ����ˡ�
echo   ����װ������˫����һ����װ.cmd�����ɡ�
echo.
pause