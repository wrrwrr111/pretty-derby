import React from "react";
import { useRouter } from "next/router";
import PlayerDetail from "src/components/player/PlayerDetail";
import dbJSON from "src/assert/db.json";
// const TITLE = "角色 - 乌拉拉大胜利 - 赛马娘资料站";
const PlayerDetailPage = ({ data }) => {
  const router = useRouter();
  const nur = router?.query?.nur || false;
  return (
    <div className="flex flex-auto w-full flex-wrap max-w-6xl mx-auto">
      <PlayerDetail data={data} isNur={Boolean(nur)} />
    </div>
  );
};

export const getStaticProps = ({ params }) => {
  const { id } = params;
  return {
    props: {
      data: dbJSON.players.find((item) => item.id === id),
    },
  };
};

export const getStaticPaths = async () => {
  const paths = dbJSON.players.map((item) => {
    return {
      params: {
        id: item.id,
      },
    };
  });
  return { paths, fallback: true };
};

export default PlayerDetailPage;
