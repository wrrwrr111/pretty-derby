import React, { useState, useEffect } from "react";

import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

import { useTranslation } from "react-i18next";
const List = ({
  className,
  listKey,
  sort,
  filterFunc,
  dataList,
  itemRender,
  itemClass,
  detailRender,
  detailModalSize,
}) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [cur, setCur] = useState(null);

  const showModal = (cur) => {
    setCur(cur);
    setOpen(true);
  };

  const modal = (
    <Dialog size={"lg"} open={open} handler={handleOpen}>
      {cur?.name && <DialogHeader handler={handleOpen}>{cur.name}</DialogHeader>}
      <DialogBody className="max-h-[80vh] overflow-auto">{detailRender(cur)}</DialogBody>
    </Dialog>
  );

  if (!dataList) return null;
  if (sort) {
    return (
      <div className={` flex flex-wrap ${className}`}>
        {sort.data.map((sortItem) => {
          let sortList = dataList.filter((item) => {
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
              <div key={sortItem.title} className="w-full text-center text-lg font-semibold">
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
        {dataList
          .filter((data) => (filterFunc ? filterFunc(data) : true))
          .map((data) => itemRender(data, showModal))}
        {modal}
      </div>
    );
  }
};

export default List;
