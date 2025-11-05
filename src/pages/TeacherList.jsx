import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TEACHERS } from "../shared/teachers";

export default function TeacherList() {
  const { division } = useParams(); // "middle" | "elementary"
  const nav = useNavigate();

  const title = division === "middle" ? "중등 담임 목록" : "초등 담임 목록";
  const data = useMemo(() => {
    if (division === "middle") return TEACHERS.middle;
    if (division === "elementary") return TEACHERS.elementary;
    return [];
  }, [division]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <button
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-100"
            onClick={() => nav(-1)}
          >
            ← 뒤로
          </button>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          {data.length === 0 ? (
            <p className="text-sm text-slate-500">목록이 없습니다. `shared/teachers.js`를 채워 넣으세요.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {data.map((t) => (
                <li key={t.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">
                      {t.role} {t.note ? `· ${t.note}` : ""}
                    </p>
                  </div>

                  {/* 추후: 클릭 시 반 목록 페이지로 이동 */}
                  <button
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm hover:bg-slate-100"
                    onClick={() => {
                      // 예: /classes?division=middle&teacher=Ella
                      // 나중에 반 목록 페이지 연결
                      alert(`선택: ${t.name}`);
                    }}
                  >
                    반 보기
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
