@echo off
setlocal ENABLEDELAYEDEXPANSION

rem ===== settings =====
set "REPO_DIR=C:\samboh-gpt"
set "GIT_REMOTE_URL=https://github.com/rlwjd5454/samboh-gpt.git"
set "BRANCH=main"
set "INTERVAL_SEC=600"
set "LOG_DIR=%REPO_DIR%\logs"

if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

rem ---- daily log name (YYYYMMDD) ----
for /f %%i in ('wmic os get localdatetime ^| find "."') do set "DT=%%i"
set "YYYY=%DT:~0,4%"
set "MM=%DT:~4,2%"
set "DD=%DT:~6,2%"
set "LOG_FILE=%LOG_DIR%\backup_%YYYY%%MM%%DD%.log"

title Samboh Auto Backup
echo [START] %date% %time% >>"%LOG_FILE%"

where git >>"%LOG_FILE%" 2>&1 || (echo [ERROR] git missing >>"%LOG_FILE%" & goto END)
cd /d "%REPO_DIR%" >>"%LOG_FILE%" 2>&1 || (echo [ERROR] repo path missing >>"%LOG_FILE%" & goto END)

git config --global --add safe.directory "%REPO_DIR%" >>"%LOG_FILE%" 2>&1
git config user.name  >>"%LOG_FILE%" 2>&1 || git config user.name "rlwjd5454" >>"%LOG_FILE%" 2>&1
git config user.email >>"%LOG_FILE%" 2>&1 || git config user.email "none@example.com" >>"%LOG_FILE%" 2>&1

if not exist ".git" (
  git init >>"%LOG_FILE%" 2>&1 || goto END
)

for /f "tokens=*" %%a in ('git symbolic-ref --short -q HEAD 2^>nul') do set "CURBR=%%a"
if /I not "!CURBR!"=="%BRANCH%" git checkout -B "%BRANCH%" >>"%LOG_FILE%" 2>&1

git remote get-url origin >>"%LOG_FILE%" 2>&1 || git remote add origin "%GIT_REMOTE_URL%" >>"%LOG_FILE%" 2>&1
git ls-remote --heads origin >>"%LOG_FILE%" 2>&1 && git pull --rebase origin "%BRANCH%" >>"%LOG_FILE%" 2>&1

echo [AUTO] interval=%INTERVAL_SEC%s >>"%LOG_FILE%"
:loop
  git add -A >>"%LOG_FILE%" 2>&1

  git diff --cached --quiet
  if %errorlevel%==0 (
    for /f %%i in ('wmic os get localdatetime ^| find "."') do set "DT=%%i"
    set "hh=!DT:~8,2!" & set "nn=!DT:~10,2!" & set "ss=!DT:~12,2!"
    echo [INFO] no changes at !hh!:!nn!:!ss! >>"%LOG_FILE%"
    timeout /t %INTERVAL_SEC% /nobreak >nul
    goto loop
  )

  for /f %%i in ('wmic os get localdatetime ^| find "."') do set "DT=%%i"
  set "TS=!DT:~0,4!-!DT:~4,2!-!DT:~6,2! !DT:~8,2!:!DT:~10,2!:!DT:~12,2!"
  set "MSG=[AUTO] !TS! backup"

  echo [COMMIT] !MSG! >>"%LOG_FILE%"
  git commit -m "!MSG!" >>"%LOG_FILE%" 2>&1 || goto GIT_ERR

  echo [PUSH] origin %BRANCH% >>"%LOG_FILE%"
  git push -u origin "%BRANCH%" >>"%LOG_FILE%" 2>&1 || goto GIT_ERR

  timeout /t %INTERVAL_SEC% /nobreak >nul
  goto loop

:GIT_ERR
echo [ERROR] push failed. Check GitHub auth or remote. >>"%LOG_FILE%"
goto END

:END
echo [LOG] %LOG_FILE%
echo Press any key to exit.
pause >nul
