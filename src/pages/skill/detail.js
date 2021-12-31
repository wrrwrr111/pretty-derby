import React from "react";
import { useDidRecover } from "react-router-cache-route";
import Layout from "../../components/common/Layout.js";
import SkillDetail from "../../components/skill/SkillDetail.js";

const TITLE = "技能 - 乌拉拉大胜利 - 赛马娘资料站";
const SkillDetailPage = (props) => {
  const id = props.match?.params?.id;
  document.title = TITLE;
  useDidRecover(() => {
    document.title = TITLE;
  });
  return (
    <SkillDetail id={id} />
  );
};

export default SkillDetailPage;
