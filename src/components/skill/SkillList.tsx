// SkillList.tsx
import React from "react";
import SkillCard from "./SkillCard";
import SkillDetail from "./SkillDetail";
import List from "@/components/common/List";

interface SkillListProps {
  className?: string;
  idList?: string[];
  dataList?: Skill[];
  onClick?: (skill: Skill) => void;
  sortFlag?: boolean;
  size?: "small" | "medium";
}

const SkillList: React.FC<SkillListProps> = ({
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
      { value: "ノーマル", title: "普通" },
      { value: "レア", title: "金色 稀有" },
      { value: "固有", title: "独特" },
    ],
  };

  const getItemClassName = () => {
    switch (size) {
      case "medium":
        return "w-1/3 md:max-w-none md:w-unset h-8 p-1 md:p-2";
      case "small":
        return "h-6 p-1";
      default:
        return "";
    }
  };

  return (
    <List
      className={className}
      listKey="skills"
      idList={idList}
      dataList={dataList}
      sort={sortFlag ? sort : undefined}
      itemRender={(data, setCur) => (
        <div key={data.id} className={getItemClassName()}>
          <SkillCard
            className="md:px-1"
            data={data}
            onClick={() => (onClick ? onClick(data) : setCur(data))}
          />
        </div>
      )}
      detailRender={(data) => data && <SkillDetail data={data} isNur={false} />}
    />
  );
};

export default SkillList;
