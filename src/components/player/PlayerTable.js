import { Table } from "antd";
import Card from "../common/Card.js";
import { useTranslation } from "react-i18next";
import {
  PLAYER_ADAPT_FILTERS,
  PLAYER_GROW_FILTERS,
  PLAYER_RARITIES,
  PLAYER_ADAPT_TITLES,
} from "src/config";

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
const PlayerTable = (props) => {
  const { t } = useTranslation();

  const getColumn = (text, type) => {
    if (type === "adapt") {
      return {
        title: t(text),
        dataIndex: PLAYER_ADAPT_TITLES[text],
        key: PLAYER_ADAPT_TITLES[text],
        width: 80,
        render: (value) => coloredGradeText(value),
        filters: PLAYER_ADAPT_FILTERS,
        onFilter: (value, record) => record[PLAYER_ADAPT_TITLES[text]] === value,
      };
    } else if (type === "grow") {
      return {
        title: t(text),
        dataIndex: PLAYER_ADAPT_TITLES[text],
        key: PLAYER_ADAPT_TITLES[text],
        width: 100,
        render: (value) => coloredGradeText(value),
        filters: PLAYER_GROW_FILTERS,
        onFilter: (value, record) => record[PLAYER_ADAPT_TITLES[text]] === value,
      };
    }
  };
  const columns = [
    {
      title: "角色",
      dataIndex: "imgUrl",
      key: "imgUrl",
      width: 100,
      render: (text, record) => <Card data={record} onSelect={props.onSelect} name={false}></Card>,
    },
    { title: "称号", dataIndex: "name", key: "name", render: (value) => t(value) },
    { title: "角色名", dataIndex: "charaName", key: "charaName", render: (value) => t(value) },
    { title: "稀有度", dataIndex: "rare", key: "rare", render: (value) => PLAYER_RARITIES[value] },
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
