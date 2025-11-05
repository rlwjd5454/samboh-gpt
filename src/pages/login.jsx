import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sambohLogo from "/samboh-logo.jpg";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 관리자 계정
    if (id === "samboh" && pw === "5623630") {
      nav("/admin"); // 반드시 소문자 /admin
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
