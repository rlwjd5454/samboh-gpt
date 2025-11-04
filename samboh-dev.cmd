@echo off
setlocal

set "REPO_DIR=C:\samboh-gpt"
set "LOG_DIR=%REPO_DIR%\logs"
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

for /f %%i in ('wmic os get localdatetime ^| find "."') do set "DT=%%i"
set "STAMP=%DT:~0,4%%DT:~4,2%%DT:~6,2%_%DT:~8,2%%DT:~10,2%%DT:~12,2%"
set "LOG_FILE=%LOG_DIR%\dev_%STAMP%.log"

where node >nul 2>&1 || (echo [ERROR] Node.js 미설치. https://nodejs.org & pause & exit /b 1)
where npm  >nul 2>&1 || (echo [ERROR] npm 미설치. Node 설치 확인. & pause & exit /b 1)

powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop';" ^
  "$log='%LOG_FILE%';" ^
  "Start-Transcript -Path $log -Append | Out-Null;" ^
  "Write-Host '[START]' (Get-Date -Format 'yyyy-MM-dd HH:mm:ss');" ^
  "Set-Location '%REPO_DIR%';" ^
  "if (Test-Path 'package-lock.json') { Write-Host '[NPM] npm ci'; npm ci } else { Write-Host '[NPM] npm install'; npm install };" ^
  "Write-Host '[DEV] npm run dev';" ^
  "npm run dev;" ^
  "Stop-Transcript | Out-Null"

echo.
echo [LOG] %LOG_FILE%
pause
