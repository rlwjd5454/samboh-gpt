import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CLASSES } from "../shared/classes";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ClassList() {
  const q = useQuery();
  const nav = useNavigate();
  const division = q.get("division") || "middle";
  const teacher = q.get("teacher") || "";

  const classList = useMemo(() => {
    const byDiv = division === "elementary" ? CLASSES.elementary : CLASSES.middle;
    return byDiv[teacher] || [];
  }, [division, teacher]);

  const title = `${division === "middle" ? "중등" : "초등"} · ${teacher} 담임 반 목록`;

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {classList.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-center rounded-2xl bg-blue-100 text-slate-900 p-6 text-center shadow-sm"
            >
              <div className="text-sm font-medium leading-snug">{c.name}</div>
            </div>
          ))}
        </div>

        {classList.length === 0 && (
          <p className="text-sm text-slate-500 mt-6">
            해당 담임의 반 정보가 없습니다. `shared/classes.js`를 채워 넣으세요.
          </p>
        )}
      </div>
    </div>
  );
}
