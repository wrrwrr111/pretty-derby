// PlayerList.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PlayerCard from "./PlayerCard";
import PlayerDetail from "./PlayerDetail";
import List from "@/components/common/List";
import useUa from "@/hooks/useUa";

interface PlayerListProps {
  className?: string;
  dataList: PlayerList;
  onClick?: (player: Player) => void;
  sortFlag?: boolean;
}

const PlayerList: React.FC<PlayerListProps> = ({
  className,
  dataList,
  onClick,
  sortFlag = false,
}) => {
  const ua = useUa();
  const navigate = useNavigate();

  const sort = {
    key: "rare",
    data: [
      { value: "3", title: "3星" },
      { value: "2", title: "2星" },
      { value: "1", title: "1星" },
    ],
  };

  const handleClick = (player: Player) => {
    if (onClick) {
      onClick(player);
    } else if (ua.isPhone) {
      navigate(`/player-detail/${player.id}`);
    }
    return false;
  };

  return (
    <List
      className={className}
      listKey="players"
      dataList={dataList}
      sort={sortFlag ? sort : undefined}
      itemRender={(data, setCur) => (
        <div key={`player_${data.id}`} className="w-24 max-w-1/4 p-1">
          <PlayerCard data={data} onClick={() => handleClick(data) || setCur(data)} />
        </div>
      )}
      itemClass="w-24 max-w-1/4"
      detailRender={(data) => data && <PlayerDetail data={data} isNur={false} />}
    />
  );
};

export default PlayerList;
