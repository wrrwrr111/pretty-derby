import React, { useState } from "react";
import { useHistory } from "react-router";
import SupportCard from "./SupportCard";
import SupportDetail from "./SupportDetail";
import List from "../common/List";
import useUa from "../../utils/ua";
const PlayerList = ({ dataList, onClick, sortFlag = false, ownList }) => {
  const ua = useUa();
  const history = useHistory();
  const sort = sortFlag
    ? {
        key: "rarity",
        data: [
          { value: 3, title: "SSR" },
          { value: 2, title: "SR" },
          { value: 1, title: "R" },
        ],
      }
    : null;
  return (
    <List
    className="justify-between"
      listKey="supports"
      dataList={dataList}
      sort={sort}
      onClick={onClick}
      itemRender={(data, setCur) => (
        <SupportCard
          className={`w-20 mr-1 mb-1 ${
            ownList?.length && !ownList?.includes(data.id) && "un-chosen-card"
          }`}
          data={data}
          onClick={() =>
            onClick
              ? onClick(data)
              : ua.isPhone
              ? history.push(`/support-detail/${data.id}`)
              : setCur(data)
          }
        />
      )}
      detailRender={(data) => <SupportDetail data={data} isNur={false} />}
    ></List>
  );
};

export default PlayerList;
