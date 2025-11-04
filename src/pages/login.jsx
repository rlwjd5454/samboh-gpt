import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_ID = "samboh";
const ADMIN_PW = "5623630";

export default function Login() {
  const nav = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (id.trim() === ADMIN_ID && pw === ADMIN_PW) {
      setErr("");
      nav("/admin/select");
    } else {
      setErr("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <main className="min-h-screen w-full bg-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 select-none">
          <img
            src="/samboh-logo.jpg"
            alt="Samboh"
            className="h-16 w-auto mb-3 drop-shadow"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <h1 className="text-white text-2xl font-semibold">Admin Login</h1>
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl p-6">
          <label className="block text-sm text-gray-700">아이디</label>
          <input
            autoFocus
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="samboh"
          />

          <label className="block text-sm text-gray-700 mt-4">비밀번호</label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="•••••••"
          />

          {err && <p className="mt-3 text-sm text-red-600">{err}</p>}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 active:bg-blue-800"
          >
            로그인
          </button>
        </form>

        <p className="text-center text-xs text-white/80 mt-6">
          © {new Date().getFullYear()} Samboh
        </p>
      </div>
    </main>
  );
}
