import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";

import { useTranslation } from "react-i18next";
// import { useAppContext } from "context/state";
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
  const [show, setShow] = React.useState(false);
  const [cur, setCur] = useState(null);
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const showModal = (cur) => {
    setCur(cur);
    setShow(true);
  };

  const modal = (
    <Modal size={"lg"} active={show} toggler={() => setShow(false)}>
      {cur?.name && <ModalHeader toggler={() => setShow(false)}>{cur.name}</ModalHeader>}
      <ModalBody>{detailRender(cur)}</ModalBody>
    </Modal>
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
              <div key={sortItem.title} className="w-full text-lg font-semibold text-center">
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
