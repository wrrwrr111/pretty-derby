import React, { useState } from "react";
import Button from "@material-tailwind/react/Button";
import { useTranslation } from "react-i18next";
import { Timeline } from "antd";
import { useDB } from "/hooks/index.js";

import { RACE_GOLD_LIST } from "/src/config";

const getGolds = (race) => {
  return RACE_GOLD_LIST.reduce((golds, raceGold) => {
    if (raceGold.raceNames.indexOf(race.uniqueName) !== -1) {
      golds.push(
        `${raceGold.name} ${raceGold.raceNames.indexOf(race.uniqueName) + 1}/${
          raceGold.raceNames.length
        }`
      );
    }
    return golds;
  }, []).join(" , ");
};
const RaceTimeline = React.memo((props) => {
  const { t } = useTranslation();
  const [showSpare, setShowSpare] = useState(false);
  const db = useDB();
  if (!db) return null;
  const { showButton } = props;
  const str = [];

  const getDate = (i) => {
    let year = Math.floor(i / 24) + 1;
    let month = Math.floor((i - (year - 1) * 24) / 2) + 1;
    month = month < 10 ? `\xa0\xa0${month}` : month;
    let moment = i % 2 ? "后" : "前";
    return `${year}年\xa0${month}月${moment}`;
  };
  const getColor = (grade) => {
    switch (grade) {
      case "G1":
        return "blue";
      case "G2":
        return "pink";
      case "G3":
        return "green";
      case "OP":
        return "orange";
      case "Pre-OP":
        return "orange";
      default:
        return "gray";
    }
  };
  for (let i = 13; i < 72; i++) {
    let curRace, id, golds;
    if (props.raceList && props.raceList[i]) {
      id = props.raceList[i].id;
      curRace = db.get("races").find({ id }).value();
      golds = getGolds(curRace);
      str.push(
        <Timeline.Item label={getDate(i)} color="red" className="text-base" key={id}>
          {`${curRace.grade} / ${curRace.distanceType} / ${curRace.distance} / ${curRace.name} / ${
            props.raceList[i].goal || "参赛"
          }
          ${golds ? " / " + golds : ""}`}
        </Timeline.Item>
      );
    } else if (props.filterRace && props.filterRace[i]) {
      props.filterRace[i].forEach((id, index) => {
        curRace = db.get("races").find({ id }).value();
        golds = getGolds(curRace);
        str.push(
          <Timeline.Item
            label={index === 0 ? getDate(i) : null}
            color={getColor(curRace.grade)}
            style={{ fontSize: "14px" }}
            key={id}
          >
            {`${curRace.grade} / ${curRace.distanceType} / ${curRace.distance} / ${curRace.name}
            ${golds ? " / " + golds : ""}`}
          </Timeline.Item>
        );
      });
    } else {
      //普通
      showSpare &&
        str.push(
          <Timeline.Item
            label={getDate(i)}
            color={getColor("normal")}
            style={{ fontSize: "12px" }}
          />
        );
    }
  }
  return (
    <>
      {showButton && (
        <Button onClick={() => setShowSpare(!showSpare)}>
          {showSpare ? t("隐藏空闲月份") : t("显示空闲月份")}
        </Button>
      )}
      <Timeline mode="left">{str}</Timeline>
    </>
  );
});

export default RaceTimeline;
