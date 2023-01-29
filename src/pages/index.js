// const TITLE = "角色 - 乌拉拉大胜利 - 赛马娘资料站";
import { PlayerList } from "../components/player/PlayerList";
import { useAtom } from "jotai";
import { playersAtom } from "../hooks/atoms/playersAtom";
//todo filter
const Player = (props) => {
  const [players] = useAtom(playersAtom);
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
