import React from "react";
import SkillCard from "./SkillCard";
import SkillDetail from "./SkillDetail";
import List from "@/components/common/List";
const SkillList = ({ className, idList, dataList, onClick, sortFlag = false, size = "medium" }) => {
  const sort = {
    key: "rare",
    data: [
      { value: "ノーマル", title: "普通" },
      { value: "レア", title: "金色 稀有" },
      { value: "固有", title: "独特" },
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
          className={`${size === "medium" && "w-1/3 md:max-w-none md:w-unset h-8 p-1 md:p-2"} ${
            size === "small" && "h-6 p-1"
          }`}
        >
          <SkillCard
            className={"md:px-1 "}
            data={data}
            onClick={
              () => (onClick ? onClick(data) : setCur(data))
            }
          />
        </div>
      )}
      detailRender={(data) => <SkillDetail data={data} isNur={false} />}
      // detailModalSize='regular'
    />
  );
};

export default SkillList;
