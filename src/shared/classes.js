// 추후 명단24052510중등과평.xlsx의 2510중등전체명단 시트에서
// '담임'별로 '반명'을 자동 추출하도록 연결 예정.
// 지금은 예시 데이터만 포함.

export const CLASSES = {
  middle: {
    Ella: [
      { id: "m-ella-1", name: "25 가을[408 Ella] H3 화목 7:30" },
      { id: "m-ella-2", name: "25 가을[310 Ella] M5 화목 6:00" },
    ],
    Aria: [{ id: "m-aria-1", name: "25 가을[207 Aria] P6 화목 5:00" }],
    Chloe: [{ id: "m-chloe-1", name: "25 가을[102 Chloe] P3 화목 4:00" }],
    // ...담임별 반 추가
  },
  elementary: {
    탁승연: [
      { id: "e-tak-g4a", name: "G4A 월·화 4:00" },
      { id: "e-tak-r4b", name: "R4B 목·금 5:30" },
    ],
  },
};
