import React from "react";
import { useNavigate } from "react-router-dom";
import SupportCard from "./SupportCard";
import SupportDetail from "./SupportDetail";
import List from "@/components/common/List";
import useUa from "@/utils/ua";
const SupportList = ({ className, dataList, onClick, sortFlag = false, ownList }) => {
  const ua = useUa();
  const navigate = useNavigate();
  const sort = sortFlag
    ? {
        key: "rare",
        data: [
          { value: "SSR", title: "SSR" },
          { value: "SR", title: "SR" },
          { value: "R", title: "R" },
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
        <div key={data.id} className="w-24 max-w-1/4 p-1">
          <SupportCard
            className={`${ownList?.length && !ownList?.includes(data.id) && "un-chosen-card"}`}
            data={data}
            onClick={() =>
              onClick
                ? onClick(data)
                : ua.isPhone
                ? navigate(`/support-detail/${data.id}`)
                : setCur(data)
            }
          />
        </div>
      )}
      itemClass={"w-24 max-w-1/4"}
      detailRender={(data) => <SupportDetail data={data} isNur={false} />}
      // detailModalSize='regular'
    />
  );
};

export default SupportList;
