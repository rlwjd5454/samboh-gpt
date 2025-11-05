import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MIDDLE from "../data/middle_classes_2510.json";
import ELEM from "../data/elementary_classes_2510.json";

export default function TeacherClasses() {
  const { division, teacher } = useParams();
  const nav = useNavigate();

  const src = division === "middle" ? MIDDLE : division === "elementary" ? ELEM : {};
  const classes = useMemo(() => {
    const key = decodeURIComponent(teacher);
    const list = src?.classesByTeacher?.[key] || [];
    return Array.isArray(list) ? list : [];
  }, [src, teacher]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => nav(-1)} className="text-sm text-slate-600 hover:underline">
            ← 뒤로
          </button>
          <h1 className="text-xl font-semibold text-slate-900">
            {decodeURIComponent(teacher)} · {division === "middle" ? "중등" : "초등"} 반 목록
          </h1>
        </div>

        {classes.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-6 text-sm text-slate-600 bg-white">
            반 목록 데이터가 없습니다. <code>classesByTeacher</code>를 구성하세요.
            <div className="mt-3 text-xs text-slate-500">
              예시: {"{ \"classesByTeacher\": { \"Ella\": [ {\"className\":\"25 가을[408 Ella] H3 화목 7:30\",\"level\":\"H3\"} ] } }"}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {classes.map(({ className, level }) => (
              <div key={className} className="rounded-2xl shadow bg-white p-4 border">
                <div className="text-base font-medium text-slate-900">{className}</div>
                <div className="text-xs text-slate-500 mt-1">레벨: {level || "-"}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
