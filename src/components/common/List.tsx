// List.tsx
import React, { useState, useMemo, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useDB } from "@/hooks/useDB";

export type SortConfig<T extends ItemWithId> = {
  key?: string;
  data: Array<{
    title: string;
    value?: any;
    func?: (item: T) => boolean;
  }>;
};

export type ListProps<T extends ItemWithId> = {
  className?: string;
  listKey?: string;
  sort?: SortConfig<T>;
  filterFunc?: (item: T) => boolean;
  idList?: string[];
  dataList?: T[];
  itemRender: (item: T, showModal: (item: T) => void) => React.ReactNode;
  itemClass?: string;
  detailRender: (item: T | null) => React.ReactNode;
};

const List = <T extends ItemWithId>({
  className,
  listKey,
  sort,
  filterFunc,
  idList,
  dataList,
  itemRender,
  itemClass,
  detailRender,
}: ListProps<T>) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState<T | null>(null);
  const { db } = useDB();

  const showModal = useCallback((item: T) => {
    setCurrentItem(item);
    setShow(true);
  }, []);

  const list: T[] | null = useMemo(() => {
    if (!db) return null;

    if (dataList) return dataList;
    if (idList && listKey) {
      // @ts-ignore
      return idList.map((id) => db.chain.get(listKey).find({ id }).value());
    }
    if (listKey) return db.chain.get(listKey).value();
    return null;
  }, [db, listKey, idList, dataList]);

  const renderContent = useMemo(() => {
    if (!list) return null;

    if (sort) {
      return sort.data.map((sortItem) => {
        const sortList = list.filter((item) => {
          if (sort.key && sortItem.value) {
            return item[sort.key as keyof T] === sortItem.value;
          }
          return sortItem.func ? sortItem.func(item) : false;
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
    }

    return list
      .filter((data) => (filterFunc ? filterFunc(data) : true))
      .map((data) => itemRender(data, showModal));
  }, [list, sort, filterFunc, itemRender, showModal, itemClass, t]);

  if (!db || !list) return null;

  return (
    <div className={`flex flex-wrap ${className}`}>
      {renderContent}

      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent>
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
