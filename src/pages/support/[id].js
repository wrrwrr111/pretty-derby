import React from "react";
import SupportDetail from "src/components/support/SupportDetail.js";
import dbJSON from "src/assert/db.json";
const SupportDetailPage = ({ data }) => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-auto flex-wrap">
      <Head>
        <title>{data.name} - 乌拉拉大胜利 - 赛马娘资料站</title>
      </Head>
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
