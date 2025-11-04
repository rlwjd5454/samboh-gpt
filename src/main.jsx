import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import Login from "./login.jsx"; // pages 폴더 아님
import SelectLevel from "./pages/SelectLevel.jsx";
import SecondaryHome from "./pages/SecondaryHome.jsx";
import ElementaryHome from "./pages/ElementaryHome.jsx";

function Dashboard() {
  return (
    <div className="min-h-screen p-8 bg-white text-gray-800">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">로그인 성공 후 진입 페이지</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 로그인 */}
        <Route path="/" element={<Login />} />

        {/* 로그인 성공 후 과정 선택 */}
        <Route path="/select" element={<SelectLevel />} />

        {/* 중등/초등 대시보드 */}
        <Route path="/dashboard/middle" element={<SecondaryHome />} />
        <Route path="/dashboard/elementary" element={<ElementaryHome />} />

        {/* 기본 페이지 및 리다이렉트 */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
