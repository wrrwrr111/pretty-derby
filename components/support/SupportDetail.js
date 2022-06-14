import React from "react";

import { useDB } from "/hooks/index.js";
import { useTranslation } from "react-i18next";

import EventList from "../event/EventList";
import SkillList from "../skill/SkillList";
import { EffectTable, TestEffectTable } from "../effect";
import { CDN_SERVER } from "/src/config";

const SupportDetail = (props) => {
  const { t } = useTranslation();
  const db = useDB();
  if (!db) return null;
  const id = props.id;
  const data = props.data || db.get("supports").find({ id }).value();
  return data ? (
    <div className="w-full flex flex-col p-3 overflow-x-hidden">
      <div className="h-16 w-full flex flex-shrink-0">
        <img alt={data.name} src={CDN_SERVER + data.imgUrl} height={64} width={48} />
        <div className="flex-auto flex flex-wrap h-full items-center">
          <div className="w-full flex items-center justify-between">
            <div className="flex-auto text-xl font-semibold truncate">{data.name}</div>
            <div className="flex-shrink-0 text-gray-700 truncate">{t(data.name)}</div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex-auto text-xl font-semibold truncate">{data.charaName}</div>
            <div className="flex-shrink-0 text-gray-700 truncate">{t(data.charaName)}</div>
          </div>
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
      />
      <EffectTable effects={data.effects} rarity={data.rarity} />
    </div>
  ) : null;
};
export default SupportDetail;
