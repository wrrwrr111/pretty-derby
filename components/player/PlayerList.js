import React from "react";
import PlayerCard from "./PlayerCard";
import PlayerDetail from "./PlayerDetail";
import List from "../common/List";
import useUa from "/hooks/useUa";
import { useRouter } from "next/router";
const PlayerList = ({ className, dataList, onClick, sortFlag = false }) => {
  const ua = useUa();
  const router = useRouter();
  const sort = {
    key: "rare",
    data: [
      { value: "3", title: "3星" },
      { value: "2", title: "2星" },
      { value: "1", title: "1星" },
    ],
  };
  return (
    <List
      className={className}
      listKey="players"
      dataList={dataList}
      sort={sortFlag && sort}
      itemRender={(data, setCur) => (
        <div key={`player_${data.id}`} className="w-24 max-w-1/4 p-1">
          <PlayerCard
            className=""
            data={data}
            onClick={() =>
              onClick
                ? onClick(data)
                : ua.isPhone
                ? router.push(`/player/${data.id}`)
                : setCur(data)
            }
          />
        </div>
      )}
      itemClass="w-24 max-w-1/4 "
      detailRender={(data) => <PlayerDetail data={data} isNur={false} />}
      // detailModalSize='regular'
    />
  );
};

export default PlayerList;
