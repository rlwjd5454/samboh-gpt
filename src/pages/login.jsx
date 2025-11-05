import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import sambohLogo from "/samboh-logo.jpg";

const ADMIN_ID = "samboh";
const ADMIN_PW = "5623630";

export default function Login() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState("");

  // /?reset=1 로 접속 시 로그인 정보 초기화
  if (params.get("reset") === "1") {
    localStorage.removeItem("auth");
    nav("/", { replace: true });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (id === ADMIN_ID && pw === ADMIN_PW) {
      if (remember) localStorage.setItem("auth", "admin");
      else localStorage.removeItem("auth");
      nav("/admin", { replace: true });
    } else {
      setErr("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  }

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center">
          <img src={sambohLogo} alt="Samboh Logo" className="w-40 h-auto" />
          <h1 className="mt-3 text-lg font-semibold text-slate-900">관리자 로그인</h1>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <label className="block text-sm text-slate-600">아이디</label>
          <input
            autoFocus
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full rounded-xl border p-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="samboh"
          />

          <label className="block text-sm text-slate-600">비밀번호</label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full rounded-xl border p-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="비밀번호"
          />

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            로그인 상태 유지
          </label>

          {err && <p className="text-sm text-red-600">{err}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
