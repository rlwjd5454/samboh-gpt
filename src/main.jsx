import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import TeacherList from "./pages/TeacherList.jsx";
import TeacherClasses from "./pages/TeacherClasses.jsx";

function RequireAdmin() {
  const ok = typeof window !== "undefined" && localStorage.getItem("auth") === "admin";
  return ok ? <Outlet /> : <Navigate to="/" replace />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 로그인 고정 */}
        <Route path="/" element={<Login />} />

        {/* 관리자 영역 */}
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/teachers/:division" element={<TeacherList />} />
          <Route path="/classes/:division/:teacher" element={<TeacherClasses />} />
        </Route>

        {/* 잘못된 경로는 로그인으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
