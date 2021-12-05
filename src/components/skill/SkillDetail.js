import React, { useEffect, useState } from "react";
import db from "../../db.js";
import t from "../t.js";
import SupportList from "../support/SupportList";
import PlayerList from "../player/PlayerList";
const cdnServer = "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/";

const allSupportList = db.get("supports").value();
const allPlayerList = db.get("players").value();

const skillType = {
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
const SkillDetail = (props) => {
  const id = props.id || props.match?.params?.id;
  const skill = props.data || db.get("skills").find({ id }).value();
  const isNur = props.isNur !== undefined ? props.isNur : parseInt(props.match?.params?.nur);
  const supportList = allSupportList
    .filter((support) => {
      let flag = 0;
      support.skillList.forEach((id) => {
        if (id === skill?.id) {
          flag = 1;
        }
      });
      return flag;
    })
    .sort((a, b) => b.rarity - a.rarity);
  const playerList = allPlayerList
    .filter((player) => {
      let flag = 0;
      player.skillList.forEach((id) => {
        if (id === skill?.id) {
          flag = 1;
        }
      });
      return flag;
    })
    .sort((a, b) => b.rarity - a.rarity);

  if (!skill) {
    return <></>;
  }
  return (
    <div className="w-full h-full flex flex-col overflow-auto px-3">
      <div className="w-full flex mb-1 bg-gray-100 items-center">
        <div className="w-20 flex items-center justify-center">
          <img alt={skill.name} src={cdnServer + skill.imgUrl} className="w-14"></img>
        </div>
        <div className="flex-auto">
          <p>{t(skill.name)}</p>
          <p className="text-gray-500">{skill.name}</p>
        </div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center flex-shrink-0">{t("技能描述")}</div>
        <div className="flex-auto">
          <p>{t(skill.describe)}</p>
          <p className="text-gray-500">{skill.describe}</p>
        </div>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <div className="w-20 text-center flex-shrink-0">{t("触发条件")}</div>
        <div className="flex-auto">
          <p>{t(skill.condition)}</p>
          <p className="text-gray-500">{skill.condition}</p>
        </div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center flex-shrink-0">{t("技能效果")}</div>
        <div className="flex-auto">
          {skill.ability?.map((ability) => {
            console.log(skillType, ability);
            return <span>{`${skillType[ability.type]} ${ability.value / 10000}`}</span>;
          })}
        </div>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <div className="w-20 text-center flex-shrink-0">{t("持续时间")}</div>
        <div className="flex-auto">
          {`${skill.ability_time / 10000}s * ${t("赛道长度")} / 1000}`}
        </div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center flex-shrink-0">{t("冷却时间")}</div>
        <div className="flex-auto">{`${skill.cooldown / 10000}s * ${t("赛道长度")} / 1000`}</div>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <div className="w-20 text-center flex-shrink-0">{t("技能价格")}</div>
        <div className="flex-auto">{skill.need_skill_point}</div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center flex-shrink-0">{t("技能评分")}</div>
        <div className="flex-auto">{skill.grade_value}</div>
      </div>
      {!isNur && supportList.length ? (
        <>
          <div>{t("支援卡")}</div>
          <SupportList dataList={supportList} sortFlag={false} />
        </>
      ) : null}
      {!isNur && playerList.length ? (
        <>
          <div>{t("角色")}</div>
          <PlayerList dataList={playerList} />
        </>
      ) : null}
    </div>
  );
};

export default SkillDetail;
