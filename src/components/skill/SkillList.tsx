"use client";

import SkillCard from "./SkillCard";
import SkillDetail from "./SkillDetail";
import List from "../common/List";

const SkillList = ({
  className,
  idList,
  dataList,
  onClick,
  sortFlag = false,
  size = "medium",
}) => {
  const sort = {
    key: "rare",
    data: [
      { value: "ノーマル", title: "普通", func: (d) => d.rare === "ノーマル" },
      { value: "レア", title: "金色 稀有", func: (d) => d.rare === "レア" },
      { value: "固有", title: "独特", func: (d) => d.rare === "固有" },
    ],
  };

  return (
    <List
      className={className}
      listKey="skills"
      idList={idList}
      dataList={dataList}
      sort={sortFlag && sort}
      itemRender={(data, setCur) => (
        <div
          key={data.id}
          className={
            size === "medium"
              ? "md:w-unset h-8 w-1/3 p-1 md:max-w-none md:p-2"
              : "h-6 p-1"
          }
        >
          <SkillCard
            className="md:px-1"
            data={data}
            onClick={() => (onClick ? onClick(data) : setCur(data))}
          />
        </div>
      )}
      detailRender={(data) => <SkillDetail data={data} isNur={false} />}
    />
  );
};

export default SkillList;
