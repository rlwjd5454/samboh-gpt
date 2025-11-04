import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import Login from "./Login.jsx";
import AdminSelect from "./AdminSelect.jsx";
import SecondaryHome from "./SecondaryHome.jsx";
import ElementaryHome from "./ElementaryHome.jsx";

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

        {/* 로그인 성공 */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 관리자 선택 및 섹션 */}
        <Route path="/admin/select" element={<AdminSelect />} />
        <Route path="/admin/secondary" element={<SecondaryHome />} />
        <Route path="/admin/elementary" element={<ElementaryHome />} />

        {/* 기본 리다이렉트 / 404 */}
        <Route path="/admin" element={<Navigate to="/admin/select" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
