@echo off
setlocal ENABLEDELAYEDEXPANSION

rem ===== paths =====
set "REPO_DIR=C:\samboh-gpt"
set "LOG_DIR=%REPO_DIR%\logs"

if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

rem ---- safe timestamp (YYYYMMDD_HHMMSS) ----
for /f %%i in ('wmic os get localdatetime ^| find "."') do set "DT=%%i"
set "YYYY=%DT:~0,4%"
set "MM=%DT:~4,2%"
set "DD=%DT:~6,2%"
set "hh=%DT:~8,2%"
set "nn=%DT:~10,2%"
set "ss=%DT:~12,2%"
set "STAMP=%YYYY%%MM%%DD%_%hh%%nn%%ss%"

set "LOG_FILE=%LOG_DIR%\dev_%STAMP%.log"

echo [START] %YYYY%-%MM%-%DD% %hh%:%nn%:%ss% > "%LOG_FILE%"
echo [INFO] REPO=%REPO_DIR% >> "%LOG_FILE%"

where node >>"%LOG_FILE%" 2>&1 || (echo [ERROR] Node.js not found >>"%LOG_FILE%" & goto END)
where npm  >>"%LOG_FILE%" 2>&1 || (echo [ERROR] npm not found >>"%LOG_FILE%" & goto END)

for /f "tokens=*" %%v in ('node -v') do set "NODEVER=%%v"
echo [INFO] Node !NODEVER! >> "%LOG_FILE%"

cd /d "%REPO_DIR%" >>"%LOG_FILE%" 2>&1 || (echo [ERROR] repo path missing >>"%LOG_FILE%" & goto END)

if exist package-lock.json (
  echo [NPM] npm ci >>"%LOG_FILE%"
  call npm ci >>"%LOG_FILE%" 2>&1 || (echo [ERROR] npm ci failed >>"%LOG_FILE%" & goto END)
) else (
  echo [NPM] npm install >>"%LOG_FILE%"
  call npm install >>"%LOG_FILE%" 2>&1 || (echo [ERROR] npm install failed >>"%LOG_FILE%" & goto END)
)

echo [DEV] npm run dev >>"%LOG_FILE%"
echo --------------------------------------------- >>"%LOG_FILE%"
call npm run dev >>"%LOG_FILE%" 2>&1

:END
echo.
echo [LOG] %LOG_FILE%
echo Press any key to exit.
pause >nul
