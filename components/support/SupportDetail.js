import React from "react";

import { useTranslation } from "react-i18next";

import EventList from "../event/EventList";
import SkillList from "../skill/SkillList";
import EffectSlider from "../effect/EffectSlider";
import EffectTable from "../effect/EffectTable";
import { CDN_SERVER } from "src/config";

const SupportDetail = ({ data }) => {
  const { t } = useTranslation();
  if (!data) return null;
  return (
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
      <EffectSlider
        effects={data.effects}
        unique_effect={data.unique_effect}
        rarity={data.rarity}
      />
      <EffectTable effects={data.effects} rarity={data.rarity} />
    </div>
  );
};
export default SupportDetail;
