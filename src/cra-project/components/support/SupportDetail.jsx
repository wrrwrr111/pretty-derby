import React from "react";

import { useDB } from "../../hooks/index";
import { useTranslation } from "react-i18next";

import EventList from "../event/EventList";
import SkillList from "../skill/SkillList";
import { EffectTable, TestEffectTable } from "../effect/index";
import { CDN_SERVER } from "@cra/config";
import { Helmet } from "react-helmet";
const SupportDetail = (props) => {
  const { t } = useTranslation();
  const db = useDB();
  if (!db) return null;
  const id = props.id;
  const data = props.data || db.get("supports").find({ id }).value();
  if (!data) return null;
  return (
    <div className="w-full flex flex-col p-3 overflow-x-hidden">
      {props.page && (
        <Helmet>
          <title>
            {t(data.charaName)} - {t(data.name)} - 支援卡 - 乌拉拉大胜利 - 赛马娘资料站
          </title>
          <meta
            name="description"
            content={`赛马娘支援卡 ${t(data.charaName)} ${t(data.name)} 的详细资料`}
          />
          <meta
            property="keywords"
            content={[data.name, t(data.name), data.charaName, t(data.charaName)].join(",")}
          />
        </Helmet>
      )}
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
  );
};
export default SupportDetail;
