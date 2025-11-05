import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sambohLogo from "/samboh-logo.jpg";

const ADMIN_ID = "samboh";
const ADMIN_PW = "5623630";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth") === "admin") nav("/admin", { replace: true });
  }, [nav]);

  function onSubmit(e) {
    e.preventDefault();
    if (id === ADMIN_ID && pw === ADMIN_PW) {
      localStorage.setItem("auth", "admin");
      setErr("");
      nav("/admin", { replace: true });
    } else {
      setErr("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  }

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <div className="flex flex-col items-center space-y-3">
          <img src={sambohLogo} alt="Samboh" className="h-12" />
          <h1 className="text-lg font-semibold text-slate-900">관리자 로그인</h1>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <label className="block text-sm text-slate-600">아이디</label>
          <input
            autoFocus
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full border rounded-xl p-2"
            placeholder="samboh"
          />

          <label className="block text-sm text-slate-600">비밀번호</label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full border rounded-xl p-2"
            placeholder="비밀번호"
          />

          {err && <p className="text-sm text-red-600">{err}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-xl py-2 hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
