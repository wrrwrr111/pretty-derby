import React, { useState } from "react";

import db from "../../db.js";
import dbL from "../../dbL.js";
import t from "../t.js";

import EventList from "../event/EventList";
import SkillList from "../skill/SkillList";
import { EffectTable, TestEffectTable } from "../effect";
const cdnServer = "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/";

const SupportDetail = (props) => {
  console.log(props.match);
  const id = props.id || props?.match?.params?.id;
  const data = props.data || db.get("supports").find({ id }).value();
  return (
    <>
      <div className="h-16 w-full flex">
        <img alt={data.name} src={cdnServer + data.imgUrl} height={64} />
        <div className="flex-auto flex flex-wrap h-full items-center">
          <div className="w-1/2 text-xl font-semibold truncate">{data.name}</div>
          <div className="w-1/2 text-gray-700 truncate">{t(data.name)}</div>
          <div className="w-1/2 text-xl font-semibold truncate">{data.charaName}</div>
          <div className="w-1/2  text-gray-700 truncate">{t(data.charaName)}</div>
        </div>
      </div>
      <div>{t("事件")}</div>
      <EventList idList={data.eventList} pid={data.id} />
      <div>{t("事件技能")}</div>
      <SkillList idList={data.trainingEventSkill} />
      <div>{t("训练技能")}</div>
      <SkillList idList={data.possessionSkill} />
      <TestEffectTable
        effects={data.effects}
        unique_effect={data.unique_effect}
        rarity={data.rarity}
      ></TestEffectTable>
      <EffectTable effects={data.effects} rarity={data.rarity}></EffectTable>
    </>
  );
};
export default SupportDetail;
