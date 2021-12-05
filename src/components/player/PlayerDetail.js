import React, { useState } from "react";

import db from "../../db.js";
import t from "../t.js";
import { cdnServer } from "../../config";
import EventList from "../event/EventList";
import SkillList from "../skill/SkillList";
// import RaceList from './player-race.js'
import {
  // RaceSchedule,
  RaceTimeline,
} from "../race";
// import {EffectTable} from './effect.js'

const PlayerDetail = (props) => {
  const id = props.id || props.match?.params?.id;
  // 是否育成 育成顺序样式不同
  const isNur = props.isNur ?? parseInt(props.match?.params?.nur);
  console.log(props.match,isNur,'test');
  const data = props.data || db.get("players").find({ id }).value();
  const PlayerItem = () => (
    <div className="h-16 w-full flex flex-shrink-0">
      <img alt={data.name} src={cdnServer + data.imgUrl} height={64} width={64} />
      <div className="flex-auto flex flex-wrap h-full items-center">
        <div className="w-1/2 text-xl font-semibold truncate">{data.name}</div>
        <div className="w-1/2 text-gray-700 truncate">{t(data.name)}</div>
        <div className="w-1/2 text-xl font-semibold truncate">{data.charaName}</div>
        <div className="w-1/2  text-gray-700 truncate">{t(data.charaName)}</div>
      </div>
    </div>
  );
  if (isNur) {
    return (
      <>
        <PlayerItem></PlayerItem>
        <div>{t("多选项事件")}</div>
        <EventList idList={data.eventList0}></EventList>
        <div>{t("赛后事件")}</div>
        <EventList idList={data.eventList2}></EventList>
        <div>{t("通用事件")}</div>
        <EventList idList={data.eventList3}></EventList>
        <div>{t("隐藏事件")}</div>
        <EventList idList={data.hideEvent} type="all"></EventList>
        <div>{t("赛程")}</div>
        {/* <RaceSchedule raceList={data.raceList}></RaceSchedule> */}
        <RaceTimeline raceList={data.raceList} showButton={false}></RaceTimeline>
        <div>{t("技能")}</div>
        <SkillList idList={data.skillList}></SkillList>
      </>
    );
  } else {
    return (
      <>
        <PlayerItem></PlayerItem>
        <AdaptBox player={data}></AdaptBox>
        <div className="h-2"></div>
        <GrowBox player={data}></GrowBox>
        <div className="h-2"></div>
        <SkillList idList={data.skillList}></SkillList>
        <div>{t("多选项事件")}</div>
        <EventList idList={data.eventList0}></EventList>
        <div>{t("无选项事件")}</div>
        <EventList idList={data.eventList1}></EventList>
        <div>{t("赛后事件")}</div>
        <EventList idList={data.eventList2}></EventList>
        <div>{t("通用事件")}</div>
        <EventList idList={data.eventList3}></EventList>
        <div>{t("隐藏事件")}</div>
        <EventList idList={data.eventList4}></EventList>
        <div>{t("赛程")}</div>
        {/* <RaceSchedule raceList={data.raceList}></RaceSchedule> */}
        <RaceTimeline raceList={data.raceList}></RaceTimeline>
      </>
    );
  }
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
  const tableStyle = {
    width: "100%",
    cellPadding: 4,
  };
  const cellStyle = {
    width: "20%",
    height: "32px",
    fontSize: 16,
    textAlign: "flex-start",
    paddingLeft: 16,
    fontWeight: 500,
    borderWidth: "thin",
    borderStyle: "none solid solid none",
    borderColor: "gray",
  };
  const headerCellStyle = {
    width: "20%",
    fontSize: 18,
    textAlign: "center",
    fontWeight: 600,
    color: "#f5f5f5",
    textShadow: "0 2px #33333370",
    backgroundColor: "#32cd32C0",
    borderWidth: "thin",
    borderStyle: "none solid solid none",
    borderColor: "gray",
  };
  const adaptTextWrapperStyle = {
    paddingRight: 16,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  };

  // {[`草地/芝\xa0`,coloredGradeText(props.player.grass)]}
  return (
    <div className="rounded-lg border border-solid border-gray-500">
      <table className="w-full">
        <tbody>
          <tr>
            <td
              style={{
                ...headerCellStyle,
                borderRadius: "8px 0 0 0",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {t("场地适应")}
            </td>
            <td style={{ ...cellStyle }}>
              <div style={adaptTextWrapperStyle}>
                {[`${t("芝")}`, coloredGradeText(props.player.grass)]}
              </div>
            </td>
            <td style={{ ...cellStyle }}>
              <div style={adaptTextWrapperStyle}>
                {[`${t("ダート")}`, coloredGradeText(props.player.dirt)]}
              </div>
            </td>
            <td style={{ ...cellStyle }}>{`\xa0`}</td>
            <td
              style={{
                ...cellStyle,
                borderRadius: "0 8px 0 0",
                borderStyle: "none none solid none",
              }}
            >{`\xa0`}</td>
          </tr>
          <tr>
            <td style={{ ...headerCellStyle, fontWeight: 700, fontSize: 18 }}>{t("赛程适应")}</td>
            <td style={{ ...cellStyle }}>
              <div style={adaptTextWrapperStyle}>
                {[`${t("短距離")}`, coloredGradeText(props.player.shortDistance)]}
              </div>
            </td>
            <td style={{ ...cellStyle }}>
              <div style={adaptTextWrapperStyle}>
                {[`${t("マイル")}`, coloredGradeText(props.player.mile)]}
              </div>
            </td>
            <td style={{ ...cellStyle }}>
              <div style={adaptTextWrapperStyle}>
                {[`${t("中距離")}`, coloredGradeText(props.player.mediumDistance)]}
              </div>
            </td>
            <td
              style={{
                ...cellStyle,
                borderRadius: "0 0 8px 0",
                borderStyle: "none none solid none",
              }}
            >
              <div style={adaptTextWrapperStyle}>
                {[`${t("長距離")}`, coloredGradeText(props.player.longDistance)]}
              </div>
            </td>
          </tr>
          <tr>
            <td
              style={{
                ...headerCellStyle,
                borderRadius: "0 0 0 8px",
                borderStyle: "none solid none none",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {t("脚质适应")}
            </td>
            <td style={{ ...cellStyle, borderStyle: "none solid none none" }}>
              <div style={adaptTextWrapperStyle}>
                {[`${t("逃げ")}`, coloredGradeText(props.player.escape)]}
              </div>
            </td>
            <td style={{ ...cellStyle, borderStyle: "none solid none none" }}>
              <div style={adaptTextWrapperStyle}>
                {[`${t("先行")}`, coloredGradeText(props.player.leading)]}
              </div>
            </td>
            <td style={{ ...cellStyle, borderStyle: "none solid none none" }}>
              <div style={adaptTextWrapperStyle}>
                {[`${t("差し")}`, coloredGradeText(props.player.insert)]}
              </div>
            </td>
            <td
              style={{
                ...cellStyle,
                borderRadius: "0 0 8px 0",
                borderStyle: "none none none none",
              }}
            >
              <div style={adaptTextWrapperStyle}>
                {[`${t("追込")}`, coloredGradeText(props.player.tracking)]}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const GrowBox = (props) => {
  const headerCellStyle = {
    width: "20%",
    fontSize: 18,
    textAlign: "center",
    fontWeight: 600,
    color: "#f5f5f5",
    textShadow: "0 2px #33333370",
    backgroundColor: "#32cd32C0",
    borderWidth: "thin",
    borderStyle: "none solid solid none",
    borderColor: "gray",
  };
  const cellStyle = {
    width: "20%",
    height: "40px",
    fontSize: 16,
    textAlign: "center",
    fontWeight: 500,
    borderWidth: "thin",
    borderStyle: "none solid none none",
    borderColor: "gray",
  };

  return (
    <div className=" rounded-lg border borders border-gray-500">
      <table className="w-full">
        <tbody>
          <tr>
            <th style={{ ...headerCellStyle, borderRadius: "8px 0 0 0" }}>{t("スピード")}</th>
            <th style={{ ...headerCellStyle }}>{t("スタミナ")}</th>
            <th style={{ ...headerCellStyle }}>{t("パワー")}</th>
            <th style={{ ...headerCellStyle }}>{t("根性")}</th>
            <th
              style={{
                ...headerCellStyle,
                borderRadius: "0 8px 0 0",
                borderStyle: "none none solid none",
              }}
            >
              {t("賢さ")}
            </th>
          </tr>
          <tr>
            <td style={{ ...cellStyle, borderRadius: "0 0 0 8px" }}>{props.player.speedGrow}</td>
            <td style={{ ...cellStyle }}>{props.player.staminaGrow}</td>
            <td style={{ ...cellStyle }}>{props.player.powerGrow}</td>
            <td style={{ ...cellStyle }}>{props.player.gutsGrow}</td>
            <td
              style={{
                ...cellStyle,
                borderRadius: "0 0 8px 0",
                borderStyle: "none none none none",
              }}
            >
              {props.player.wisdomGrow}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlayerDetail;
