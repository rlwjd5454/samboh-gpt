import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TEACHERS } from "../shared/teachers";

export default function TeacherList() {
  const { division } = useParams();
  const nav = useNavigate();

  const title = division === "middle" ? "중등 담임 목록" : "초등 담임 목록";
  const data = useMemo(() => {
    if (division === "middle") return TEACHERS.middle;
    if (division === "elementary") return TEACHERS.elementary;
    return [];
  }, [division]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-center gap-3">
          <button
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-100"
            onClick={() => nav(-1)}
          >
            ← 뒤로
          </button>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        </div>

        {/* 5열 카드형 그리드 */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-12">
          {data.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-center rounded-2xl bg-blue-500 p-6 hover:bg-blue-400 transition text-black font-semibold text-xl text-center shadow-sm"
            >
              {t.name}
            </div>
          ))}
        </div>

        {data.length === 0 && (
          <p className="text-sm text-slate-500 mt-6">
            목록이 없습니다. `shared/teachers.js`를 채워 넣으세요.
          </p>
        )}
      </div>
    </div>
  );
}
