import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSelect() {
  const nav = useNavigate();
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/samboh-logo.jpg"
              alt="Samboh"
              className="h-10 w-10 rounded"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <h1 className="text-2xl font-semibold">관리자 대시보드</h1>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => nav("/admin/secondary")}
            className="rounded-2xl bg-white shadow hover:shadow-lg transition p-6 text-left border border-gray-100"
          >
            <div className="text-sm text-gray-500">분류</div>
            <div className="mt-1 text-2xl font-bold">중등</div>
            <p className="mt-3 text-gray-600 text-sm">P/M/H 레벨 시험 및 분석으로 이동</p>
          </button>

          <button
            onClick={() => nav("/admin/elementary")}
            className="rounded-2xl bg-white shadow hover:shadow-lg transition p-6 text-left border border-gray-100"
          >
            <div className="text-sm text-gray-500">분류</div>
            <div className="mt-1 text-2xl font-bold">초등</div>
            <p className="mt-3 text-gray-600 text-sm">G/R 레벨 시험 및 분석으로 이동</p>
          </button>
        </section>
      </div>
    </main>
  );
}
