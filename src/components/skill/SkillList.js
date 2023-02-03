import React from "react";
import SkillCard from "./SkillCard";
import SkillDetail, { skillDetailIdAtom } from "./SkillDetail";
import List from "../common/List";
import { useAtom, useSetAtom } from "jotai";
import { skillsAtom } from "../../hooks/atoms";
const SkillList = ({
  className,
  idList = [],
  dataList,
  onClick,
  sortFlag = false,
  size = "medium",
}) => {
  const [skills] = useAtom(skillsAtom);
  const setSkillDetailId = useSetAtom(skillDetailIdAtom);
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
      dataList={dataList || skills.filter((item) => idList.includes(item.id))}
      sort={sortFlag && sort}
      itemRender={(data, setCur) => (
        <div
          key={data.id}
          className={`${size === "medium" && "h-8 w-1/3 p-1 md:w-[unset] md:max-w-none md:p-2"} ${
            size === "small" && "h-6 p-1"
          }`}
        >
          <SkillCard
            className={"md:px-1 "}
            data={data}
            onClick={
              () => {
                setSkillDetailId(data.id);
                onClick ? onClick(data) : setCur(data);
              }
              // ua.isPhone
              // ? history.push(`/skill-detail/${data.id}`)
              // : setCur(data)
            }
          />
        </div>
      )}
      detailRender={(data) => <SkillDetail data={data} isNur={false} />}
    />
  );
};

export default SkillList;
