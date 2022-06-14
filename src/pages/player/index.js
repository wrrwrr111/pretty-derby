import React from "react";
import { useDidRecover } from "react-router-cache-route";
import PlayerList from "../../components/player/PlayerList.js";

const TITLE = "角色 - 乌拉拉大胜利 - 赛马娘资料站";

//todo filter
const Player = (props) => {
  document.title = TITLE;
  useDidRecover(() => {
    document.title = TITLE;
  });
  return <PlayerList className="justify-between" sortFlag={true} onClick={props.onClick} />;
};

export default Player;
