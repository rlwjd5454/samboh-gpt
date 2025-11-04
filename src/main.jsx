import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminSelect from "./pages/AdminSelect.jsx";
import SecondaryHome from "./pages/SecondaryHome.jsx";
import ElementaryHome from "./pages/ElementaryHome.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/select" element={<AdminSelect />} />
        <Route path="/admin/secondary" element={<SecondaryHome />} />
        <Route path="/admin/elementary" element={<ElementaryHome />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
