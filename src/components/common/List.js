import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import db from "../../db.js";
import t from "../t.js";

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
  const [show, setShow] = React.useState(false);
  const list = dataList
    ? dataList
    : idList
    ? idList.reduce((list, cur) => {
        return [...list, db.get(listKey).find({ id: cur }).value()];
      }, [])
    : db.get(listKey).value();
  const [cur, setCur] = useState(null);

  const showModal = (cur) => {
    setCur(cur);
    setShow(true);
  };

  const modal = (
    <Modal size={"lg"} active={show} toggler={() => setShow(false)}>
      <ModalHeader toggler={() => setShow(false)}>{cur?.name}</ModalHeader>
      <ModalBody>{detailRender(cur)}</ModalBody>
    </Modal>
  );

  useEffect(() => {
    ReactTooltip.rebuild();
  });
  if (!list) {
    return <></>;
  }

  if (sort) {
    return (
      <div className={` flex flex-wrap ${className}`}>
        {sort.data.map((sortItem) => {
          let sortList = list.filter((item) => {
            let flag = false;
            if (sort.key && sortItem.value) {
              flag = item[sort.key] == sortItem.value;
            }
            if (sortItem.func) {
              flag = sortItem.func(item);
            }
            return flag;
          });
          if (!sortList.length) {
            return <></>;
          }
          return (
            <>
              <div className="w-full text-lg font-semibold text-center">{t(sortItem.title)}</div>
              {sortList.map((data) => itemRender(data, showModal))}
              {itemClass && (
                <>
                  {[...new Array(20)].map((i) => (
                    <div className={itemClass} />
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
