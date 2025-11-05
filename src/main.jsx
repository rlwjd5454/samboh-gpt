import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import TeacherList from "./pages/TeacherList.jsx";
import TeacherClasses from "./pages/TeacherClasses.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 로그인 고정 */}
        <Route path="/" element={<Login />} />

        {/* 담임 목록: /teachers/middle 또는 /teachers/elementary */}
        <Route path="/teachers/:division" element={<TeacherList />} />

        {/* 담임 클릭 후 반 목록 우선 표시 */}
        <Route path="/classes/:division/:teacher" element={<TeacherClasses />} />

        {/* 잘못된 경로는 로그인으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
