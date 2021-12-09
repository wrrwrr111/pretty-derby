import React from "react";

import db from "../../db.js";
import dbL from "../../dbL.js";
import t from "../t.js";

import EventCard from "./EventCard";
import EventDetail from "./EventDetail";
import List from "../common/List";

const EventList = ({ dataList, idList, onClick, sortFlag = false, type = "all" }) => {
  const sort = sortFlag
    ? {
      data: [
        { title: "切れ者", func: (data) => JSON.stringify(data)?.indexOf("切れ者") !== -1 },
        { title: "有选项", func: (data) => data?.choiceList.length > 1 },
        { title: "无选项", func: (data) => data?.choiceList.length <= 1 },
      ],
    }
    : null;
  const filterFunc =
    type === "multi"
      ? (data) => {
        return data?.choiceList.length > 1;
      }
      : null;
  return (
    <List
      listKey="events"
      dataList={dataList}
      idList={idList}
      sort={sort}
      filterFunc={filterFunc}
      onClick={onClick}
      className=''
      itemRender={(item, setCur) => (
        <EventCard
          className="mr-1 mb-1"
          data={item}
          onClick={() => (onClick ? onClick(item) : setCur(item))}
        />
      )}
      detailRender={(item) => <EventDetail data={item} isNur={false} />}
    ></List>
  );
};

export default EventList;
