import React, { useState } from "react";
import { Table } from "antd";
import { useDidRecover } from "react-router-cache-route";
import { useTranslation } from "react-i18next";
import { useDB } from "../../hooks/index";
const TITLE = "比赛 - 乌拉拉大胜利 - 赛马娘资料站";

const filterList = {
  class: [
    { text: "初等/ジュニア", value: "ジュニア" },
    { text: "经典/クラシック", value: "クラシック" },
    { text: "经典&高级/クラシックシニア", value: "クラシックシニア" },
    { text: "高级/シニア", value: "シニア" },
  ],
  grade: [
    { text: "Pre-OP", value: "Pre-OP" },
    { text: "OP", value: "OP" },
    { text: "G1", value: "G1" },
    { text: "G2", value: "G2" },
    { text: "G3", value: "G3" },
  ],
  place: [
    { text: "中京", value: "中京" },
    { text: "函館", value: "函館" },
    { text: "札幌", value: "札幌" },
    { text: "小倉", value: "小倉" },
    { text: "新潟", value: "新潟" },
    { text: "阪神", value: "阪神" },
    { text: "中山", value: "中山" },
    { text: "京都", value: "京都" },
    { text: "東京", value: "東京" },
    { text: "福島", value: "福島" },
    { text: "大井", value: "大井" },
  ],
  ground: [
    { text: "芝", value: "芝" },
    { text: "ダート", value: "ダート" },
  ],
  distanceType: [
    { text: "短距離", value: "短距離" },
    { text: "マイル", value: "マイル" },
    { text: "中距離", value: "中距離" },
    { text: "長距離", value: "長距離" },
  ],
  direction: [
    { text: "左", value: "左" },
    { text: "右", value: "右" },
    { text: "直", value: "直" },
  ],
  side: [
    { text: "空", value: null },
    { text: "内", value: "内" },
    { text: "外", value: "外" },
    { text: "線", value: "線" },
  ],
};
const labels = [
  "name",
  "date",
  "class",
  "grade",
  "place",
  "ground",
  "distance",
  "distanceType",
  "direction",
  "side",
];
const labelTextDict = {
  name: "名称",
  date: "时间",
  class: "年级",
  grade: "赛事等级",
  place: "地点",
  ground: "场地",
  distance: "长度",
  distanceType: "赛程",
  direction: "方向",
  side: "赛道",
};
const mediumLabels = ["name", "date", "class", "grade", "ground", "distanceType"];

const Race = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { t } = useTranslation();
  const db = useDB();

  document.title = TITLE;
  useDidRecover(() => {
    document.title = TITLE;
  });
  const useViewport = () => {
    // const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);
    React.useEffect(() => {
      const handleWindowResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return { height };
  };

  const dynamicTableHeight = useViewport().height - 168;
  const getColumns = (labels) => {
    return labels.map((label) => {
      if (filterList["class"]) {
        return {
          title: t(labelTextDict[label]),
          dataIndex: label,
          filters: filterList[label],
          width: 100,
          fixed: label === "name" ? "left" : null,
          onFilter: (value, record) => record[label] === value,
        };
      } else {
        return {
          fixed: label === "name" ? "left" : null,
          title: t(labelTextDict[label]),
          dataIndex: label,
        };
      }
    });
  };
  if (!db) return null;

  const allRaceList = db
    .get("races")
    .value()
    .map((race, index) => {
      race.key = index;
      return race;
    });
  let columns = getColumns(labels);
  if (props.type === "medium") {
    columns = getColumns(mediumLabels);
  }
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    let selected = {};
    for (let race of selectedRows) {
      if (selected[race.dateNum]) {
        selected[race.dateNum].push(race.id);
      } else {
        selected[race.dateNum] = [race.id];
      }
    }
    props.onSelect(selected);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // 筛选发生变化时清空已经选择的内容
  const onChange = (pagination, filters, sorter, extra) => {
    props.onSelect([]);
    setSelectedRowKeys([]);
  };
  return (
    <div className={"w-full overflow-x-auto"}>
      <Table
        rowSelection={props.onSelect ? rowSelection : null}
        columns={columns}
        dataSource={allRaceList}
        onChange={onChange}
        pagination={false}
        scroll={{ y: dynamicTableHeight }}
      />
    </div>
  );
};

export default Race;
