import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto p-6">
        <header className="py-6">
          <h1 className="text-2xl font-bold text-slate-900">관리자 대시보드</h1>
          <p className="text-sm text-slate-500 mt-1">담임 → 반 선택 → 성적 조회 흐름</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <button
            onClick={() => nav("/teachers/middle")}
            className="rounded-2xl bg-white shadow hover:shadow-md transition p-6 text-left border"
          >
            <div className="text-lg font-semibold text-slate-900">중등</div>
            <div className="text-sm text-slate-500 mt-1">중등 담임 목록 보기</div>
          </button>

          <button
            onClick={() => nav("/teachers/elementary")}
            className="rounded-2xl bg-white shadow hover:shadow-md transition p-6 text-left border"
          >
            <div className="text-lg font-semibold text-slate-900">초등</div>
            <div className="text-sm text-slate-500 mt-1">초등 담임 목록 보기</div>
          </button>
        </div>
      </div>
    </div>
  );
}
