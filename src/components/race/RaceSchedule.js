import React from "react";
import { useAtom } from "jotai";
import { racesAtom } from "../../hooks/atoms";
const RaceSchedule = (props) => {
  const [races] = useAtom(racesAtom);
  const str = [];
  const getDate = (i) => {
    let year = Math.floor(i / 24) + 1;
    let month = Math.floor((i - (year - 1) * 24) / 2) + 1;
    let moment = i % 2 ? "后" : "前";
    return `${year}年${month}月${moment}`;
  };
  for (let i = 13; i < 72; i++) {
    if (props.raceList && props.raceList[i]) {
      const curRace = races.find((item) => item.id === props.raceList[i].id);
      str.push(
        <div key={i} className="col-span-3 border border-solid border-[#2f3542] bg-[#ff6b81]">
          {getDate(i)}
          <br />
          {`${curRace.name}/${curRace.distanceType}/${props.raceList[i].goal}`}
        </div>
      );
    } else if (props.filterRace && props.filterRace[i]) {
      str.push(
        <div
          key={i}
          className="col-span-3 whitespace-pre-line border border-solid border-[#2f3542] bg-[#7bed9f]"
        >
          {getDate(i)}
          <br />
          {props.filterRace[i].map((raceId) => {
            const curRace = races.find((item) => item.id === props.raceList[i].id);
            return `${curRace.name}/${curRace.grade}/${curRace.distanceType}\n`;
          })}
        </div>
      );
    } else {
      str.push(
        <div key={i} className="col-span-3 border border-solid border-[#2f3542] bg-[#a4b0be]">
          {getDate(i)}
        </div>
      );
    }
  }
  return <div className="grid grid-cols-12 text-black">{str}</div>;
};

export default RaceSchedule;
