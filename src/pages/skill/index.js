import React, { useState } from "react";
import { useDidRecover } from "react-router-cache-route";

import db from "@/db.js";
import t from "@/components/t.js";
import Layout from "@/components/common/Layout";
import SkillList from "@/components/skill/SkillList";
import SkillCheckbox from "@/components/skill/SkillCheckbox";

const TITLE = "技能 - 乌拉拉大胜利 - 赛马娘资料站";

const Skill = (props) => {
  document.title = TITLE;
  useDidRecover(() => {
    document.title = TITLE;
  });
  // 所有技能列表
  const { listHeight } = props
  const allSkillList = db.get("skills").orderBy("db_id").value();

  const [skillList, setSkillList] = useState(allSkillList);

  // init supportMode
  localStorage.getItem("supportMode") === null && localStorage.setItem("supportMode", 0);

  const onSkillCheckboxUpdate = (skillList) => {
    setSkillList(skillList);
  };

  return (
    <Layout
      rootClass={"w-screen h-screen flex flex-col relative"}
      contentClass={"flex flex-auto w-full flex-wrap max-w-6xl mx-auto overflow-hidden relative"}
    >
      <div className="w-1/4 h-full flex flex-col p-1 overflow-hidden">
        <div className="w-full rounded h-12 flex items-center justify-center bg-blue-400 text-gray-100 text-xl font-semibold flex-shrink-0">
          {t("筛选")}
        </div>
        <div className=" overflow-y-scroll overflow-x-hidden w-full flex-auto flex flex-wrap"
          style={listHeight && { height: listHeight }}>
          <SkillCheckbox onUpdate={onSkillCheckboxUpdate}></SkillCheckbox>
        </div>
      </div>
      <div className="w-3/4 h-full flex flex-col p-1 overflow-hidden">
        <div className="w-full rounded h-12 flex items-center justify-center bg-blue-400 text-gray-100 text-xl font-semibold flex-shrink-0">
          {t("技能列表")}
        </div>
        <div className=" overflow-y-scroll overflow-x-hidden w-full flex-auto flex flex-wrap"
          style={listHeight && { height: listHeight }}>
          <SkillList dataList={skillList} sortFlag={true} />
        </div>
      </div>
      <div className="col-span-1 rounded m-1 h-12 flex items-center justify-center bg-blue-400 text-gray-100 text-xl font-semibold "></div>
    </Layout>
  );
};

export default Skill;
