import React, { useState } from "react";
import { Row, Col, Timeline, Checkbox } from "antd";
import { useDB } from "/hooks/index.js";

const RaceSchedule = (props) => {
  // const { t } = useTranslation();
  const db = useDB();
  if (!db) return null;
  // const races = db.get('races').value()
  const str = [];
  const getDate = (i) => {
    let year = Math.floor(i / 24) + 1;
    let month = Math.floor((i - (year - 1) * 24) / 2) + 1;
    let moment = i % 2 ? "后" : "前";
    return `${year}年${month}月${moment}`;
  };
  for (let i = 13; i < 72; i++) {
    let curRace;
    if (props.raceList && props.raceList[i]) {
      curRace = db.get("races").find({ id: props.raceList[i].id }).value();
      str.push(
        <Col span={6} key={i} style={{ backgroundColor: "#ff6b81", border: "1px solid #2f3542" }}>
          {getDate(i)}
          <br />
          {`${curRace.name}/${curRace.distanceType}/${props.raceList[i].goal}`}
          {/* -{curRace.date} */}
        </Col>
      );
    } else if (props.filterRace && props.filterRace[i]) {
      str.push(
        <Col
          span={6}
          key={i}
          style={{
            backgroundColor: "#7bed9f",
            border: "1px solid #2f3542",
            whiteSpace: "pre-line",
          }}
        >
          {getDate(i)}
          <br />
          {props.filterRace[i].map((raceId) => {
            let curRace = db.get("races").find({ id: raceId }).value();
            return `${curRace.name}/${curRace.grade}/${curRace.distanceType}\n`;
          })}
        </Col>
      );
    } else {
      str.push(
        <Col span={6} key={i} style={{ backgroundColor: "#a4b0be", border: "1px solid #2f3542" }}>
          {getDate(i)}
        </Col>
      );
    }
  }
  return <Row style={{ color: "black" }}>{str}</Row>;
};

export default RaceSchedule;
