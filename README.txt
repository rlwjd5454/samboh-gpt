Samboh Static Web Starter (Login-first)
========================================

구성
----
- index.html : 로그인 페이지 (배경 파란색, 로고/로그인창 중앙 정렬)
- dashboard.html : 임시 관리자 대시보드
- css/styles.css : 최소 스타일
- js/auth.js : 하드코딩된 관리자 계정 검증 (ID: samboh / PW: 5623630)
- assets/logo.png : 로고 이미지

사용
----
1) ZIP을 풀어서 `samboh-web` 폴더 전체를 Netlify 또는 정적 호스팅에 업로드.
2) 로컬 미리보기: index.html을 브라우저로 열기.
3) 로그인 성공 시 dashboard.html로 이동.

주의
----
- 보안을 위해 실제 배포 시에는 서버측 인증으로 교체 권장.
- 이 프로젝트는 정적 스타터이며, 이후 페이지/컴포넌트를 덮어쓰기 방식으로 확장하세요.
