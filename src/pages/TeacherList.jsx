import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MIDDLE from "../data/middle_classes_2510.json";
import ELEM from "../data/elementary_classes_2510.json";

export default function TeacherList() {
  const { division } = useParams();
  const nav = useNavigate();

  const title = division === "middle" ? "중등 담임 목록" : "초등 담임 목록";
  const data = useMemo(() => {
    const src = division === "middle" ? MIDDLE : division === "elementary" ? ELEM : null;
    return Array.isArray(src?.teachers) ? src.teachers : [];
  }, [division]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center gap-3">
          <button onClick={() => nav(-1)} className="text-sm text-slate-600 hover:underline">
            ← 뒤로
          </button>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6">
          {data.map((name) => (
            <button
              key={name}
              onClick={() => nav(`/classes/${division}/${encodeURIComponent(name)}`)}
              className="rounded-2xl bg-white border shadow-sm hover:shadow-md transition p-4 text-left"
            >
              <div className="text-base font-medium text-slate-900">{name}</div>
              <div className="text-xs text-slate-500 mt-1">담임 상세 보기</div>
            </button>
          ))}
        </div>

        {data.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed bg-white p-6 text-sm text-slate-600">
            담임 데이터가 없습니다. <code>data/*_classes_2510.json</code>의 <code>teachers</code> 배열을 확인하세요.
          </div>
        )}
      </div>
    </div>
  );
}
