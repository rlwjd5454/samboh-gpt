@echo off
setlocal enabledelayedexpansion

REM =========================
REM samboh-gpt auto backup CMD (v2)
REM Adds safe.directory automatically to avoid "dubious ownership" errors.
REM Place this file in your project root and double-click to run.
REM Repo: https://github.com/rlwjd5454/samboh-gpt.git
REM =========================

cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Git is not installed or not in PATH.
  echo Install Git and try again: https://git-scm.com/download/win
  pause
  exit /b 1
)

REM --- Add safe.directory for current path
for /f "usebackq tokens=*" %%p in (`powershell -NoProfile -Command "$pwd.Path"`) do set CURPATH=%%p
git config --global --add safe.directory "%CURPATH%" >nul 2>nul

REM Init if needed
if not exist ".git" (
  echo [INIT] Initializing git repository...
  git init || goto :GITERR
)

REM Ensure branch
for /f "tokens=*" %%b in ('git symbolic-ref --short HEAD 2^>nul') do set CURBR=%%b
if not defined CURBR (
  echo [INIT] Creating main branch...
  git checkout -b main || goto :GITERR
)

REM Set origin if missing
git remote get-url origin >nul 2>nul
if errorlevel 1 (
  echo [INIT] Setting origin remote...
  git remote add origin https://github.com/rlwjd5454/samboh-gpt.git || goto :GITERR
)

REM First commit if empty
for /f "tokens=*" %%s in ('git rev-parse --verify HEAD 2^>nul') do set HASHEAD=%%s
if not defined HASHEAD (
  echo [INIT] First commit...
  git add -A || goto :GITERR
  git commit -m "init: first commit" || goto :GITERR
  git branch -M main >nul 2>nul
  git push -u origin main || goto :PUSHERR
)

echo.
echo ==============================================
echo  Samboh-gpt auto backup ON (v2)
echo  Repository: https://github.com/rlwjd5454/samboh-gpt.git
echo  Interval: every 10 minutes
echo  Close this window to stop.
echo ==============================================
echo.

:LOOP
  set "CHANGES="
  for /f "delims=" %%i in ('git status --porcelain') do set CHANGES=1

  if defined CHANGES (
    set TS=%DATE% %TIME%
    echo [COMMIT] Changes detected at %TS%
    git add -A || goto :GITERR
    git commit -m "auto: %DATE% %TIME%" || goto :GITERR
    git push origin || goto :PUSHERR
  ) else (
    echo [SKIP] No changes. Next check in 10 minutes...
  )

  timeout /t 600 /nobreak >nul
goto LOOP

:GITERR
echo [ERROR] A git command failed. If you still see 'dubious ownership' messages:
echo         1) Run as your normal Windows user (not elevated Admin).
echo         2) Run this once in CMD:  git config --global --add safe.directory "%CURPATH%"
echo         3) Or take ownership of the folder if needed:
echo            takeown /F "%CURPATH%" /R
echo            icacls "%CURPATH%" /setowner %USERNAME% /T
echo            icacls "%CURPATH%" /grant %USERNAME%:(F) /T
pause
exit /b 1

:PUSHERR
echo [NOTICE] Push failed. Likely authentication required.
echo          Login once via Git Credential Manager or set a Personal Access Token.
echo          Then re-run this script.
pause
exit /b 1
