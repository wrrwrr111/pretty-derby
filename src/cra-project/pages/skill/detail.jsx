import React from "react";
import { useDidRecover } from "react-router-cache-route";
import SkillDetail from "../../components/skill/SkillDetail";

const SkillDetailPage = (props) => {
  const id = props.match?.params?.id;

  return <SkillDetail id={id} page />;
};

export default SkillDetailPage;
