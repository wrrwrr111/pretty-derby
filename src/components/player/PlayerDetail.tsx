import React, { useEffect, useMemo } from "react";

import { CDN_SERVER } from "@/config";
import EventList from "@/components/event/EventList";
import SkillList from "@/components/skill/SkillList";
// import RaceList from './player-race.js'
import { RaceTimeline } from "@/components/race/index";
// import {EffectTable} from './effect.js'
import { useDB } from "@/hooks/useDB";
import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";

const PlayerItem = ({ data }: { data: Player }) => {
  const { name, imgUrl, charaName } = data;
  const { t } = useTranslation();
  return (
    <div className="h-16 w-full flex shrink-0">
      <img alt={name} src={CDN_SERVER + imgUrl} height={64} width={64} />
      <div className="flex-auto flex flex-wrap h-full items-center">
        <div className="w-full flex items-center justify-between">
          <div className=" text-xl font-semibold truncate">{name}</div>
          <div className="shrink-0 text-gray-700 truncate">{t(name)}</div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className=" text-xl font-semibold truncate">{charaName}</div>
          <div className="shrink-0 text-gray-700 truncate">{t(charaName)}</div>
        </div>
      </div>
    </div>
  );
};

const PlayerDetail = ({
  id,
  data,
  isNur,
  page,
}: {
  id?: string;
  data?: Player;
  isNur?: boolean;
  page?: boolean;
}) => {
  const { t } = useTranslation();
  const { db } = useDB();

  // 使用useMemo优化性能，避免重复计算
  const fullData = useMemo(() => {
    // 优先使用直接传入的data
    if (data) return data;

    return db.chain.get("players").find({ id }).value() ?? null;
  }, [id, data, db]);

  // 数据不存在时的处理
  if (!fullData) {
    return <div className="error-message">{t("playerNotFound", { playerId: id })}</div>;
  }

  return (
    <>
      {page && (
        <Helmet>
          <title>
            {t(fullData.name)} | {t(fullData.charaName)} | 角色 | 乌拉拉大胜利 | 赛马娘资料站
          </title>
          <meta
            name="description"
            content={`赛马娘角色卡 ${t(fullData.name)} ${t(fullData.charaName)} 的详细资料`}
          />
          <meta
            property="keywords"
            content={[
              fullData.name,
              t(fullData.name),
              fullData.charaName,
              t(fullData.charaName),
            ].join(",")}
          />
        </Helmet>
      )}
      {isNur ? (
        <div className="w-full flex flex-col p-3">
          <PlayerItem data={fullData} />
          <div>{t("多选项事件")}</div>
          <EventList idList={fullData.eventList0} />
          <div>{t("赛后事件")}</div>
          <EventList idList={fullData.eventList2} />
          <div>{t("通用事件")}</div>
          <EventList idList={fullData.eventList3} />
          <div>{t("隐藏事件")}</div>
          <EventList idList={fullData.hideEvent} type="all" />
          <div>{t("赛程")}</div>
          <RaceTimeline raceList={fullData.raceList} showButton={false} />
          <div>{t("技能")}</div>
          <SkillList idList={fullData.skillList} />
        </div>
      ) : (
        <div className="w-full flex flex-col p-3">
          <PlayerItem data={fullData} />
          <AdaptBox player={fullData} />
          <div className="h-2"></div>
          <GrowBox player={fullData} />
          <div className="h-2"></div>
          <SkillList idList={fullData.skillList} />
          <div>{t("多选项事件")}</div>
          <EventList idList={fullData.eventList0} />
          <div>{t("无选项事件")}</div>
          <EventList idList={fullData.eventList1} />
          <div>{t("赛后事件")}</div>
          <EventList idList={fullData.eventList2} />
          <div>{t("通用事件")}</div>
          <EventList idList={fullData.eventList3} />
          <div>{t("隐藏事件")}</div>
          <EventList idList={fullData.eventList4} />
          <div>{t("赛程")}</div>
          <RaceTimeline raceList={fullData.raceList} />
        </div>
      )}
    </>
  );
};

const coloredGradeText = (text: string) => {
  let color = "gray";
  switch (text) {
    case "S":
      color = "#FFD700";
      break;
    case "A":
      color = "#FFA500";
      break;
    case "B":
      color = "#BA55D3";
      break;
    case "C":
      color = "#90EE90";
      break;
    case "D":
      color = "#87CEEB";
      break;
    default:
      color = "gray";
  }
  return (
    <div style={{ fontSize: 22, fontWeight: 700, textShadow: "0 2px #33333370", color: color }}>
      {text}
    </div>
  );
};
const AdaptBox = ({ player }: { player: Player }) => {
  const { t } = useTranslation();

  return (
    <div className="my-1 rounded-lg border border-solid border-gray-500 grid grid-cols-5">
      <div className="col-span-1 md_text-xl bg-green-400 text-gray-700 flex justify-center items-center">
        {t("场地适应")}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("芝")}`, coloredGradeText(player.grass)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("ダート")}`, coloredGradeText(player.dirt)]}
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-1 md_text-xl bg-green-400 text-gray-700 flex justify-center items-center">
        {t("赛程适应")}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("短距離")}`, coloredGradeText(player.shortDistance)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("マイル")}`, coloredGradeText(player.mile)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("中距離")}`, coloredGradeText(player.mediumDistance)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("長距離")}`, coloredGradeText(player.longDistance)]}
      </div>
      <div className="col-span-1 md_text-xl bg-green-400 text-gray-700 flex justify-center items-center">
        {t("脚质适应")}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("逃げ")}`, coloredGradeText(player.escape)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("先行")}`, coloredGradeText(player.leading)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("差し")}`, coloredGradeText(player.insert)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("追込")}`, coloredGradeText(player.tracking)]}
      </div>
    </div>
  );
};

const GrowBox = ({ player }: { player: Player }) => {
  const { t } = useTranslation();
  return (
    <div className="my-1 rounded-lg border border-solid border-gray-500 grid grid-cols-5">
      <div className="col-span-1 md_text-xl bg-green-400 text-gray-700 flex justify-center items-center">
        {t("スピード")}
      </div>
      <div className="col-span-1 md_text-xl bg-green-400 text-gray-700 flex justify-center items-center">
        {t("スタミナ")}
      </div>
      <div className="col-span-1 md_text-xl bg-green-400 text-gray-700 flex justify-center items-center">
        {t("パワー")}
      </div>
      <div className="col-span-1 md_text-xl bg-green-400 text-gray-700 flex justify-center items-center">
        {t("根性")}
      </div>
      <div className="col-span-1 md_text-xl bg-green-400 text-gray-700 flex justify-center items-center">
        {t("賢さ")}
      </div>
      <div className="col-span-1 flex items-center justify-around">{player.speedGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{player.staminaGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{player.powerGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{player.gutsGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{player.wisdomGrow}</div>
    </div>
  );
};

export default PlayerDetail;
