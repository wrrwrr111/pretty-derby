import React from "react";
import PlayerCard from "./PlayerCard";
import PlayerDetail from "./PlayerDetail";
import List from "../common/List";
import useUa from "src/hooks/useUa";
import { useRouter } from "next/router";
import { playersAtom } from "../../hooks/atoms";
import { useAtom } from "jotai";
export const PlayerList = ({ className, dataList, onClick, sortFlag = false }) => {
  const [players] = useAtom(playersAtom);
  const list = dataList || players;
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
      dataList={list}
      sort={sortFlag && sort}
      itemRender={(data, setCur) => (
        <div key={`player_${data.id}`} className="max-w-1/4 w-24 p-1">
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
