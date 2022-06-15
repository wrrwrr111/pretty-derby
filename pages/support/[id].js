import React from "react";
// import { useRouter } from "next/router.js";
import SupportDetail from "components/support/SupportDetail.js";
import dbJSON from "src/assert/db.json";
// const TITLE = "支援 - 乌拉拉大胜利 - 赛马娘资料站";
const SupportDetailPage = ({ data }) => {
  return (
    <div className="flex flex-auto w-full flex-wrap max-w-6xl mx-auto">
      <SupportDetail data={data} />
    </div>
  );
};
export const getStaticProps = ({ params }) => {
  const { id } = params;
  return {
    props: {
      data: dbJSON.supports.find((item) => item.id === id),
    },
  };
};

export const getStaticPaths = async () => {
  const paths = dbJSON.supports.map((item) => {
    return {
      params: {
        id: item.id,
      },
    };
  });
  return { paths, fallback: true };
};
export default SupportDetailPage;
