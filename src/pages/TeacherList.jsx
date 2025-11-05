import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

// JSON은 빌드에 포함되도록 정적 import
import MIDDLE from "../data/middle_classes_2510.json";
import ELEM from "../data/elementary_classes_2510.json";

export default function TeacherList() {
  const { division } = useParams();
  const nav = useNavigate();

  const title = division === "middle" ? "중등 담임 목록" :
                division === "elementary" ? "초등 담임 목록" : "담임 목록";

  const data = useMemo(() => {
    const src = division === "middle" ? MIDDLE :
                division === "elementary" ? ELEM : {};
    // src: { "담임이름": [ {className, level}, ... ] }
    // 담임명 오름차순
    return Object.keys(src).sort().map(t => ({ teacher: t, count: src[t].length }));
  }, [division]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        {data.length === 0 ? (
          <p className="text-sm text-slate-500">데이터 없음</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.map(({ teacher, count }) => (
              <button
                key={teacher}
                onClick={() => nav(`/classes/${division}/${encodeURIComponent(teacher)}`)}
                className="text-left rounded-2xl shadow p-4 bg-white hover:bg-slate-50 transition"
              >
                <div className="text-lg font-medium">{teacher}</div>
                <div className="text-sm text-slate-500 mt-1">반 {count}개</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
