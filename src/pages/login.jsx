import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sambohLogo from "/samboh-logo.jpg";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const nav = useNavigate();

  // 이미 로그인되어 있으면 바로 대시보드
  useEffect(() => {
    if (localStorage.getItem("auth") === "admin") {
      nav("/admin", { replace: true });
    }
  }, [nav]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (id === "samboh" && pw === "5623630") {
      localStorage.setItem("auth", "admin"); // ← 인증 플래그 저장
      nav("/admin", { replace: true });
      return;
    }
    alert("잘못된 ID 또는 비밀번호입니다.");
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <img src={sambohLogo} alt="Samboh Logo" className="w-40 h-40 mb-6" />
      <h1 className="text-3xl font-bold mb-6">Samboh</h1>

      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-md p-8 w-80 flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border rounded-xl p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="border rounded-xl p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-xl py-2 hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
