import React from "react";
import { useRouter } from "next/router.js";
import SkillDetail from "/components/skill/SkillDetail.js";

// const TITLE = "技能 - 乌拉拉大胜利 - 赛马娘资料站";
const SkillDetailPage = (props) => {
  const router = useRouter();
  const id = router.query?.id;
  return <SkillDetail id={id} />;
};

export default SkillDetailPage;
