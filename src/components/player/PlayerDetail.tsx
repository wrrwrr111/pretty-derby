import React from "react";

import { CDN_SERVER } from "../../config";
import EventList from "../event/EventList";
import SkillList from "../skill/SkillList";
import RaceTimeline from "../race/RaceTimeline";
import { useTranslation } from "react-i18next";
import { atom, useAtomValue } from "jotai";
import { playerAtomFamily } from "../../hooks/atoms";
import useTilg from "tilg";

const PlayerItem = ({ data }) => {
  const { name, imgUrl, charaName } = data;
  const { t } = useTranslation();
  return (
    <div className="flex h-16 w-full flex-shrink-0">
      <img alt={name} src={CDN_SERVER + imgUrl} height={64} width={64} />
      <div className="flex h-full flex-auto flex-wrap items-center">
        <div className="flex w-full items-center justify-between">
          <div className=" truncate text-xl font-semibold">{name}</div>
          <div className="flex-shrink-0 truncate text-gray-700">{t(name)}</div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className=" truncate text-xl font-semibold">{charaName}</div>
          <div className="flex-shrink-0 truncate text-gray-700">{t(charaName)}</div>
        </div>
      </div>
    </div>
  );
};
export const PlayerDetail = ({ isNur = false, id = "" }) => {
  const { t } = useTranslation();
  const data = useAtomValue(playerAtomFamily({ id }));
  useTilg({ id, data });
  // 是否育成 育成顺序样式不同
  if (!data) return null;
  if (isNur) {
    return (
      <div className="flex w-full flex-col  p-3">
        <PlayerItem data={data} />
        <div>{t("多选项事件")}</div>
        <EventList idList={data.eventList0} />
        <div>{t("赛后事件")}</div>
        <EventList idList={data.eventList2} />
        <div>{t("通用事件")}</div>
        <EventList idList={data.eventList3} />
        <div>{t("隐藏事件")}</div>
        <EventList idList={data.hideEvent} type="all" />
        <div>{t("赛程")}</div>
        {/* <RaceSchedule raceList={data.raceList}/> */}
        <RaceTimeline raceList={data.raceList} showButton={false} />
        <div>{t("技能")}</div>
        <SkillList idList={data.skillList} />
      </div>
    );
  } else {
    return (
      <div className="flex w-full flex-col  p-3">
        <PlayerItem data={data} />
        <AdaptBox player={data} />
        <div className="h-2"></div>
        <GrowBox player={data} />
        <div className="h-2"></div>
        <SkillList idList={data.skillList} />
        <div>{t("多选项事件")}</div>
        <EventList idList={data.eventList0} />
        <div>{t("无选项事件")}</div>
        <EventList idList={data.eventList1} />
        <div>{t("赛后事件")}</div>
        <EventList idList={data.eventList2} />
        <div>{t("通用事件")}</div>
        <EventList idList={data.eventList3} />
        <div>{t("隐藏事件")}</div>
        <EventList idList={data.eventList4} />
        <div>{t("赛程")}</div>
        {/* <RaceSchedule raceList={data.raceList}/> */}
        <RaceTimeline raceList={data.raceList} />
      </div>
    );
  }
};

const coloredGradeText = (text) => {
  let color = "";
  switch (text) {
    case "S":
      color = "text-[#FFD700]";
      break;
    case "A":
      color = "text-[#FFA500]";
      break;
    case "B":
      color = "text-[#BA55D3]";
      break;
    case "C":
      color = "text-[#90EE90]";
      break;
    case "D":
      color = "text-[#87CEEB]";
      break;
    default:
      color = "text-gray";
  }
  return <div className={`text-xl font-semibold drop-shadow ${color}`}>{text}</div>;
};
const AdaptBox = (props) => {
  const { t } = useTranslation();

  return (
    <div className="my-1 grid grid-cols-5 rounded-lg border border-solid border-gray-500">
      <div className="md_text-xl col-span-1 flex items-center justify-center bg-green-400 text-gray-700">
        {t("场地适应")}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("芝")}`, coloredGradeText(props.player.grass)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("ダート")}`, coloredGradeText(props.player.dirt)]}
      </div>
      <div className="col-span-2"></div>
      <div className="md_text-xl col-span-1 flex items-center justify-center bg-green-400 text-gray-700">
        {t("赛程适应")}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("短距離")}`, coloredGradeText(props.player.shortDistance)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("マイル")}`, coloredGradeText(props.player.mile)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("中距離")}`, coloredGradeText(props.player.mediumDistance)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("長距離")}`, coloredGradeText(props.player.longDistance)]}
      </div>
      <div className="md_text-xl col-span-1 flex items-center justify-center bg-green-400 text-gray-700">
        {t("脚质适应")}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("逃げ")}`, coloredGradeText(props.player.escape)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("先行")}`, coloredGradeText(props.player.leading)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("差し")}`, coloredGradeText(props.player.insert)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("追込")}`, coloredGradeText(props.player.tracking)]}
      </div>
    </div>
  );
};

const GrowBox = (props) => {
  const { t } = useTranslation();
  return (
    <div className="my-1 grid grid-cols-5 rounded-lg border border-solid border-gray-500">
      <div className="md_text-xl col-span-1 flex items-center justify-center bg-green-400 text-gray-700">
        {t("スピード")}
      </div>
      <div className="md_text-xl col-span-1 flex items-center justify-center bg-green-400 text-gray-700">
        {t("スタミナ")}
      </div>
      <div className="md_text-xl col-span-1 flex items-center justify-center bg-green-400 text-gray-700">
        {t("パワー")}
      </div>
      <div className="md_text-xl col-span-1 flex items-center justify-center bg-green-400 text-gray-700">
        {t("根性")}
      </div>
      <div className="md_text-xl col-span-1 flex items-center justify-center bg-green-400 text-gray-700">
        {t("賢さ")}
      </div>
      <div className="col-span-1 flex items-center justify-around">{props.player.speedGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{props.player.staminaGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{props.player.powerGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{props.player.gutsGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{props.player.wisdomGrow}</div>
    </div>
  );
};
