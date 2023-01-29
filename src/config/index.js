const CDN_SERVER = "https://fastly.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/";

const MENU_LIST = [
  { path: "/", title: "角色" },
  { path: "/support", title: "支援" },
  { path: "/skill", title: "技能" },
  { path: "/race", title: "比赛" },
  { path: "/nurturing", title: "育成", pc: true },
  { path: "/seed", title: "种马", pc: true },
  { path: "/nurturingMo", title: "育成", mobile: true },
  { path: "/seedMo", title: "种马", mobile: true },
];

const EFFECT_LIMITS = [
  "init",
  "limit_lv5",
  "limit_lv10",
  "limit_lv15",
  "limit_lv20",
  "limit_lv25",
  "limit_lv30",
  "limit_lv35",
  "limit_lv40",
  "limit_lv45",
  "limit_lv50",
];
// 角色过滤相关
const PLAYER_ADAPT_FILTERS = [
  { text: "A", value: "A" },
  { text: "B", value: "B" },
  { text: "C", value: "C" },
  { text: "D", value: "D" },
  { text: "E", value: "E" },
  { text: "F", value: "F" },
  { text: "G", value: "G" },
];
const PLAYER_GROW_FILTERS = [
  { text: "14%", value: "+14%" },
  { text: "15%", value: "+15%" },
  { text: "14%", value: "+14%" },
  { text: "10%", value: "+10%" },
  { text: "8%", value: "+8%" },
  { text: "0%", value: "+0%" },
];
const PLAYER_RARITIES = {
  1: "R",
  2: "SR",
  3: "SSR",
};
const PLAYER_ADAPT_TITLES = {
  芝: "grass",
  ダート: "dirt",
  短距離: "shortDistance",
  マイル: "mile",
  中距離: "mediumDistance",
  長距離: "longDistance",
  逃げ: "escape",
  先行: "leading",
  差し: "insert",
  追込: "tracking",
  スピード: "speedGrow",
  スタミナ: "staminaGrow",
  パワー: "powerGrow",
  根性: "gutsGrow",
  賢さ: "wisdomGrow",
};
const SKILL_TYPES = {
  1: "速度属性",
  2: "耐力属性",
  3: "力量属性",
  4: "毅力属性",
  5: "智力属性",
  6: "体力",
  7: "体力消耗",
  8: "视野",
  9: "体力恢复",
  10: "出栏时机",
  13: "掛かり时间",
  14: "掛かり结束时间",
  21: "瞬时速度",
  27: "目标速度",
  28: "走位速度",
  31: "加速度",
};
const SKILL_CONDITION_OPTIONS = [
  { label: "短距離", value: "distance_type==1" },
  { label: "マイル", value: "distance_type==2" },
  { label: "中距離", value: "distance_type==3" },
  { label: "長距離", value: "distance_type==4" },
  { label: "逃げ", value: "running_style==1" },
  { label: "先行", value: "running_style==2" },
  { label: "差し", value: "running_style==3" },
  { label: "追込", value: "running_style==4" },
  { label: "通用", value: "running_style==" },
  { label: "序盤", value: "phase==0|phase_random==0" },
  { label: "中盤", value: "phase==1|phase_random==1" },
  { label: "終盤", value: "phase==2|phase_random==2" },
  { label: "冲刺", value: "phase==3|phase_random==3" },
  { label: "コーナー", value: "corner_random==1" },
  { label: "直線", value: "straight_random==1" },
  { label: "最終直線/コーナー", value: "is_finalcorner==1" },
];
const SKILL_TYPE_OPTIONS = [
  { label: "速度被动", value: "10011" },
  { label: "耐力被动", value: "10021" },
  { label: "力量被动", value: "10031" },
  { label: "毅力被动", value: "10041" },
  { label: "智力被动", value: "10051" },
  { label: "耐力恢复", value: "20021" },
  { label: "速度提高", value: "20011" },
  // {label:'20031',value:'20031'},
  { label: "加速度提高", value: "20041" },
  { label: "切换跑道", value: "20051" },
  { label: "起步时间", value: "20061" },
  // {label:'20071',value:'20071'},
  // {label:'20081',value:'20081'},
  { label: "视野提高", value: "20091" },
  { label: "速度降低", value: "30011" },
  { label: "无法冷静", value: "30041" },
  { label: "耐力降低", value: "30051" },
  { label: "视野降低", value: "30071" },
];
const SKILL_RARITY_OPTIONS = [
  { label: "ノーマル", value: "ノーマル" },
  { label: "レア", value: "レア" },
  { label: "固有", value: "固有" },
];
const SUPPORT_TYPE_OPTIONS = ["スピード", "スタミナ", "パワー", "根性", "賢さ", "友人"].map(
  (item) => ({
    label: item,
    value: item,
  })
);

