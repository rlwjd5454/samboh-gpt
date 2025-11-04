import React from "react";
import { Link } from "react-router-dom";

export default function ElementaryHome() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center">
        <h2 className="text-2xl font-semibold">초등 관리</h2>
        <p className="mt-2 text-gray-600">여기에 G/R 보드와 반배정·성적 대시보드를 추가합니다.</p>
        <Link className="inline-block mt-6 text-blue-600 hover:underline" to="/admin/select">
          ← 선택 화면으로
        </Link>
      </div>
    </div>
  );
}
