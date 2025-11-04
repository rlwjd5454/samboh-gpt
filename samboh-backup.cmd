@echo off
setlocal ENABLEDELAYEDEXECUTION

set "REPO_DIR=C:\samboh-gpt"
set "GIT_REMOTE_URL=https://github.com/rlwjd5454/samboh-gpt.git"
set "BRANCH=main"
set "INTERVAL_SEC=600"
set "LOG_DIR=%REPO_DIR%\logs"
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"
set "LOG_FILE=%LOG_DIR%\backup_%date:~0,4%%date:~5,2%%date:~8,2%.log"

title Samboh Auto Backup
echo [START] %date% %time% >>"%LOG_FILE%"

where git >>"%LOG_FILE%" 2>&1 || (echo [ERROR] git 미설치 >>"%LOG_FILE%" & goto END)
cd /d "%REPO_DIR%" >>"%LOG_FILE%" 2>&1 || (echo [ERROR] 경로 없음: %REPO_DIR% >>"%LOG_FILE%" & goto END)

git config --global --add safe.directory "%REPO_DIR%" >>"%LOG_FILE%" 2>&1
git config user.name  >>"%LOG_FILE%" 2>&1 || git config user.name "rlwjd5454" >>"%LOG_FILE%" 2>&1
git config user.email >>"%LOG_FILE%" 2>&1 || git config user.email "none@example.com" >>"%LOG_FILE%" 2>&1

if not exist ".git" (
  git init >>"%LOG_FILE%" 2>&1 || goto END
)

for /f "tokens=*" %%a in ('git symbolic-ref --short -q HEAD 2^>nul') do set "CURBR=%%a"
if /I not "%CURBR%"=="%BRANCH%" git checkout -B "%BRANCH%" >>"%LOG_FILE%" 2>&1

git remote get-url origin >>"%LOG_FILE%" 2>&1 || git remote add origin "%GIT_REMOTE_URL%" >>"%LOG_FILE%" 2>&1
git ls-remote --heads origin >>"%LOG_FILE%" 2>&1 && git pull --rebase origin "%BRANCH%" >>"%LOG_FILE%" 2>&1

echo [AUTO] %INTERVAL_SEC%s 간격 시작 >>"%LOG_FILE%"
:loop
  git add -A >>"%LOG_FILE%" 2>&1

  git diff --cached --quiet
  if %errorlevel%==0 (
    echo [%date% %time%] 변경 없음 >>"%LOG_FILE%"
    timeout /t %INTERVAL_SEC% /nobreak >nul
    goto loop
  )

  set "TS=%date% %time%"
  set "MSG=[AUTO] %TS% backup"
  echo [%TS%] commit >>"%LOG_FILE%"
  git commit -m "%MSG%" >>"%LOG_FILE%" 2>&1 || goto GIT_ERR

  echo [%TS%] push >>"%LOG_FILE%"
  git push -u origin "%BRANCH%" >>"%LOG_FILE%" 2>&1 || goto GIT_ERR

  timeout /t %INTERVAL_SEC% /nobreak >nul
  goto loop

:GIT_ERR
echo [ERROR] push 실패. GitHub 자격증명 또는 권한 확인. 로그: %LOG_FILE%
goto END

:END
echo [LOG] %LOG_FILE%
echo 창을 닫지 않음. 아무 키나 누르면 종료.
pause >nul
