import db from "../../db.js";
import t from "../t.js";
import { Table } from "antd";
import Card from "../common/Card.js";
const PlayerTable = (props) => {
  const adaptFilters = [
    { text: "A", value: "A" },
    { text: "B", value: "B" },
    { text: "C", value: "C" },
    { text: "D", value: "D" },
    { text: "E", value: "E" },
    { text: "F", value: "F" },
    { text: "G", value: "G" },
  ];
  const growFilters = [
    { text: "20%", value: "+20%" },
    { text: "10%", value: "+10%" },
    { text: "0%", value: "+0%" },
  ];
  const rares = {
    1: "R",
    2: "SR",
    3: "SSR",
  };
  const titles = {
    芝: "grass",
    ダート: "dirt",
    短距離: "shortDistance",
    マイル: "mile",
    中距離: "mediumDistance",
    長距離: "longDistance",
    逃げ: "escape",
    先行: "leading",
    差し: "insert",
    追込: "tracking",
    スピード: "speedGrow",
    スタミナ: "staminaGrow",
    パワー: "powerGrow",
    根性: "gutsGrow",
    賢さ: "wisdomGrow",
  };
  const getColumn = (text, type) => {
    if (type === "adapt") {
      return {
        title: t(text),
        dataIndex: titles[text],
        key: titles[text],
        width: 80,
        render: (value) => coloredGradeText(value),
        filters: adaptFilters,
        onFilter: (value, record) => record[titles[text]] === value,
      };
    } else if (type === "grow") {
      return {
        title: t(text),
        dataIndex: titles[text],
        key: titles[text],
        width: 100,
        render: (value) => coloredGradeText(value),
        filters: growFilters,
        onFilter: (value, record) => record[titles[text]] === value,
      };
    }
  };
  const columns = [
    {
      title: "角色",
      dataIndex: "imgUrl",
      key: "imgUrl",
      width: 100,
      render: (text, record) => (
        <Card data={record} onSelect={props.onSelect} name={false}></Card>
      ),
    },
    { title: "称号", dataIndex: "name", key: "name", render: (value) => t(value) },
    { title: "角色名", dataIndex: "charaName", key: "charaName", render: (value) => t(value) },
    { title: "稀有度", dataIndex: "rare", key: "rare", render: (value) => rares[value] },
    getColumn("芝", "adapt"),
    getColumn("ダート", "adapt"),
    getColumn("短距離", "adapt"),
    getColumn("マイル", "adapt"),
    getColumn("中距離", "adapt"),
    getColumn("長距離", "adapt"),
    getColumn("逃げ", "adapt"),
    getColumn("先行", "adapt"),
    getColumn("差し", "adapt"),
    getColumn("追込", "adapt"),
    getColumn("スピード", "grow"),
    getColumn("スタミナ", "grow"),
    getColumn("パワー", "grow"),
    getColumn("根性", "grow"),
    getColumn("賢さ", "grow"),
  ];

  return (
    <Table
      columns={columns}
      dataSource={props.list.sort((a, b) => b.rare - a.rare)}
      pagination={false}
      rowKey={"id"}
      scroll={{ y: window.innerHeight - 200 }}
    />
  );
};

export default PlayerTable;
