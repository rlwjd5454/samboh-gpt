import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-2xl font-semibold text-slate-900 text-center">
          관리자 대시보드
        </h1>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => nav("/teachers/middle")}
            className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-left hover:shadow-md"
          >
            <p className="text-lg font-medium text-slate-900">중등 과정 평가</p>
            <p className="text-sm text-slate-500">중등 담임 목록 보기</p>
          </button>

          <button
            onClick={() => nav("/teachers/elementary")}
            className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-left hover:shadow-md"
          >
            <p className="text-lg font-medium text-slate-900">초등 과정 평가</p>
            <p className="text-sm text-slate-500">초등 담임 목록 보기</p>
          </button>
        </div>
      </div>
    </div>
  );
}
