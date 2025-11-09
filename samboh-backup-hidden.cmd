@echo off
setlocal

set "REPO_DIR=C:\samboh-gpt"
set "GIT_REMOTE_URL=https://github.com/rlwjd5454/samboh-gpt.git"
set "BRANCH=main"
set "INTERVAL_SEC=600"
set "LOG_DIR=%REPO_DIR%\logs"
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

for /f %%i in ('wmic os get localdatetime ^| find "."') do set "DT=%%i"
set "DAYSTAMP=%DT:~0,4%%DT:~4,2%%DT:~6,2%"
set "LOG_FILE=%LOG_DIR%\backup_%DAYSTAMP%.log"

where git >nul 2>&1 || (echo [ERROR] Git이 설치되지 않았습니다. https://git-scm.com 설치 후 다시 실행하세요. & pause & exit /b 1)

:: PowerShell 창 숨김(-WindowStyle Hidden)
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -Command ^
  "$ErrorActionPreference='Stop';" ^
  "$log='%LOG_FILE%';" ^
  "Start-Transcript -Path $log -Append | Out-Null;" ^
  "Write-Host ('[START] ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'));" ^
  "Set-Location '%REPO_DIR%';" ^
  "git config --global --add safe.directory '%REPO_DIR%' | Out-Null;" ^
  "if (-not (Test-Path '.git')) { Write-Host '[INIT] git init'; git init | Out-Null };" ^
  "$curbr = (git symbolic-ref --short -q HEAD 2>$null); if (-not $curbr -or $curbr -ne '%BRANCH%') { git checkout -B '%BRANCH%' | Out-Null };" ^
  "if (-not (git remote 2>$null | Select-String -Quiet '^origin$')) { Write-Host '[INIT] add origin'; git remote add origin '%GIT_REMOTE_URL%' | Out-Null };" ^
  "if (git ls-remote --heads origin 2>$null) { try { git pull --rebase origin '%BRANCH%' } catch { Write-Host '[WARN] pull skipped:' $_.Exception.Message } };" ^
  "while ($true) {" ^
  "  git add -A | Out-Null;" ^
  "  git diff --cached --quiet; $changed = -not ($LASTEXITCODE -eq 0);" ^
  "  if (-not $changed) {" ^
  "    Write-Host ('[INFO] no changes at ' + (Get-Date -Format 'HH:mm:ss'));" ^
  "    Start-Sleep -Seconds %INTERVAL_SEC%;" ^
  "    continue;" ^
  "  }" ^
  "  $ts = Get-Date -Format 'yyyy-MM-dd HH:mm:ss';" ^
  "  $msg = \"[AUTO] $ts backup\";" ^
  "  Write-Host ('[COMMIT] ' + $msg);" ^
  "  git commit -m $msg | Out-Null;" ^
  "  Write-Host '[PUSH] origin %BRANCH%';" ^
  "  try { git push -u origin '%BRANCH%' } catch { Write-Host '[ERROR] push failed:' $_.Exception.Message };" ^
  "  Start-Sleep -Seconds %INTERVAL_SEC%;" ^
  "}" ^
  "Stop-Transcript | Out-Null"

echo [LOG FILE]: %LOG_FILE%
pause
