@echo off
:: 현재 파일 위치에서 상위 폴더(프로젝트 루트)로 이동
cd /d "%~dp0.."
echo [Samboh GPT 개발 서버 실행 중...]
echo -------------------------------

:: 자동 의존성 설치
npm install >nul 2>&1

:: 개발 서버 실행
npm run dev
pause
