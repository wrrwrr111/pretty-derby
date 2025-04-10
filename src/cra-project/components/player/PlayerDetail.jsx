import React, { useEffect } from "react";

import { CDN_SERVER } from "@cra/config";
import EventList from "../event/EventList";
import SkillList from "../skill/SkillList";
// import RaceList from './player-race'
import {
  // RaceSchedule,
  RaceTimeline,
} from "../race/index";
// import {EffectTable} from './effect'
import { useDB } from "../../hooks/index";
import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";

const PlayerItem = ({ data }) => {
  const { name, imgUrl, charaName } = data;
  const { t } = useTranslation();
  return (
    <div className="h-16 w-full flex flex-shrink-0">
      <img alt={name} src={CDN_SERVER + imgUrl} height={64} width={64} />
      <div className="flex-auto flex flex-wrap h-full items-center">
        <div className="w-full flex items-center justify-between">
          <div className=" text-xl font-semibold truncate">{name}</div>
          <div className="flex-shrink-0 text-gray-700 truncate">{t(name)}</div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className=" text-xl font-semibold truncate">{charaName}</div>
          <div className="flex-shrink-0 text-gray-700 truncate">{t(charaName)}</div>
        </div>
      </div>
    </div>
  );
};
const PlayerDetail = (props) => {
  const { t } = useTranslation();
  const db = useDB();
  const id = props.id || props.match?.params?.id;
  // 是否育成 育成顺序样式不同
  const isNur = props.isNur ?? parseInt(props.match?.params?.nur);
  const data = props.data || db.get("players").find({ id }).value();

  if (!data) return null;

  return (
    <>
      {props.page && (
        <Helmet>
          <title>
            {t(data.name)} | {t(data.charaName)} | 角色 | 乌拉拉大胜利 | 赛马娘资料站
          </title>
          <meta
            name="description"
            content={`赛马娘角色卡 ${t(data.name)} ${t(data.charaName)} 的详细资料`}
          />
          <meta
            property="keywords"
            content={[data.name, t(data.name), data.charaName, t(data.charaName)].join(",")}
          />
        </Helmet>
      )}
      {isNur ? (
        <div className="w-full flex flex-col p-3">
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
      ) : (
        <div className="w-full flex flex-col p-3">
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
      )}
    </>
  );
};

const coloredGradeText = (text) => {
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
const AdaptBox = (props) => {
  const { t } = useTranslation();

  return (
    <div className="my-1 rounded-lg border border-solid border-gray-500 grid grid-cols-5">
      <div className="col-span-1 md_text-xl bg-green-400 text-gray-700 flex justify-center items-center">
        {t("场地适应")}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("芝")}`, coloredGradeText(props.player.grass)]}
      </div>
      <div className="col-span-1 flex items-center justify-around">
        {[`${t("ダート")}`, coloredGradeText(props.player.dirt)]}
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-1 md_text-xl bg-green-400 text-gray-700 flex justify-center items-center">
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
      <div className="col-span-1 md_text-xl bg-green-400 text-gray-700 flex justify-center items-center">
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
      <div className="col-span-1 flex items-center justify-around">{props.player.speedGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{props.player.staminaGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{props.player.powerGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{props.player.gutsGrow}</div>
      <div className="col-span-1 flex items-center justify-around">{props.player.wisdomGrow}</div>
    </div>
  );
};

export default PlayerDetail;
