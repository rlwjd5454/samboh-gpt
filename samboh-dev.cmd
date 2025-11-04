@echo off
setlocal ENABLEDELAYEDEXECUTION
set "REPO_DIR=C:\samboh-gpt"
set "LOG_DIR=%REPO_DIR%\logs"
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"
set "LOG_FILE=%LOG_DIR%\dev_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%.log"
set "TS=%date% %time%"

echo [START] %TS% > "%LOG_FILE%"
echo [INFO] REPO=%REPO_DIR% >> "%LOG_FILE%"

where node >>"%LOG_FILE%" 2>&1 || (echo [ERROR] Node.js 미설치 >>"%LOG_FILE%" & goto END)
where npm  >>"%LOG_FILE%" 2>&1 || (echo [ERROR] npm 미설치 >>"%LOG_FILE%" & goto END)

for /f "tokens=*" %%v in ('node -v') do set NODEVER=%%v
echo [INFO] Node %NODEVER% >> "%LOG_FILE%"

cd /d "%REPO_DIR%" >>"%LOG_FILE%" 2>&1 || (echo [ERROR] 경로 없음: %REPO_DIR% >>"%LOG_FILE%" & goto END)

if exist package-lock.json (
  echo [NPM] npm ci | tee
  call npm ci >>"%LOG_FILE%" 2>&1 || goto NPM_FAIL
) else (
  echo [NPM] npm install | tee
  call npm install >>"%LOG_FILE%" 2>&1 || goto NPM_FAIL
)

echo [DEV] npm run dev | tee
echo --------------------------------------------- >>"%LOG_FILE%"
call npm run dev >>"%LOG_FILE%" 2>&1
goto END

:NPM_FAIL
echo [ERROR] npm 설치 단계 실패. 로그 확인: %LOG_FILE%
goto END

:END
echo.
echo [LOG] %LOG_FILE%
echo 창을 닫지 않음. 아무 키나 누르면 종료.
pause >nul
