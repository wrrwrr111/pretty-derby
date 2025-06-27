// src/types/support.ts

/** 稀有度类型 */
type Rarity = "SSR" | "SR" | "R" | "N";

/** 支援卡类型 */
type SupportType = "スピード" | "スタミナ" | "パワー" | "根性" | "賢さ" | "友人";

/** 效果数值类型 (-1表示未激活) */
type EffectValue = number | -1;

/** 基础能力描述 */
interface AbilityDescription {
  level: string; // 如 "Lv30~"
  effects: string[]; // 效果描述数组
}

/** 单个效果条目 */
interface SupportEffect {
  id: number;
  type: number; // 效果类型ID
  init: EffectValue; // 初始值
  limit_lv5: EffectValue;
  limit_lv10: EffectValue;
  limit_lv15: EffectValue;
  limit_lv20: EffectValue;
  limit_lv25: EffectValue;
  limit_lv30: EffectValue;
  limit_lv35: EffectValue;
  limit_lv40: EffectValue;
  limit_lv45: EffectValue;
  limit_lv50: EffectValue;
}

/** 独特效果 */
interface UniqueEffect {
  id: number;
  lv: number;
  type_0: number;
  value_0: number;
  value_0_1: number;
  value_0_2: number;
  value_0_3: number;
  value_0_4: number;
  type_1: number;
  value_1: number;
  value_1_1: number;
  value_1_2: number;
  value_1_3: number;
  value_1_4: number;
}

// src/types/support.ts

interface SupportCard extends ItemWithId {
  /** 基本信息 */
  rare: Rarity;
  type: SupportType;
  gwId: string;
  imgUrl: string;
  charaName: string;
  db_id: number;
  rarity: number;

  /** 技能相关 */
  skillList: string[];
  trainingEventSkill: string[];
  possessionSkill: string[];

  /** 事件相关 */
  eventList: string[];

  /** 效果数据 */
  effects: SupportEffect[];
  baseAbility: {
    name: string;
    ability: [string, string[]][]; // 实际结构更接近 AbilityDescription[]
  };
  unique_effect: UniqueEffect;
}

/** 支援卡数组类型 */
type SupportCardList = SupportCard[];
