export interface PlayerRace {
  date: number;
  id: string;
  goal: string;
}

export interface Player {
  name: string;
  grass: string;
  dirt: string;
  shortDistance: string;
  mile: string;
  mediumDistance: string;
  longDistance: string;
  escape: string;
  leading: string;
  insert: string;
  tracking: string;
  speedGrow: string;
  staminaGrow: string;
  powerGrow: string;
  gutsGrow: string;
  wisdomGrow: string;
  skillList: string[];
  eventList: string[];
  id: string;
  rare: string;
  raceList: PlayerRace[];
  gwId: string;
  uniqueSkillList: string[];
  initialSkillList: string[];
  awakeningSkillList: string[];
  imgUrl: string;
  charaName: string;
  db_id: number;
  default_rarity: number;
  hideEvent: any[];
  eventList0: string[];
  eventList1: string[];
  eventList2: string[];
  eventList3: string[];
  eventList4: any[];
}

export interface Support {
  name: string;
  rare: string;
  skillList: string[];
  eventList: string[];
  id: string;
  gwId: string;
  imgUrl: string;
  trainingEventSkill: string[];
  possessionSkill: string[];
  charaName: string;
  db_id: number;
  effects: Effect[];
  rarity: number;
  baseAbility: BaseAbility;
  unique_effect: UniqueEffect;
  type: string;
}

export interface Effect {
  id: number;
  type: number;
  init: number;
  limit_lv5: number;
  limit_lv10: number;
  limit_lv15: number;
  limit_lv20: number;
  limit_lv25: number;
  limit_lv30: number;
  limit_lv35: number;
  limit_lv40: number;
  limit_lv45: number;
  limit_lv50: number;
}

export interface BaseAbility {
  name: string;
  ability: [string, string[]][];
}

export interface UniqueEffect {
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

export interface Skill {
  name: string;
  imgUrl: string;
  rare: string;
  describe: string;
  id: string;
  condition: string;
  rarity: number;
  db_id: number;
  icon_id: number;
  ability_value: number;
  ability_time: number;
  cooldown: number;
  ability: Ability[];
  need_skill_point: number;
  grade_value: number;
  condition2: string;
  ability2: Ability[];
}

export interface Ability {
  type: number;
  value: number;
  target_type: number;
  target_value: number;
}

export interface Race {
  name: string;
  date: string;
  dateNum: number;
  uniqueName: string;
  class: string;
  grade: string;
  place: string;
  ground: string;
  distance: string;
  distanceType: string;
  direction: string;
  side: any;
  id: string;
}

export interface Buff {
  id: string;
  name: string;
  describe: string;
}

export interface Event {
  name: string;
  choiceList: [string, string[]][];
  id: string;
  pid: string;
}
