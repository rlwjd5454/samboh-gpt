import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (id === "samboh" && pw === "5623630") navigate("/dashboard");
    else alert("아이디 또는 비밀번호가 올바르지 않습니다.");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-600">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm text-center">
        {/* 이미지 파일은 Vite의 public 폴더에 /public/samboh-logo.jpg 로 두세요 */}
        <img
          src="/samboh-logo.jpg"
          alt="Samboh Logo"
          className="w-32 h-auto mx-auto mb-8 rounded-xl shadow-sm"
        />
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Samboh 로그인</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
          >
            로그인
          </button>
        </form>
      </div>
    </main>
  );
}
