import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useDB } from "../../hooks/index";
import { useTranslation } from "react-i18next";

const List = ({
  className,
  listKey,
  sort,
  filterFunc,
  idList,
  dataList,
  itemRender,
  itemClass,
  detailRender,
  detailModalSize,
}) => {
  const { t } = useTranslation();
  const [show, setShow] = React.useState(false);
  const [cur, setCur] = useState(null);
  useEffect(() => {
    ReactTooltip.rebuild();
  });
  const db = useDB();
  if (!db) return null;

  const list = dataList
    ? dataList
    : idList
    ? idList.reduce((list, cur) => {
        return [...list, db.get(listKey).find({ id: cur }).value()];
      }, [])
    : db.get(listKey).value();

  const showModal = (cur) => {
    setCur(cur);
    setShow(true);
  };

  const modal = (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent
        style={{
          maxWidth: "80vw", // 最大宽度为屏幕宽度的80%
          maxHeight: "80vh", // 最大高度为屏幕高度的80%
          overflowY: "auto", // 内容过长时允许垂直滚动
        }}
      >
        <DialogHeader>
          <DialogTitle>{cur?.name}</DialogTitle>
        </DialogHeader>
        {detailRender(cur)}
      </DialogContent>
    </Dialog>
  );

  if (!list) return null;
  if (sort) {
    return (
      <div className={` flex flex-wrap ${className}`}>
        {sort.data.map((sortItem) => {
          let sortList = list.filter((item) => {
            let flag = false;
            if (sort.key && sortItem.value) {
              flag = item[sort.key] === sortItem.value;
            }
            if (sortItem.func) {
              flag = sortItem.func(item);
            }
            return flag;
          });
          if (!sortList.length) return null;

          return (
            <>
              <div
                key={sortItem.title}
                className="w-full text-lg font-semibold text-center"
              >
                {t(sortItem.title)}
              </div>
              {sortList.map((data) => itemRender(data, showModal))}
              {itemClass && (
                <>
                  {[...new Array(20)].map((e, i) => (
                    <div key={`blank_${i}`} className={itemClass} />
                  ))}
                </>
              )}
            </>
          );
        })}
        {modal}
      </div>
    );
  } else {
    return (
      <div className={` flex flex-wrap ${className}`}>
        {list
          .filter((data) => (filterFunc ? filterFunc(data) : true))
          .map((data) => itemRender(data, showModal))}
        {modal}
      </div>
    );
  }
};

export default List;
