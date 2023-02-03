import React, { useState, useMemo, useEffect, useCallback, ReactNode } from "react";

import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

import { useTranslation } from "react-i18next";
import useTilg from "tilg";

export type SortOptions = {
  key: string;
  data: {
    value: string;
    title: string;
    func?: Function;
  }[];
};

const List: React.FC<{
  className?: string;
  sort?: SortOptions | false;
  filterFunc?: Function;
  dataList?: any[];
  itemClass?: string;
  itemRender?: Function;
  detailRender?: Function;
}> = ({ className, sort, filterFunc, dataList, itemRender, itemClass, detailRender }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const [cur, setCur] = useState<any>(null);

  const showModal = (cur: any) => {
    setCur(cur);
    setOpen(true);
  };

  const Modal = () => (
    <Dialog size={"lg"} open={open} handler={toggleOpen}>
      {cur?.name && <DialogHeader>{cur?.name}</DialogHeader>}
      <DialogBody className="max-h-[80vh] overflow-auto">
        {detailRender && detailRender(cur)}
      </DialogBody>
    </Dialog>
  );

  if (!dataList || !itemRender) return null;

  if (!sort) {
    return (
      <div className={` flex flex-wrap ${className}`}>
        {dataList
          .filter((data) => (filterFunc ? filterFunc(data) : true))
          .map((data) => itemRender(data, showModal))}
        <Modal />
      </div>
    );
  }
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
      <Modal />
    </div>
  );
};

export default List;
