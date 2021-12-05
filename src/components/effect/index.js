import React from "react";
// import {useState} from 'react';
import { Table, Popover, Slider, div, Col } from "antd";

import db from "../../db.js";
import dbL from "../../dbL.js";
import t from "../t.js";

const ua = dbL.get("ua").value();
const limits = [
  "init",
  "limit_lv5",
  "limit_lv10",
  "limit_lv15",
  "limit_lv20",
  "limit_lv25",
  "limit_lv30",
  "limit_lv35",
  "limit_lv40",
  "limit_lv45",
  "limit_lv50",
];
const getValue = (effect, cur) => {
  if (effect[cur] !== -1) {
    return effect[cur];
  } else {
    let index = limits.indexOf(cur);
    let min = 0;
    let min_limit = "init";
    let max = 0;
    let max_limit = "limit_lv50";
    for (let limit of limits.slice(0, index)) {
      if (effect[limit] > min) {
        min = effect[limit];
        min_limit = limit;
      }
    }
    for (let limit of limits.slice(index, limits.length)) {
      if (effect[limit] !== -1) {
        max = effect[limit];
        max_limit = limit;
        break;
      }
    }
    // cur=40 lv35=40 lv40=-1 lv50=-1
    if (max <= min || max - min === 1 || min === 0) {
      return min;
    } else {
      return (
        <div data-tip="插值">
          {Math.floor(
            min +
              ((max - min) * (limits.indexOf(cur) - limits.indexOf(min_limit))) /
                (limits.indexOf(max_limit) - limits.indexOf(min_limit))
          )}
        </div>
      );
    }
  }
};
const EffectTable = (props) => {
  const effects = db.get("effects").value();
  let columns = [
    {
      title: t("效果"),
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <p
          data-tip={`<div><p>${effects[type].name}</p><p>${t(effects[type].name)}</p><p>${
            effects[type].description
          }</p><p>${t(effects[type].description)}</p></div>`}
        >
          {t(effects[type].name)}
        </p>
      ),
    },
    {
      title: t("初始"),
      dataIndex: "init",
      key: "init",
      render: (div, record) => getValue(record, "init"),
    },
    {
      title: "lv25",
      dataIndex: "limit_lv25",
      key: "limit_lv25",
      render: (div, record) => getValue(record, "limit_lv25"),
    },
    {
      title: "lv30",
      dataIndex: "limit_lv30",
      key: "limit_lv30",
      render: (div, record) => getValue(record, "limit_lv30"),
    },
    {
      title: "lv35",
      dataIndex: "limit_lv35",
      key: "limit_lv35",
      render: (div, record) => getValue(record, "limit_lv35"),
    },
    {
      title: "lv40",
      dataIndex: "limit_lv40",
      key: "limit_lv40",
      render: (div, record) => getValue(record, "limit_lv40"),
    },
    {
      title: "lv45",
      dataIndex: "limit_lv45",
      key: "limit_lv45",
      render: (div, record) => getValue(record, "limit_lv45"),
    },
    {
      title: "lv50",
      dataIndex: "limit_lv50",
      key: "limit_lv50",
      render: (div, record) => getValue(record, "limit_lv50"),
    },
  ];
  if (props.rarity === 2) {
    columns = columns.slice(0, columns.length - 1);
  } else if (props.rarity === 1) {
    columns = columns.slice(0, columns.length - 2);
  }

  return (
    <Table columns={columns} dataSource={props.effects} divKey="type" pagination={false}></Table>
  );
};

const getEffectMark = (maxLevel) => {
  let ok = {
    1: "lv1",
    5: "lv5",
    10: "lv10",
    15: "lv15",
    20: "lv20",
    25: "lv25",
    30: "lv30",
    35: "lv35",
    40: "lv40",
  };
  if (maxLevel >= 45) {
    ok[45] = "lv45";
  }
  if (maxLevel === 50) {
    ok[50] = "lv50";
  }
  return ok;
};

class TestEffectTable extends React.Component {
  constructor(props) {
    super(props);
    this.effects = db.get("effects").value();
    let maxLevel = 1;
    switch (props.rarity) {
      case 1:
        maxLevel = 40;
        break;
      case 2:
        maxLevel = 45;
        break;
      case 3:
        maxLevel = 50;
        break;
      default:
        maxLevel = 1;
    }

    this.maxLevel = maxLevel;
    this.state = {
      selectingLevel: maxLevel,
    };
  }

  calc(data, input) {
    let nodes = [];
    let output = 0;
    const maxLevel = this.maxLevel;
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
  }

  render() {
    return (
      <div>
        {this.props.unique_effect && (
          <>
            <div className="flex w-full items-center justify-between p-2">
              <div>{t("固有效果")}</div>
              <div>{`${t("激活等级")}:${this.props.unique_effect.lv}`}</div>
            </div>
            <div className="w-full grid grid-cols-2 gap-2">
              {["0", "1"].map((index) => (
                <div
                  key={index}
                  className="col-span-1 flex items-center rounded-xl border border-solid bg-green-300 border-green-500"
                >
                  <div
                    className="flex-auto truncate pl-2"
                    data-tip={`<div><p>${
                      this.effects[this.props.unique_effect[`type_${index}`]].name
                    }</p><p>${t(
                      this.effects[this.props.unique_effect[`type_${index}`]].name
                    )}</p><p>${
                      this.effects[this.props.unique_effect[`type_${index}`]].description
                    }</p><p>${t(
                      this.effects[this.props.unique_effect[`type_${index}`]].description
                    )}</p></div>`}
                  >
                    {t(this.effects[this.props.unique_effect[`type_${index}`]].name)}
                  </div>
                  <div className="bg-white h-full w-10 md:w-24 rounded-r-xl pl-2 flex items-center flex-shrink-0">
                    {this.props.unique_effect[`value_${index}`]}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="w-full flex items-center">
          <div className="mr-2">{t("设置等级")}</div>
          <Slider
            className="flex-auto"
            min={1}
            max={this.maxLevel}
            value={this.state.selectingLevel}
            onChange={(value) => {
              this.setState({ selectingLevel: value });
            }}
            marks={getEffectMark(this.maxLevel)}
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          {this.props.effects?.map((item, index) => {
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
              <div className="col-span-1 flex items-center rounded-xl border border-solid bg-green-300 border-green-500">
                <div
                  className="flex-auto truncate pl-2"
                  data-tip={`<div><p>${this.effects[item.type].name}</p><p>${t(
                    this.effects[item.type].name
                  )}</p><p>${this.effects[item.type].description}</p><p>${t(
                    this.effects[item.type].description
                  )}</p></div>`}
                >
                  {t(this.effects[item.type].name)}
                </div>
                <div className="bg-white h-full w-10 md:w-24 rounded-r-xl pl-2 flex items-center flex-shrink-0">
                  {this.calc(data, this.state.selectingLevel)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export { EffectTable, TestEffectTable };
