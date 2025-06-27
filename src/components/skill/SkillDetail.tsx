import React, { useMemo } from "react";
import SupportList from "@/components/support/SupportList";
import PlayerList from "@/components/player/PlayerList";

import { useDB } from "@/hooks/useDB";
import { SKILL_TYPES, CDN_SERVER } from "@/config";

import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
const SkillDetail = ({
  id,
  data,
  isNur,
  page,
}: {
  id?: string;
  data?: Skill;
  isNur?: boolean;
  page?: boolean;
}) => {
  const { t } = useTranslation();
  const { db } = useDB();

  const fullData = useMemo(() => {
    // 优先使用直接传入的data
    if (data) return data;

    return db.chain.get("skills").find({ id }).value();
  }, [id, data, db]);

  const supportList = db.chain
    .get("supports")
    .filter((support) => {
      let flag = 0;
      support.skillList.forEach((id) => {
        if (id === fullData?.id) {
          flag = 1;
        }
      });
      return flag;
    })

    .sort((a, b) => b.rarity - a.rarity)
    .value();
  const playerList = db.chain
    .get("players")
    .filter((player) => {
      let flag = 0;
      player.skillList.forEach((id) => {
        if (id === fullData?.id) {
          flag = 1;
        }
      });
      return flag;
    })
    .sort((a, b) => b.rarity - a.rarity)
    .value();

  if (!fullData) return null;
  return (
    <div
      className="w-full flex flex-col p-3"
      style={{
        maxWidth: "calc(100vw - 40px)",
      }}
    >
      {page && (
        <Helmet>
          <title>{t(fullData.name)} - 技能 - 乌拉拉大胜利 - 赛马娘资料站</title>
          <meta
            name="description"
            content={`赛马娘技能「${t(fullData.name)}」, ${t(fullData.describe)} `}
          />
          <meta property="keywords" content={[fullData.name, t(fullData.name)].join(",")} />
        </Helmet>
      )}
      <div className="w-full flex mb-1 bg-gray-100 items-center">
        <div className="w-20 flex items-center justify-center">
          <img alt={fullData.name} src={CDN_SERVER + fullData.imgUrl} className="w-14" />
        </div>
        <div className="flex-auto">
          <p>{t(fullData.name)}</p>
          <p className="text-gray-500">{fullData.name}</p>
        </div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center shrink-0">{t("技能描述")}</div>
        <div className="flex-auto">
          <p>{t(fullData.describe)}</p>
          <p className="text-gray-500">{fullData.describe}</p>
        </div>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <div className="w-20 text-center shrink-0">{t("触发条件")}</div>
        <div className="flex-auto">
          <p>{t(fullData.condition)}</p>
          <p className="text-gray-500">{fullData.condition}</p>
        </div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center shrink-0">{t("技能效果")}</div>
        <div className="flex-auto">
          {fullData.ability?.map((ability) => {
            return (
              <span key={ability.type}>{`${SKILL_TYPES[ability.type]} ${
                ability.value / 10000
              }`}</span>
            );
          })}
        </div>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <div className="w-20 text-center shrink-0">{t("持续时间")}</div>
        <div className="flex-auto">{`${fullData.ability_time / 10000}s * ${t(
          "赛道长度"
        )} / 1000}`}</div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center shrink-0">{t("冷却时间")}</div>
        <div className="flex-auto">{`${fullData.cooldown / 10000}s * ${t("赛道长度")} / 1000`}</div>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <div className="w-20 text-center shrink-0">{t("技能价格")}</div>
        <div className="flex-auto">{fullData.need_skill_point}</div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center shrink-0">{t("技能评分")}</div>
        <div className="flex-auto">{fullData.grade_value}</div>
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
