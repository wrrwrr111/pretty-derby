import React, { useEffect, useState } from "react";

import { ITableProps, kaReducer, Table } from "ka-table";
import { DataType, EditingMode, FilteringMode, SortingMode } from "ka-table/enums";
import { DispatchFunc } from "ka-table/types";

import "ka-table/style.css";
import { useAtom } from "jotai";
import { racesAtom } from "../../hooks/atoms";
import { useTranslation } from "react-i18next";

const Page: React.FC = () => {
  const { t } = useTranslation();
  const columns = [
    { key: "name", title: t("名称"), width: 200 },
    { key: "date", title: t("时间"), width: 150 },
    { key: "class", title: t("年级"), width: 120 },
    { key: "grade", title: t("赛事等级"), width: 120 },
    { key: "place", title: t("地点") },
    { key: "ground", title: t("场地") },
    { key: "distance", title: t("长度") },
    { key: "distanceType", title: t("赛程") },
    { key: "direction", title: t("方向") },
    { key: "side", title: t("赛道") },
  ];

  const tablePropsInit: ITableProps = {
    columns: columns.map((column) => ({
      ...column,
      colGroup: { style: { minWidth: 100 } },
      dataType: DataType.String,
    })),
    data: [],
    editingMode: EditingMode.Cell,
    rowKeyField: "id",
    sortingMode: SortingMode.Single,
    filteringMode: FilteringMode.HeaderFilter,
  };

  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const [races] = useAtom(racesAtom);

  useEffect(() => {
    if (races?.length) {
      changeTableProps((prevState) => ({ ...prevState, data: races }));
    }
  }, [races]);

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
      childComponents={{
        // 去除第一列的 头过滤
        headFilterButton: {
          content: ({ column: { key } }) => key === "name" && <></>,
        },
        // 第一列左钉
        headCell: {
          elementAttributes: (props) => {
            if (props.column.key === "name") {
              return {
                style: {
                  ...props.column.style,
                  position: "sticky",
                  left: 0,
                  zIndex: 10,
                },
              };
            }
          },
        },
        cell: {
          elementAttributes: (props) => {
            if (props.column.key === "name") {
              return {
                className: "truncate",
                style: {
                  ...props.column.style,
                  position: "sticky",
                  left: 0,
                  backgroundColor: "#eee",
                },
              };
            }
          },
        },
      }}
    />
  );
};
export default Page;
