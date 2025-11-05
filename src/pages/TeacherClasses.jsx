import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MIDDLE from "../data/middle_classes_2510.json";
import ELEM from "../data/elementary_classes_2510.json";

export default function TeacherClasses() {
  const { division, teacher } = useParams();
  const nav = useNavigate();

  const src = division === "middle" ? MIDDLE :
              division === "elementary" ? ELEM : {};

  const classes = useMemo(() => {
    const key = decodeURIComponent(teacher);
    const list = src[key] || [];
    // 레벨 > 반명 정렬은 JSON 생성 시 정렬되어 있음. 안전하게 재정렬.
    return [...list].sort((a, b) => (a.level+a.className).localeCompare(b.level+b.className));
  }, [division, teacher]);

  const header = division === "middle" ? "중등" : "초등";

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">
            {header} · {decodeURIComponent(teacher)} · 반 목록
          </h1>
          <button
            onClick={() => nav(`/teachers/${division}`)}
            className="px-3 py-1.5 rounded-xl bg-white shadow text-sm hover:bg-slate-100"
          >
            담임 목록으로
          </button>
        </div>

        {classes.length === 0 ? (
          <p className="text-sm text-slate-500">해당 담임의 반 데이터가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {classes.map(({ className, level }) => (
              <div key={className} className="rounded-2xl shadow p-4 bg-white">
                <div className="text-base font-medium">{className}</div>
                <div className="text-xs text-slate-500 mt-1">레벨: {level || "-"}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
