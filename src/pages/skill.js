import React, { useState } from "react";
import { Divider, div, Col } from "antd";
import { useDidRecover } from "react-router-cache-route";
import db from "../db.js";
import t from "../components/t.js";

// import { SkillButton, SkillCheckbox } from '../components/skill-detail.js'
import SkillList from "../components/skill/SkillList";
import SkillCheckbox from "../components/skill/SkillCheckbox";
const TITLE = "技能 - 乌拉拉大胜利 - 赛马娘资料站";

const Skill = (props) => {
  document.title = TITLE;
  useDidRecover(() => {
    document.title = TITLE;
  });
  // 所有技能列表
  const allSkillList = db.get("skills").orderBy("db_id").value();

  const [skillList, setSkillList] = useState(allSkillList);

  // init supportMode
  localStorage.getItem("supportMode") === null && localStorage.setItem("supportMode", 0);

  const onSkillCheckboxUpdate = (skillList) => {
    console.log(skillList);
    setSkillList(skillList);
  };

  return (
    <>
      <div className="w-1/4 h-full flex flex-col p-1">
        <div className="w-full rounded m-1 h-12 flex items-center justify-center bg-blue-400 text-gray-100 text-xl font-semibold flex-shrink-0">
          {t("筛选")}
        </div>
        <div className="overflow-y-auto flex-auto flex flex-col">
          <SkillCheckbox onUpdate={onSkillCheckboxUpdate}></SkillCheckbox>
        </div>
      </div>
      <div className="w-3/4 flex flex-col p-1">
        <div className="w-full rounded m-1 h-12 flex items-center justify-center bg-blue-400 text-gray-100 text-xl font-semibold flex-shrink-0">
          {t("技能列表")}
        </div>
        <div className=" overflow-y-scroll overflow-x-hidden pl-4 w-full h-full flex flex-wrap">
          <SkillList dataList={skillList} sortFlag={true} />
        </div>
      </div>
      <div className="col-span-1 rounded m-1 h-12 flex items-center justify-center bg-blue-400 text-gray-100 text-xl font-semibold "></div>
    </>
  );
};

export default Skill;
