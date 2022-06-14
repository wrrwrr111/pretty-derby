import React from "react";
import { useDidRecover } from "react-router-cache-route";
import PlayerDetail from "../../components/player/PlayerDetail.js";

const TITLE = "角色 - 乌拉拉大胜利 - 赛马娘资料站";
const PlayerDetailPage = (props) => {
  const id = props.match?.params?.id;
  document.title = TITLE;
  useDidRecover(() => {
    document.title = TITLE;
  });
  return (
    <div className="flex flex-auto w-full flex-wrap max-w-6xl mx-auto">
      <PlayerDetail id={id} />
    </div>
  );
};

export default PlayerDetailPage;
