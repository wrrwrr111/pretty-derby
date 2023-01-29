import React from "react";
import { useRouter } from "next/router";
import SkillDetail from "src/components/skill/SkillDetail";
import dbJSON from "src/assert/db.json";
// const TITLE = "技能 - 乌拉拉大胜利 - 赛马娘资料站";
const SkillDetailPage = ({ data }) => {
  const router = useRouter();
  const nur = router?.query?.nur || false;
  return <SkillDetail data={data} isNur={Boolean(nur)} />;
};
export const getStaticProps = ({ params }) => {
  const { id } = params;
  return {
    props: {
      data: dbJSON.skills.find((item) => item.id === id),
    },
  };
};

export const getStaticPaths = async () => {
  const paths = dbJSON.skills.map((item) => {
    return {
      params: {
        id: item.id,
      },
    };
  });
  return { paths, fallback: true };
};
export default SkillDetailPage;
