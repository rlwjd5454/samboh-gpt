import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MIDDLE from "../data/middle_classes_2510.json";
import ELEM from "../data/elementary_classes_2510.json";

export default function TeacherList() {
  const { division } = useParams();
  const nav = useNavigate();

  const title = division === "middle" ? "중등 담임 목록" :
                division === "elementary" ? "초등 담임 목록" : "담임 목록";

  const teachers = useMemo(() => {
    if (division === "middle") return MIDDLE.teachers || [];
    if (division === "elementary") return ELEM.teachers || [];
    return [];
  }, [division]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        {teachers.length === 0 ? (
          <p className="text-slate-500 text-sm">데이터 없음</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {teachers.map((t) => (
              <button
                key={t}
                onClick={() => nav(`/classes/${division}/${encodeURIComponent(t)}`)}
                className="text-left rounded-2xl shadow p-4 bg-white hover:bg-slate-100 transition"
              >
                <div className="text-lg font-medium">{t}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
