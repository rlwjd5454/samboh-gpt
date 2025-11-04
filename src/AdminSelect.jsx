import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSelect() {
  const nav = useNavigate();
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6">관리자 대시보드</h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => nav("/admin/secondary")}
            className="rounded-2xl bg-white shadow p-6 text-left border border-gray-100"
          >
            <div className="text-sm text-gray-500">분류</div>
            <div className="mt-1 text-2xl font-bold">중등</div>
          </button>
          <button
            onClick={() => nav("/admin/elementary")}
            className="rounded-2xl bg-white shadow p-6 text-left border border-gray-100"
          >
            <div className="text-sm text-gray-500">분류</div>
            <div className="mt-1 text-2xl font-bold">초등</div>
          </button>
        </section>
      </div>
    </main>
  );
}
