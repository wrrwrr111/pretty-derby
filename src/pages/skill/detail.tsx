import React from "react";
import SkillDetail from "@/components/skill/SkillDetail";

const SkillDetailPage = (props) => {
  const id = props.match?.params?.id;

  return <SkillDetail id={id} page />;
};

export default SkillDetailPage;
