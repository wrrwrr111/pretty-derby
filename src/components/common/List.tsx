// components/common/List.tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface ListProps<T> {
  className?: string;
  listKey?: string;
  sort?: {
    data: {
      title: string;
      func?: (item: T) => boolean;
      value?: any;
    }[];
    key?: string;
  };
  filterFunc?: (item: T) => boolean;
  idList?: string[];
  dataList: T[];
  itemRender: (item: T, showDetail: (item: T) => void) => React.ReactNode;
  itemClass?: string;
  detailRender: (item: T) => React.ReactNode;
  detailModalSize?: "sm" | "md" | "lg" | "xl";
}

export default function List<T>({
  className,
  sort,
  filterFunc,
  dataList,
  itemRender,
  itemClass,
  detailRender,
}: ListProps<T>) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [cur, setCur] = useState<T | null>(null);

  const showModal = (item: T) => {
    setCur(item);
    setShow(true);
  };

  const closeModal = () => {
    setCur(null);
    setShow(false);
  };

  const renderGroup = (items: T[], title: string) => (
    <>
      <div className="w-full text-lg font-semibold text-center my-2">{t(title)}</div>
      {items.map((item, idx) => (
        <div key={idx}>{itemRender(item, showModal)}</div>
      ))}
      {itemClass &&
        Array.from({ length: 20 }).map((_, i) => (
          <div key={`blank_${i}`} className={itemClass} />
        ))}
    </>
  );

  const filteredList = dataList.filter((item) => (filterFunc ? filterFunc(item) : true));

  return (
    <>
      <div className={cn("flex flex-wrap", className)}>
        {sort
          ? sort.data.map((sortItem, index) => {
              const list = filteredList.filter((item) =>
                sortItem.func ? sortItem.func(item) : true
              );
              return list.length > 0 ? renderGroup(list, sortItem.title) : null;
            })
          : filteredList.map((item, idx) => <div key={idx}>{itemRender(item, showModal)}</div>)}
      </div>

      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{(cur as any)?.name}</DialogTitle>
          </DialogHeader>
          {cur && detailRender(cur)}
        </DialogContent>
      </Dialog>
    </>
  );
}
