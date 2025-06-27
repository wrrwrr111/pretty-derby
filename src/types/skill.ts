// src/types/skill.ts

/** 技能稀有度 */
type SkillRarity = "固有" | "SSR" | "SR" | "R" | "N";

/** 技能效果目标类型 */
type SkillTargetType = 0 | 1 | 2; // 0:自身 1:对手 2:全体

/** 技能触发条件表达式 */
type SkillCondition = string;

/** 单个技能效果 */
interface SkillAbility {
  type: number; // 效果类型ID
  value: number; // 效果数值
  target_type: SkillTargetType;
  target_value: number; // 目标附加值
}

/** 技能效果组 */
type SkillAbilities = SkillAbility[];

/** 技能类型 */
interface Skill {
  /** 基础信息 */
  name: string;
  id: string;
  describe: string;
  imgUrl: string;
  rare: SkillRarity;
  rarity: number;
  db_id: number;
  icon_id: number;

  /** 技能数值 */
  ability_value: number; // 效果值
  ability_time: number; // 持续时间(毫秒)
  cooldown: number; // 冷却时间(毫秒)
  need_skill_point: number; // 需要技能点
  grade_value: number; // 评分值

  /** 触发条件 */
  condition: SkillCondition;
  condition2: SkillCondition;

  /** 效果数据 */
  ability: SkillAbilities;
  ability2: SkillAbilities;
}

/** 技能数组类型 */
type SkillList = Skill[];
