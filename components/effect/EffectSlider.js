import React from "react";
// import MaterialTable from "material-table";
import Slider from "@mui/material/Slider";

import { useTranslation } from "react-i18next";
import { useDB } from "/hooks/index.js";

import { EFFECT_LIMITS } from "/src/config";

const getEffectMark = (maxLevel) => {
  let marks = [
    { value: 1, label: "lv1" },
    { value: 5, label: "lv5" },
    { value: 10, label: "lv10" },
    { value: 15, label: "lv15" },
    { value: 20, label: "lv20" },
    { value: 25, label: "lv25" },
    { value: 30, label: "lv30" },
    { value: 35, label: "lv35" },
    { value: 40, label: "lv40" },
  ];
  if (maxLevel >= 45) {
    marks.push({ value: 45, label: "lv45" });
  }
  if (maxLevel === 50) {
    marks.push({ value: 50, label: "lv50" });
  }
  return marks;
};
function valuetext(value) {
  return `lv${value}`;
}

const EffectSlider = (props) => {
  const db = useDB();
  const { t } = useTranslation();
  const getMaxLevel = (rarity) => {
    switch (rarity) {
      case 1:
        return 40;
      case 5:
        return 45;
      case 3:
        return 50;
      default:
        return 1;
    }
  };
  const maxLevel = getMaxLevel(props.rarity);
  const [selectingLevel, setSelectingLevel] = React.useState(maxLevel);
  const calc = (data, input) => {
    let nodes = [];
    let output = 0;
    let prevNode = { level: 0, value: 0 };
    for (let i = 0; i < data.length; i += 1) {
      if (data[i] !== -1) {
        let level = i * 5;
        if (level === 0) {
          level = 1;
        }
        nodes.push({ level: level, value: data[i] });
        prevNode = { level: level, value: data[i] };
      }
      if (i === data.length - 1 && data[i] === -1) {
        nodes.push({ level: maxLevel, value: prevNode.value });
      }
    }
    nodes.push({ level: 999, value: prevNode.value }); // 以后万一出SSSR？确保一定能找到区间。

    const level = Math.floor(input);
    let upperNode = { level: 0, value: 0 };
    let lowerNode = { level: 0, value: 0 };
    if (level < 0 || level > maxLevel) {
      output = 0;
    } else if (level < nodes[0].level) {
      output = 0;
    } else {
      for (let i = 0; i < nodes.length; i += 1) {
        if (level >= nodes[i].level && level < nodes[i + 1].level) {
          lowerNode = nodes[i];
          upperNode = nodes[i + 1] || nodes[i];
          break;
        }
      }
      output = Math.floor(
        ((upperNode.value - lowerNode.value) / (upperNode.level - lowerNode.level)) *
          (level - lowerNode.level) +
          lowerNode.value
      );
    }

    return output;
  };
  console.log({ selectingLevel });
  if (!db) return null;
  const effects = db.get("effects").value();
  return (
    <div>
      {props.unique_effect && (
        <>
          <div className="flex w-full items-center justify-between p-5">
            <div>{t("固有效果")}</div>
            <div>{`${t("激活等级")}:${props.unique_effect.lv}`}</div>
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            {["0", "1"].map((index) =>
              props.unique_effect[`type_${index}`] ? (
                <div
                  key={index}
                  className="col-span-1 flex items-center rounded-xl border border-solid bg-green-300 border-green-500"
                >
                  <div
                    className="flex-auto truncate pl-2"
                    data-tip={`<div><p>${
                      effects[props.unique_effect[`type_${index}`]]?.name
                    }</p><p>${t(effects[props.unique_effect[`type_${index}`]]?.name)}</p><p>${
                      effects[props.unique_effect[`type_${index}`]]?.description
                    }</p><p>${t(
                      effects[props.unique_effect[`type_${index}`]]?.description
                    )}</p></div>`}
                  >
                    {t(effects[props.unique_effect[`type_${index}`]]?.name)}
                  </div>
                  <div className="bg-white h-full w-10 md:w-24 rounded-r-xl pl-2 flex items-center flex-shrink-0">
                    {props.unique_effect[`value_${index}`]}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </>
      )}
      <div className="w-full flex items-center py-2">
        <div className="mr-2">{t("设置等级")}</div>
        <Slider
          aria-label="Temperature"
          defaultValue={maxLevel}
          valueLabelDisplay="always"
          getAriaValueText={valuetext}
          onChange={(e, value) => {
            setSelectingLevel(value);
          }}
          step={1}
          marks={getEffectMark(maxLevel)}
          min={0}
          max={maxLevel}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-2 ">
        {props.effects?.map((item, index) => {
          const data = [
            item.init,
            item.limit_lv5,
            item.limit_lv10,
            item.limit_lv15,
            item.limit_lv20,
            item.limit_lv25,
            item.limit_lv30,
            item.limit_lv35,
            item.limit_lv40,
            item.limit_lv45,
            item.limit_lv50,
          ].filter((item) => item);
          return (
            <div
              key={item.type}
              className="col-span-1 flex items-center rounded-xl border border-solid bg-green-300 border-green-500"
            >
              <div
                className="flex-auto truncate pl-2"
                data-tip={`<div><p>${effects[item.type].name}</p><p>${t(
                  effects[item.type].name
                )}</p><p>${effects[item.type].description}</p><p>${t(
                  effects[item.type].description
                )}</p></div>`}
              >
                {t(effects[item.type].name)}
              </div>
              <div className="bg-white h-full w-10 md:w-24 rounded-r-xl pl-2 flex items-center flex-shrink-0">
                {calc(data, selectingLevel)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EffectSlider;
