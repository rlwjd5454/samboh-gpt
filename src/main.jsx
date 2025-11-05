import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import TeacherList from "./pages/TeacherList.jsx";
import TeacherClasses from "./pages/TeacherClasses.jsx";
import Logout from "./pages/Logout.jsx";
// ...
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/teachers/:division" element={<TeacherList />} />
          <Route path="/classes/:division/:teacher" element={<TeacherClasses />} />
        </Route>
        <Route path="/logout" element={<Logout />} />   {/* 추가 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>


function RequireAdmin() {
  const ok = typeof window !== "undefined" && localStorage.getItem("auth") === "admin";
  return ok ? <Outlet /> : <Navigate to="/" replace />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 메인 = 로그인 고정 */}
        <Route path="/" element={<Login />} />

        {/* 보호 라우트 */}
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/teachers/:division" element={<TeacherList />} />
          <Route path="/classes/:division/:teacher" element={<TeacherClasses />} />
        </Route>

        {/* 나머지는 로그인으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
