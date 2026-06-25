// @MX:NOTE: Copy is intentionally metaphor-first; the learning screen never shows code.
export const scenarioData = [
  {
    id: "delivery",
    label: "배달 앱",
    objectName: "주문 센터",
    title: "한 주문을 둘러싼 작은 판단들",
    summary: "거리, 쿠폰, 세금, 예상 시간이 같은 주문 정보를 여러 곳에서 바라본다.",
    beforeLabel: "흩어진 주문 판단",
    afterLabel: "주문 센터로 모인 판단",
    metrics: {
      before: { routes: 9, duplication: 76, confidence: 34, cohesion: 28 },
      after: { routes: 3, duplication: 18, confidence: 88, cohesion: 91 },
    },
    phases: [
      {
        label: "흩어짐",
        title: "같은 주문을 여러 조각이 따로 본다",
        note: "작은 변경도 여러 화면을 지나가며 확인해야 한다.",
      },
      {
        label: "공통 데이터",
        title: "모든 조각이 같은 중심을 바라본다",
        note: "같은 주문 정보를 반복해서 확인한다면 묶을 후보가 보인다.",
      },
      {
        label: "센터화",
        title: "판단을 주문 센터 가까이 둔다",
        note: "데이터와 판단이 가까워지면 수정 경로가 짧아진다.",
      },
      {
        label: "안전 확인",
        title: "겉으로 보이는 결과는 유지한다",
        note: "배치가 바뀌어도 사용자에게 보이는 주문 결과는 그대로여야 한다.",
      },
    ],
    fragments: [
      {
        id: "distance",
        label: "거리 요금",
        detail: "거리와 시간을 함께 확인",
        slot: 1,
      },
      {
        id: "coupon",
        label: "쿠폰 적용",
        detail: "주문 금액을 다시 확인",
        slot: 2,
      },
      {
        id: "tax",
        label: "세금 표시",
        detail: "결제 합계를 다시 확인",
        slot: 3,
      },
      {
        id: "eta",
        label: "도착 예상",
        detail: "주소와 매장 상태 확인",
        slot: 4,
      },
    ],
  },
  {
    id: "music",
    label: "음악 앱",
    objectName: "플레이리스트 센터",
    title: "한 플레이리스트를 둘러싼 추천들",
    summary: "길이, 분위기, 공유 문구, 다음 추천이 같은 목록 정보를 따로 본다.",
    beforeLabel: "흩어진 플레이리스트 판단",
    afterLabel: "플레이리스트 센터",
    metrics: {
      before: { routes: 8, duplication: 69, confidence: 38, cohesion: 32 },
      after: { routes: 3, duplication: 16, confidence: 85, cohesion: 88 },
    },
    phases: [
      {
        label: "흩어짐",
        title: "같은 목록을 여러 판단이 따로 읽는다",
        note: "공유 문구와 추천이 서로 다른 기준을 가질 수 있다.",
      },
      {
        label: "공통 데이터",
        title: "목록 정보가 공통 중심이 된다",
        note: "노래 수, 길이, 분위기가 여러 조각에 반복된다.",
      },
      {
        label: "센터화",
        title: "목록 기준을 한곳으로 모은다",
        note: "추천과 공유 판단이 같은 기준을 바라본다.",
      },
      {
        label: "안전 확인",
        title: "듣는 경험은 그대로 유지한다",
        note: "정리 후에도 사용자에게 보이는 추천 품질은 유지되어야 한다.",
      },
    ],
    fragments: [
      {
        id: "length",
        label: "길이 판단",
        detail: "전체 재생 시간을 확인",
        slot: 1,
      },
      {
        id: "mood",
        label: "분위기 태그",
        detail: "곡의 흐름을 확인",
        slot: 2,
      },
      {
        id: "share",
        label: "공유 문구",
        detail: "목록 이름을 확인",
        slot: 3,
      },
      {
        id: "next",
        label: "다음 추천",
        detail: "최근 추가곡을 확인",
        slot: 4,
      },
    ],
  },
  {
    id: "photo",
    label: "사진 앱",
    objectName: "편집 세션 센터",
    title: "한 편집 세션을 둘러싼 변환들",
    summary: "필터, 밝기, 내보내기, 공유 상태가 같은 편집 세션을 따로 확인한다.",
    beforeLabel: "흩어진 편집 판단",
    afterLabel: "편집 세션 센터",
    metrics: {
      before: { routes: 7, duplication: 64, confidence: 41, cohesion: 35 },
      after: { routes: 2, duplication: 14, confidence: 90, cohesion: 93 },
    },
    phases: [
      {
        label: "흩어짐",
        title: "같은 편집 상태를 여러 조각이 따로 본다",
        note: "작은 밝기 변경도 내보내기와 공유 상태를 흔들 수 있다.",
      },
      {
        label: "공통 데이터",
        title: "편집 세션이 공통 중심이 된다",
        note: "원본, 필터, 크기가 여러 판단에 반복된다.",
      },
      {
        label: "센터화",
        title: "변환 판단을 세션 가까이 둔다",
        note: "편집 기준이 한곳에 모이면 결과를 맞추기 쉽다.",
      },
      {
        label: "안전 확인",
        title: "사용자가 보는 사진 결과는 유지한다",
        note: "내부 배치만 바꾸고 결과물은 그대로 유지한다.",
      },
    ],
    fragments: [
      {
        id: "filter",
        label: "필터 판단",
        detail: "원본과 효과를 확인",
        slot: 1,
      },
      {
        id: "light",
        label: "밝기 보정",
        detail: "현재 노출을 확인",
        slot: 2,
      },
      {
        id: "export",
        label: "내보내기",
        detail: "크기와 품질을 확인",
        slot: 3,
      },
      {
        id: "share",
        label: "공유 상태",
        detail: "편집 완료 여부 확인",
        slot: 4,
      },
    ],
  },
];

export const safetyChecks = [
  {
    id: "sameData",
    label: "같은 데이터를 본다",
  },
  {
    id: "behavior",
    label: "겉결과를 유지한다",
  },
  {
    id: "name",
    label: "센터 이름이 자연스럽다",
  },
];
