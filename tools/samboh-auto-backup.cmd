@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: -----------------------------------------
:: Samboh GPT 자동 Git 백업 스크립트
:: GitHub: rlwjd5454/samboh-gpt
:: 주기: 10분 (600초)
:: -----------------------------------------

set "REMOTE_URL=https://github.com/rlwjd5454/samboh-gpt.git"
set "BRANCH=main"
set "LOG=%~dp0auto-backup.log"

where git >nul 2>&1
if errorlevel 1 (
  echo [오류] Git이 설치되어 있지 않습니다. https://git-scm.com 설치 후 다시 시도하세요.
  pause
  exit /b
)

cd /d "%~dp0.."
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [안내] Git 저장소가 없어 초기화 중입니다...
  git init >nul
  git branch -M %BRANCH%
  git remote add origin %REMOTE_URL%
)

for /f "delims=" %%b in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set "CUR_BRANCH=%%b"
if "%CUR_BRANCH%"=="" set "CUR_BRANCH=%BRANCH%"

cls
echo =============================================
echo [Samboh-GPT Auto Backup System]
echo 저장소 : %REMOTE_URL%
echo 브랜치 : %CUR_BRANCH%
echo 주기   : 10분
echo 로그   : %LOG%
echo =============================================
echo 시작 시각: %date% %time%
echo --------------------------------------------- >> "%LOG%"
echo ==== START %date% %time% ==== >> "%LOG%"

:LOOP
echo.
echo [%time%] 변경 확인 중...

git status --porcelain > temp_status.txt
for /f %%A in ('find /c /v "" ^< temp_status.txt') do set COUNT=%%A
del temp_status.txt >nul 2>&1

if %COUNT% GTR 0 (
    set "TS=%date% %time%"
    echo [%time%] 변경 감지됨 → 자동 커밋/푸시 중...
    echo [%time%] 변경 감지됨 >> "%LOG%"
    git add -A >> "%LOG%" 2>&1
    git commit -m "auto: backup %TS%" >> "%LOG%" 2>&1
    git push origin %CUR_BRANCH% >> "%LOG%" 2>&1
    if errorlevel 1 (
        echo [%time%] [경고] push 실패 (인터넷/토큰 확인) >> "%LOG%"
        echo [%time%] [경고] push 실패 (로그 확인)
    ) else (
        echo [%time%] 백업 완료 (GitHub에 푸시됨)
        echo [%time%] 백업 완료 >> "%LOG%"
    )
) else (
    echo [%time%] 변경 없음.
    echo [%time%] 변경 없음 >> "%LOG%"
)

echo 다음 백업까지 대기 중...(10분)
timeout /t 600 /nobreak >nul
goto :LOOP
