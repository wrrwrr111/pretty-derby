import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import { Dialog, Typography, IconButton } from "@material-tailwind/react";
import { Xmark } from "iconoir-react";

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
    <Dialog size="lg" open={show} onOpenChange={setShow}>
      <Dialog.Overlay>
        <Dialog.Content>
          <div className="mb-4 flex items-center justify-between gap-4">
            <Typography type="h6">{cur?.name}</Typography>
            <Dialog.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              color="secondary"
              isCircular
              className="absolute right-2 top-2"
            >
              <Xmark className="h-5 w-5" />
            </Dialog.DismissTrigger>
          </div>
          <div className="overflow-y-auto">{detailRender(cur)}</div>
        </Dialog.Content>
      </Dialog.Overlay>
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
