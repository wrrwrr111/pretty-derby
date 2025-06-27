// SupportList.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SupportCard from "./SupportCard";
import SupportDetail from "./SupportDetail";
import List from "@/components/common/List";
import useUa from "@/hooks/useUa";

interface SupportListProps {
  className?: string;
  dataList: SupportCardList;
  onClick?: (support: SupportCard) => void;
  sortFlag?: boolean;
  ownList?: string[];
}

const SupportList: React.FC<SupportListProps> = ({
  className,
  dataList,
  onClick,
  sortFlag = false,
  ownList,
}) => {
  const ua = useUa();
  const navigate = useNavigate();

  const sort = {
    key: "rare",
    data: [
      { value: "SSR", title: "SSR" },
      { value: "SR", title: "SR" },
      { value: "R", title: "R" },
    ],
  };

  const handleClick = (support: SupportCard) => {
    if (onClick) {
      onClick(support);
    } else if (ua.isPhone) {
      navigate(`/support-detail/${support.id}`);
    }
    return false;
  };

  return (
    <List
      className={className}
      listKey="supports"
      dataList={dataList}
      sort={sortFlag ? sort : undefined}
      itemRender={(data, setCur) => (
        <div key={data.id} className="w-24 max-w-1/4 p-1">
          <SupportCard
            className={`${ownList?.length && !ownList.includes(data.id) ? "un-chosen-card" : ""}`}
            data={data}
            onClick={() => handleClick(data) || setCur(data)}
          />
        </div>
      )}
      itemClass="w-24 max-w-1/4"
      detailRender={(data) => <SupportDetail data={data} isNur={false} />}
    />
  );
};

export default SupportList;
