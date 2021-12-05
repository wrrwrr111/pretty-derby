import React from "react";
import { useHistory } from "react-router";
import PlayerCard from "./PlayerCard";
import PlayerDetail from "./PlayerDetail";
import List from "../common/List";
import useUa from "../../utils/ua";
const PlayerList = ({ dataList, onClick, sortFlag = false }) => {
  const ua = useUa();
  const history = useHistory();
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
      className="justify-between"
      listKey="players"
      dataList={dataList}
      sort={sortFlag && sort}
      onClick={onClick}
      itemRender={(data, setCur) => (
        <PlayerCard
          className="w-20 mr-1 mb-1"
          data={data}
          onClick={() =>
            onClick
              ? onClick(data)
              : ua.isPhone
              ? history.push(`/player-detail/${data.id}`)
              : setCur(data)
          }
        />
      )}
      detailRender={(data) => <PlayerDetail data={data} isNur={false} />}
    ></List>
  );
};

export default PlayerList;
