import React from "react";
import PlayerList from "components/player/PlayerList";
import { useAppContext } from "context/state";
// const TITLE = "角色 - 乌拉拉大胜利 - 赛马娘资料站";

//todo filter
const Player = (props) => {
  const { players } = useAppContext();
  return (
    <div className="container mx-auto flex-auto">
      <PlayerList
        className="justify-between"
        dataList={players}
        sortFlag={true}
        onClick={props.onClick}
      />
    </div>
  );
};

export default Player;
