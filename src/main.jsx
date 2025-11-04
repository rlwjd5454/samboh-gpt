import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import Login from "./pages/Login.jsx";
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
        <Route path="/" element={<Login />} />
        <Route path="/select" element={<SelectLevel />} />
        <Route path="/dashboard/middle" element={<SecondaryHome />} />
        <Route path="/dashboard/elementary" element={<ElementaryHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
