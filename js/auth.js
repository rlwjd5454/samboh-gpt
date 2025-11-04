// Simple client-side auth. Hardcoded admin credentials.
(function(){
  const form = document.getElementById("loginForm");
  if (!form) return;
  const $id = document.getElementById("userId");
  const $pw = document.getElementById("password");
  const $err = document.getElementById("error");

  const ADMIN_ID = "samboh";
  const ADMIN_PW = "5623630";

  form.addEventListener("submit", function(e){
    e.preventDefault();
    const id = ($id.value || "").trim();
    const pw = ($pw.value || "").trim();
    if (id === ADMIN_ID && pw === ADMIN_PW) {
      sessionStorage.setItem("samboh_auth_ok", "1");
      window.location.href = "./dashboard.html";
    } else {
      $err.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
      $pw.value = "";
      $pw.focus();
    }
  });
})();