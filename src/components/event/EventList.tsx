// components/event/EventList.tsx
"use client";

import React from "react";
import { EventCard } from "./EventCard";
import EventDetail from "./EventDetail";
import List from "../common/List";

interface EventListProps {
  dataList: any[];
  idList: string[];
  onClick?: (item: any) => void;
  sortFlag?: boolean;
  type?: "all" | "multi";
}

export default function EventList({
  dataList,
  onClick,
  sortFlag = false,
  type = "all",
}: EventListProps) {
  const sort = sortFlag
    ? {
        data: [
          {
            title: "切れ者",
            func: (data: any) => JSON.stringify(data)?.includes("切れ者"),
          },
          {
            title: "有选项",
            func: (data: any) => data?.choiceList.length > 1,
          },
          {
            title: "无选项",
            func: (data: any) => data?.choiceList.length <= 1,
          },
        ],
      }
    : null;

  const filterFunc =
    type === "multi"
      ? (data: any) => data?.choiceList.length > 1
      : undefined;

  return (
    <List
      listKey="events"
      dataList={dataList}
      sort={sort}
      filterFunc={filterFunc}
      onClick={onClick}
      itemRender={(item, setCur) => (
        <EventCard
          data={item}
          className="mr-1 mb-1"
          onClick={() => (onClick ? onClick(item) : setCur(item))}
        />
      )}
      detailRender={(item) => <EventDetail data={item} />}
    />
  );
}
