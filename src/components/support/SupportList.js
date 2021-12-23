import React, { useState } from "react";
import { useHistory } from "react-router";
import SupportCard from "./SupportCard";
import SupportDetail from "./SupportDetail";
import List from "../common/List";
import useUa from "../../utils/ua";
const SupportList = ({ className, dataList, onClick, sortFlag = false, ownList }) => {
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
      className={className}
      listKey="supports"
      dataList={dataList}
      sort={sort}
      onClick={onClick}
      itemRender={(data, setCur) => (
        <div className='w-24 max-w-1/4 p-1'>
          <SupportCard
            className={`${ownList?.length && !ownList?.includes(data.id) && "un-chosen-card"}`}
            data={data}
            onClick={() =>
              onClick
                ? onClick(data)
                : ua.isPhone
                  ? history.push(`/support-detail/${data.id}`)
                  : setCur(data)
            }
          />
        </div>
      )}
      itemClass={'w-24 max-w-1/4'}
      detailRender={(data) => <SupportDetail data={data} isNur={false} />}
      // detailModalSize='regular'
    ></List>
  );
};

export default SupportList;