const DECK_LABELS = [
  "短距離",
  "マイル",
  "中距離",
  "長距離",
  "ダート",
  "逃げ",
  "先行",
  "差し",
  "追込",
  "高速度",
  "高耐力",
  "高力量",
  "高根性 ",
  "高智力",
  "竞技场前排",
  "萌新之友",
];

const RACE_FILTER_LIST = {
  class: [
    { text: "初等/ジュニア", value: "ジュニア" },
    { text: "经典/クラシック", value: "クラシック" },
    { text: "经典&高级/クラシックシニア", value: "クラシックシニア" },
    { text: "高级/シニア", value: "シニア" },
  ],
  grade: [
    { text: "Pre-OP", value: "Pre-OP" },
    { text: "OP", value: "OP" },
    { text: "G1", value: "G1" },
    { text: "G2", value: "G2" },
    { text: "G3", value: "G3" },
  ],
  place: [
    { text: "中京", value: "中京" },
    { text: "函館", value: "函館" },
    { text: "札幌", value: "札幌" },
    { text: "小倉", value: "小倉" },
    { text: "新潟", value: "新潟" },
    { text: "阪神", value: "阪神" },
    { text: "中山", value: "中山" },
    { text: "京都", value: "京都" },
    { text: "東京", value: "東京" },
    { text: "福島", value: "福島" },
    { text: "大井", value: "大井" },
  ],
  ground: [
    { text: "芝", value: "芝" },
    { text: "ダート", value: "ダート" },
  ],
  distanceType: [
    { text: "短距離", value: "短距離" },
    { text: "マイル", value: "マイル" },
    { text: "中距離", value: "中距離" },
    { text: "長距離", value: "長距離" },
  ],
  direction: [
    { text: "左", value: "左" },
    { text: "右", value: "右" },
    { text: "直", value: "直" },
  ],
  side: [
    { text: "空", value: null },
    { text: "内", value: "内" },
    { text: "外", value: "外" },
    { text: "線", value: "線" },
  ],
};

const SEED_BLUE_LABELS = {
  speed: "速度",
  stamina: "耐力",
  power: "力量",
  guts: "根性",
  wisdom: "智力",
};
const SEED_RED_LABELS = {
  grass: "草地",
  dirt: "泥地",
  shortDistance: "短距离",
  mile: "英里",
  mediumDistance: "中距离",
  longDistance: "长距离",
  escapeR: "逃",
  leadingR: "先",
  insertR: "差",
  trackingR: "追",
};
const RACE_GOLD_LIST = [
  { name: "传统三冠", raceNames: ["皐月賞30", "日本ダービー東京優駿33", "菊花賞43"] },
  { name: "春日三冠", raceNames: ["大阪杯53", "天皇賞春55", "宝塚記念59"] },
  { name: "秋日三冠", raceNames: ["天皇賞秋67", "ジャパンカップ69", "有馬記念71"] },
  { name: "天皇春秋", raceNames: ["天皇賞春55", "天皇賞秋67"] },
  { name: "纪念春秋Ⅰ", raceNames: ["宝塚記念35", "有馬記念47"] },
  { name: "纪念春秋Ⅱ", raceNames: ["宝塚記念59", "有馬記念71"] },
  { name: "母马三冠", raceNames: ["桜花賞30", "オークス33", "秋華賞43"] },
  { name: "英里春秋Ⅰ", raceNames: ["安田記念34", "マイルチャンピオンシップ45"] },
  { name: "英里春秋Ⅱ", raceNames: ["安田記念58", "マイルチャンピオンシップ69"] },
  { name: "泥地春秋", raceNames: ["フェブラリーステークス51", "チャンピオンズカップ70"] },
  { name: "短距春秋", raceNames: ["高松宮記念53", "スプリンターズステークス65"] },
];

const IMAGE_FALLBACK = `data:image/png;base64,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`;
export {
  CDN_SERVER,
  MENU_LIST,
  EFFECT_LIMITS,
  PLAYER_ADAPT_FILTERS,
  PLAYER_GROW_FILTERS,
  PLAYER_RARITIES,
  PLAYER_ADAPT_TITLES,
  SKILL_TYPES,
  SKILL_CONDITION_OPTIONS,
  SKILL_TYPE_OPTIONS,
  SKILL_RARITY_OPTIONS,
  SUPPORT_TYPE_OPTIONS,
  DECK_LABELS,
  RACE_FILTER_LIST,
  SEED_BLUE_LABELS,
  SEED_RED_LABELS,
  IMAGE_FALLBACK,
  RACE_GOLD_LIST,
};
