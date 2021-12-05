import React, { useState, useEffect } from "react";
import db from "../db.js";
import t from "../components/t.js";

import PlayerList from "../components/player/PlayerList.js";
// todo 提取出来
// const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/public/'

const TITLE = "角色 - 乌拉拉大胜利 - 赛马娘资料站";

//todo filter
const Player = (props) => {

  document.title = TITLE;
  return (
    <div className="flex w-full flex-wrap max-w-6xl mx-auto">
      <PlayerList sortFlag={true} onClick={props.onClick}/>
    </div>
  );
};

export default Player;
