import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import TeacherList from "./pages/TeacherList.jsx";
import ClassList from "./pages/ClassList.jsx";
import "./index.css";

function RequireAuth({ children }) {
  const authed = typeof window !== "undefined" && localStorage.getItem("auth") === "admin";
  return authed ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* 보호 구간 */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/teachers/:division"
          element={
            <RequireAuth>
              <TeacherList />
            </RequireAuth>
          }
        />
        <Route
          path="/classes"
          element={
            <RequireAuth>
              <ClassList />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
