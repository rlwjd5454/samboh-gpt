import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sambohLogo from "/samboh-logo.jpg";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (id === "samboh" && pw === "5623630") {
      navigate("/select");
    } else {
      alert("잘못된 로그인 정보입니다.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-96 text-center">
        <img
          src={sambohLogo}
          alt="Samboh Logo"
          className="w-32 mx-auto mb-6 rounded-full"
        />
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Samboh</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg py-2 mt-2 hover:bg-blue-700 transition-all"
          >
            로그인
          </button>
        </form>
      </div>
    </main>
  );
}
