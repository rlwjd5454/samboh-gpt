import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MIDDLE from "../data/middle_classes_2510.json";
import ELEM from "../data/elementary_classes_2510.json";

function extractDays(text = "") {
  const s = String(text).replace(/\s+/g, "");
  const map = ["월","화","수","목","금","토","일"];
  const out = [];
  for (const ch of s) if (map.includes(ch)) out.push(ch);
  return [...new Set(out)];
}
function extractMinutes(text = "") {
  const m = String(text).match(/(\d{1,2}):(\d{2})/);
  if (!m) return 99999;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}
function pickTimeString(text = "") {
  const m = String(text).match(/(\d{1,2}:\d{2})/);
  return m ? m[1] : "";
}

export default function TeacherClasses() {
  const { division, teacher } = useParams();
  const nav = useNavigate();
  const isElementary = division === "elementary";
  const src = isElementary ? ELEM : MIDDLE;

  const title = `${decodeURIComponent(teacher)} · ${isElementary ? "초등" : "중등"} 반 목록`;

  const classes = useMemo(() => {
    const key = decodeURIComponent(teacher);
    const list = src?.classesByTeacher?.[key] || [];
    return Array.isArray(list) ? list : [];
  }, [src, teacher]);

  // 초등: 요일 섹션
  const elementaryGrouped = useMemo(() => {
    if (!isElementary) return null;
    const dayOrder = ["월","화","목","금","수","토","일"];
    const buckets = Object.fromEntries(dayOrder.map(d => [d, []]));
    const others = [];
    for (const item of classes) {
      const name = item.className || "";
      const days = extractDays(name);
      const minutes = extractMinutes(name);
      const timeStr = pickTimeString(name);
      if (days.length === 0) {
        others.push({ ...item, _minutes: minutes, _time: timeStr });
        continue;
      }
      for (const d of days) (buckets[d] ||= []).push({ ...item, _minutes: minutes, _time: timeStr });
    }
    for (const d of Object.keys(buckets)) {
      buckets[d].sort((a, b) => a._minutes - b._minutes || String(a.className).localeCompare(String(b.className), "ko"));
    }
    return { buckets, others };
  }, [classes, isElementary]);

  // 중등: 월금 / 화목 + 앞타임/뒷타임
  const middleGrouped = useMemo(() => {
    if (isElementary) return null;

    const PAIRS = {
      "월금": new Set(["월","금"]),
      "화목": new Set(["화","목"])
    };
    const WEEKEND = new Set(["토","일"]);
    const THRESHOLD_WEEKDAY = 16 * 60 + 50; // 4:50
    const THRESHOLD_WEEKEND = 9 * 60 + 30;  // 9:30

    const base = {
      "월금": { front: [], back: [] },
      "화목": { front: [], back: [] },
      "기타": { front: [], back: [] }
    };

    for (const item of classes) {
      const name = item.className || "";
      const days = extractDays(name);
      const minutes = extractMinutes(name);

      // 소속 섹션 결정
      const targets = [];
      if (days.some(d => PAIRS["월금"].has(d))) targets.push("월금");
      if (days.some(d => PAIRS["화목"].has(d))) targets.push("화목");
      if (targets.length === 0) targets.push("기타");

      // 앞/뒤 타임 결정: 주말(토/일) 포함이면 주말 규칙, 아니면 평일 규칙
      const isWeekendClass = days.some(d => WEEKEND.has(d));
      const threshold = isWeekendClass ? THRESHOLD_WEEKEND : THRESHOLD_WEEKDAY;
      const slot = minutes <= threshold ? "front" : "back";

      for (const key of targets) base[key][slot].push({ ...item, _minutes: minutes });
    }

    // 정렬
    for (const grp of Object.keys(base)) {
      for (const slot of ["front","back"]) {
        base[grp][slot].sort(
          (a, b) => a._minutes - b._minutes || String(a.className).localeCompare(String(b.className), "ko")
        );
      }
    }
    return base;
  }, [classes, isElementary]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => nav(-1)} className="text-sm text-slate-600 hover:underline">← 뒤로</button>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        </div>

        {/* 중등: 월금/화목 → 앞타임/뒷타임 */}
        {!isElementary && (
          classes.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-6 text-sm text-slate-600 bg-white">
              반 목록 데이터가 없습니다.
            </div>
          ) : (
            <div className="space-y-8">
              {["월금","화목","기타"].map((grp) => {
                const data = middleGrouped[grp];
                if (!data || (data.front.length === 0 && data.back.length === 0)) return null;
                return (
                  <section key={grp} className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-900">{grp}</h2>

                    {[["앞타임","front"],["뒷타임","back"]].map(([label, key]) => {
                      const list = data[key];
                      if (list.length === 0) return null;
                      return (
                        <div key={`${grp}-${key}`} className="space-y-2">
                          <h3 className="text-sm font-medium text-slate-700">{label}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {list.map(({ className, level }) => (
                              <div key={`${grp}-${key}-${className}`} className="rounded-2xl shadow bg-white p-4 border">
                                <div className="text-base font-medium">{className}</div>
                                <div className="text-xs text-slate-500 mt-1">레벨: {level || "-"}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </section>
                );
              })}
            </div>
          )
        )}

        {/* 초등: 요일 섹션 */}
        {isElementary && (
          classes.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-6 text-sm text-slate-600 bg-white">
              반 목록 데이터가 없습니다.
            </div>
          ) : (
            <div className="space-y-8">
              {["월","화","목","금","수","토","일"].map((d) => {
                const list = elementaryGrouped.buckets[d] || [];
                if (list.length === 0) return null;
                return (
                  <section key={d} className="space-y-3">
                    <h2 className="text-lg font-semibold text-slate-900">{d}요일</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {list.map(({ className, level }) => (
                        <div key={`${d}-${className}`} className="rounded-2xl shadow bg-white p-4 border">
                          <div className="text-base font-medium">{className}</div>
                          <div className="text-xs text-slate-500 mt-1">레벨: {level || "-"}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
              {elementaryGrouped.others && elementaryGrouped.others.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-lg font-semibold text-slate-900">기타</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {elementaryGrouped.others.map(({ className, level }) => (
                      <div key={`other-${className}`} className="rounded-2xl shadow bg-white p-4 border">
                        <div className="text-base font-medium">{className}</div>
                        <div className="text-xs text-slate-500 mt-1">레벨: {level || "-"}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
