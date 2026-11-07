@echo off
chcp 936 >nul
title DeepSeek Harness EVA 皮肤合集 - 安装
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install.ps1"
if errorlevel 1 pause