import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useDB } from "@/hooks/index";

interface ListProps<T> {
  className?: string;
  listKey?: string;
  sort?: {
    data: Array<{
      title: string;
      value?: any;
      func?: (item: T) => boolean;
    }>;
    key?: string;
  };
  filterFunc?: (item: T) => boolean;
  idList?: string[];
  dataList?: T[];
  itemRender: (item: T, showModal: (item: T) => void) => React.ReactNode;
  itemClass?: string;
  detailRender: (item: T | null) => React.ReactNode;
  detailModalSize?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const List = <T extends { id: string; name?: string }>({
  className,
  listKey,
  sort,
  filterFunc,
  idList,
  dataList,
  itemRender,
  itemClass,
  detailRender,
  detailModalSize = "lg",
}: ListProps<T>) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState<T | null>(null);

  const { db } = useDB();
  if (!db) return null;

  const list = dataList
  ? dataList
  : idList
  ? idList.reduce((list, cur) => {
      return [...list, db.get(listKey).find({ id: cur }).value()];
    }, [])
  : db.get(listKey).value();;

  const showModal = (item: T) => {
    setCurrentItem(item);
    setShow(true);
  };

  if (!list) return null;

  const renderContent = () => {
    if (sort) {
      return sort.data.map((sortItem) => {
        const sortList = list.filter((item) => {
          if (sort.key && sortItem.value) {
            return item[sort.key as keyof T] === sortItem.value;
          }
          if (sortItem.func) {
            return sortItem.func(item);
          }
          return false;
        });

        if (!sortList.length) return null;

        return (
          <React.Fragment key={sortItem.title}>
            <div className="w-full text-lg font-semibold text-center">{t(sortItem.title)}</div>
            {sortList.map((data) => itemRender(data, showModal))}
            {itemClass && (
              <>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={`blank_${i}`} className={itemClass} />
                ))}
              </>
            )}
          </React.Fragment>
        );
      });
    } else {
      return list
        .filter((data) => (filterFunc ? filterFunc(data) : true))
        .map((data) => itemRender(data, showModal));
    }
  };

  return (
    <div className={`flex flex-wrap ${className}`}>
      {renderContent()}

      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent className={`max-w-${detailModalSize}`}>
          {currentItem?.name && (
            <DialogHeader>
              <DialogTitle>{currentItem.name}</DialogTitle>
            </DialogHeader>
          )}
          {detailRender(currentItem)}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default List;
