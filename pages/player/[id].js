import React from "react";
import { useRouter } from "next/router.js";
import PlayerDetail from "/components/player/PlayerDetail.js";

// const TITLE = "角色 - 乌拉拉大胜利 - 赛马娘资料站";
const PlayerDetailPage = () => {
  const router = useRouter();
  const id = router.query?.id;
  return (
    <div className="flex flex-auto w-full flex-wrap max-w-6xl mx-auto">
      <PlayerDetail id={id} />
    </div>
  );
};

export default PlayerDetailPage;
