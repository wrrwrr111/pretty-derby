// src/types/player.ts

/** 跑道适性等级 (A-G) */
type TrackAffinity = "A" | "B" | "C" | "D" | "E" | "F" | "G";

/** 成长率加成 (如 +20%) */
type GrowthRate = `${"+" | "-"}${number}%`;

/** 比赛目标类型 */
type RaceGoal = "1着" | "2着以内" | "3着以内" | "5着以内";

/** 单个比赛信息 */
interface RaceInfo {
  id: string;
  goal: RaceGoal;
}

/** 比赛列表映射 */
interface RaceList {
  [key: string]: RaceInfo; // key 是比赛编号字符串 (如 "28")
}

interface Player {
  /** 玩家名称 */
  name: string;

  /** 跑道适性 */
  grass: TrackAffinity;
  dirt: TrackAffinity;

  /** 距离适性 */
  shortDistance: TrackAffinity;
  mile: TrackAffinity;
  mediumDistance: TrackAffinity;
  longDistance: TrackAffinity;

  /** 跑法适性 */
  escape: TrackAffinity;
  leading: TrackAffinity;
  insert: TrackAffinity;
  tracking: TrackAffinity;

  /** 成长率 */
  speedGrow: GrowthRate;
  staminaGrow: GrowthRate;
  powerGrow: GrowthRate;
  gutsGrow: GrowthRate;
  wisdomGrow: GrowthRate;

  /** 技能相关 */
  skillList: string[];
  uniqueSkillList: string[];
  initialSkillList: string[];
  awakeningSkillList: string[];

  /** 事件相关 */
  eventList: string[];
  eventList0: string[];
  eventList1: string[];
  eventList2: string[];
  eventList3: string[];
  eventList4: string[];
  hideEvent: string[];

  /** 标识信息 */
  id: string;
  rare: string;
  gwId: string;
  charaName: string;
  db_id: number;
  default_rarity: number;

  /** 比赛数据 */
  raceList: RaceList;

  /** 图片URL */
  imgUrl: string;
}

/** 玩家数据数组类型 */
type PlayerList = Player[];
