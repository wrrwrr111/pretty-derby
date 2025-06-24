import React from "react";
import { Table, Row, Rate } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Smile, Frown, Copy, Delete } from "lucide-react";
import { message } from "antd";
import PlayerImage from "./PlayerImage";
import SupportImage from "./SupportImage";
import { SEED_BLUE_LABELS, SEED_RED_LABELS } from "@/config";

const SeedTable = ({ data, total, onChange, onLike, onDislike, onDelete, userId }) => {
  const columns = [
    {
      title: "玩家id",
      dataIndex: "gameId",
      key: "gameId",
      render: (text, seed) => (
        <>
          <Row>
            <p>{text}</p>
            <CopyToClipboard text={text} onCopy={() => message.info("成功")}>
              <Copy />
            </CopyToClipboard>
          </Row>
          <Row align="middle">
            <Smile onClick={() => onLike(seed)} />
            <p>{seed.likes}</p>
          </Row>
          <Row align="middle">
            <Frown onClick={() => onDislike(seed)} />
            <p>{seed.dislikes}</p>
          </Row>
          {seed.userId === userId && (
            <Row align="middle">
              <Delete onClick={() => onDelete(seed)} />
            </Row>
          )}
        </>
      ),
    },
    {
      title: "主要",
      dataIndex: "playerId0",
      key: "playerId0",
      render: (text) => <PlayerImage id={text} />,
    },
    {
      title: "蓝色因子",
      dataIndex: "blue0",
      key: "blue0",
      render: (text, record) => (
        <span className="rate-label">{`${SEED_BLUE_LABELS[text]}\xa0\xa0${record.blueLevel0}`}</span>
      ),
    },
    {
      title: "红色因子",
      dataIndex: "red0",
      key: "red0",
      render: (text, record) => (
        <span className="rate-label">{`${SEED_RED_LABELS[text]}\xa0\xa0${record.redLevel0}`}</span>
      ),
    },
    {
      title: "绿色因子",
      dataIndex: "greenLevel0",
      key: "greenLevel0",
      render: (text) => <span className="rate-label">{`固有\xa0\xa0${text}`}</span>,
    },
    {
      title: "URA",
      dataIndex: "uraLevel0",
      key: "uraLevel0",
      render: (text) => <span className="rate-label">{text ? `URA  ${text}` : ""}</span>,
    },
    {
      title: "父辈1",
      dataIndex: "playerId1",
      key: "playerId1",
      render: (text) => <PlayerImage id={text} />,
    },
    {
      title: "父辈2",
      dataIndex: "playerId2",
      key: "playerId2",
      render: (text) => <PlayerImage id={text} />,
    },
    {
      title: "总计蓝色",
      key: "allBlue",
      render: (_, record) =>
        Object.keys(SEED_BLUE_LABELS).map((key) =>
          record[key] ? (
            <span key={key} className="rate-label">
              {`${SEED_BLUE_LABELS[key]}\xa0\xa0${record[key]}`}
            </span>
          ) : null
        ),
    },
    {
      title: "总计红色",
      key: "allRed",
      render: (_, record) =>
        Object.keys(SEED_RED_LABELS).map((key) =>
          record[key] ? (
            <span key={key} className="rate-label">
              {`${SEED_RED_LABELS[key]}\xa0\xa0${record[key]}`}
            </span>
          ) : null
        ),
    },
    { title: "总计URA", dataIndex: "uraLevel", key: "uraLevel" },
    { title: "总计白色", dataIndex: "white", key: "white" },
    {
      title: "支援卡",
      dataIndex: "supportId",
      key: "supportId",
      render: (text) => <SupportImage id={text} />,
    },
    {
      title: "突破等级",
      dataIndex: "supportLevel",
      key: "supportLevel",
      render: (text) => (
        <Row>
          <Rate count={4} value={text} disabled />
        </Row>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{
        pageSize: 10,
        total,
        simple: true,
        showQuickJumper: false,
        position: ["topRight", "bottomRight"],
      }}
      rowKey="id"
    />
  );
};

export default SeedTable;
