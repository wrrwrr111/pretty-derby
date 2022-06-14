import React from "react";
import SupportList from "../support/SupportList";
import PlayerList from "../player/PlayerList";

import { useDB } from "/hooks/index.js";
import { SKILL_TYPES, CDN_SERVER } from "/src/config";

import { useTranslation } from "react-i18next";

const SkillDetail = (props) => {
  const { t } = useTranslation();
  const db = useDB();
  if (!db) return null;
  const id = props.id;
  const data = props.data || db.get("skills").find({ id }).value();
  const isNur = props.isNur !== undefined ? props.isNur : parseInt(props.match?.params?.nur);
  const supportList = db
    .get("supports")
    .filter((support) => {
      let flag = 0;
      support.skillList.forEach((id) => {
        if (id === data?.id) {
          flag = 1;
        }
      });
      return flag;
    })

    .sort((a, b) => b.rarity - a.rarity)
    .value();
  const playerList = db
    .get("players")
    .filter((player) => {
      let flag = 0;
      player.skillList.forEach((id) => {
        if (id === data?.id) {
          flag = 1;
        }
      });
      return flag;
    })
    .sort((a, b) => b.rarity - a.rarity)
    .value();

  if (!data) return null;
  return (
    <div
      className="w-full flex flex-col p-3"
      style={{
        maxWidth: "calc(100vw - 40px)",
      }}
    >
      <div className="w-full flex mb-1 bg-gray-100 items-center">
        <div className="w-20 flex items-center justify-center">
          <img alt={data.name} src={CDN_SERVER + data.imgUrl} className="w-14" />
        </div>
        <div className="flex-auto">
          <p>{t(data.name)}</p>
          <p className="text-gray-500">{data.name}</p>
        </div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center flex-shrink-0">{t("技能描述")}</div>
        <div className="flex-auto">
          <p>{t(data.describe)}</p>
          <p className="text-gray-500">{data.describe}</p>
        </div>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <div className="w-20 text-center flex-shrink-0">{t("触发条件")}</div>
        <div className="flex-auto">
          <p>{t(data.condition)}</p>
          <p className="text-gray-500">{data.condition}</p>
        </div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center flex-shrink-0">{t("技能效果")}</div>
        <div className="flex-auto">
          {data.ability?.map((ability) => {
            return (
              <span key={ability.type}>{`${SKILL_TYPES[ability.type]} ${
                ability.value / 10000
              }`}</span>
            );
          })}
        </div>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <div className="w-20 text-center flex-shrink-0">{t("持续时间")}</div>
        <div className="flex-auto">{`${data.ability_time / 10000}s * ${t(
          "赛道长度"
        )} / 1000}`}</div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center flex-shrink-0">{t("冷却时间")}</div>
        <div className="flex-auto">{`${data.cooldown / 10000}s * ${t("赛道长度")} / 1000`}</div>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <div className="w-20 text-center flex-shrink-0">{t("技能价格")}</div>
        <div className="flex-auto">{data.need_skill_point}</div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center flex-shrink-0">{t("技能评分")}</div>
        <div className="flex-auto">{data.grade_value}</div>
      </div>
      {!isNur && (
        <>
          {supportList.length > 0 && (
            <>
              <div>{t("支援卡")}</div>
              <SupportList className="w-full" dataList={supportList} sortFlag={false} />
            </>
          )}
          {playerList.length > 0 && (
            <>
              <div>{t("角色")}</div>
              <PlayerList className="w-full" dataList={playerList} />
            </>
          )}
          {/* {data.events?.length > 0 && (
            <>
              <div>{t("事件")}</div>
              <EventList className="w-full" idList={data.events} />
            </>
          )} */}
        </>
      )}
    </div>
  );
};

export default SkillDetail;
