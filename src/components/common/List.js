import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { Modal } from "antd";
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
}) => {
  const list = dataList
    ? dataList
    : idList
    ? idList.reduce((list, cur) => {
        return [...list, db.get(listKey).find({ id: cur }).value()];
      }, [])
    : db.get(listKey).value();
  const [cur, setCur] = useState(null);
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
              {sortList.map((data) => itemRender(data, setCur))}
              {itemClass && (
                <>
                  <div className={itemClass}></div>
                  <div className={itemClass}></div>
                  <div className={itemClass}></div>
                  <div className={itemClass}></div>
                  <div className={itemClass}></div>
                  <div className={itemClass}></div>
                  <div className={itemClass}></div>
                  <div className={itemClass}></div>
                  <div className={itemClass}></div>
                  <div className={itemClass}></div>
                  <div className={itemClass}></div>
                  <div className={itemClass}></div>
                </>
              )}
            </>
          );
        })}
        <Modal
          visible={cur}
          onOk={() => setCur(null)}
          onCancel={() => setCur(null)}
          footer={null}
          width={768}
          bodyStyle={{ display: "flex", flexDirection: "column" }}
        >
          {detailRender(cur)}
        </Modal>
      </div>
    );
  } else {
    return (
      <div className={` flex flex-wrap ${className}`}>
        {list
          .filter((data) => (filterFunc ? filterFunc(data) : true))
          .map((data) => itemRender(data, setCur))}
        <Modal
          visible={cur}
          onOk={() => setCur(null)}
          onCancel={() => setCur(null)}
          footer={null}
          width={768}
          bodyStyle={{ display: "flex", flexDirection: "column" }}
        >
          {detailRender(cur)}
        </Modal>
      </div>
    );
  }
};

export default List;
