import React, { FC, useMemo, useState } from "react";
import { ITableProps, kaReducer, Table } from "ka-table";
import { DataType, EditingMode, FilteringMode, SortingMode } from "ka-table/enums";
import "ka-table/style.css";

import { useTranslation } from "react-i18next";

import { useAtom } from "jotai";
import { effectsAtom } from "../../hooks/atoms";
import { DispatchFunc } from "ka-table/types";
import { Support, SupportEffect, SupportEffectLimit } from "../../../typings";

export const EFFECT_LIMITS: SupportEffectLimit[] = [
  "init",
  "limit_lv5",
  "limit_lv10",
  "limit_lv15",
  "limit_lv20",
  "limit_lv25",
  "limit_lv30",
  "limit_lv35",
  "limit_lv40",
  "limit_lv45",
  "limit_lv50",
];

const getValue = (effect: SupportEffect, cur: SupportEffectLimit) => {
  if (effect[cur] !== -1) {
    return effect[cur];
  } else {
    let index = EFFECT_LIMITS.indexOf(cur);
    let min = 0;
    let min_limit: SupportEffectLimit = "init";
    let max = 0;
    let max_limit: SupportEffectLimit = "limit_lv50";
    for (let limit of EFFECT_LIMITS.slice(0, index)) {
      if (effect[limit] > min) {
        min = effect[limit];
        min_limit = limit;
      }
    }
    for (let limit of EFFECT_LIMITS.slice(index, EFFECT_LIMITS.length)) {
      if (effect[limit] !== -1) {
        max = effect[limit];
        max_limit = limit;
        break;
      }
    }
    if (max <= min || max - min === 1 || min === 0) {
      return min;
    } else {
      return `${Math.floor(
        min +
          ((max - min) * (EFFECT_LIMITS.indexOf(cur) - EFFECT_LIMITS.indexOf(min_limit))) /
            (EFFECT_LIMITS.indexOf(max_limit) - EFFECT_LIMITS.indexOf(min_limit))
      )}(插值)`;
    }
  }
};
const EffectTable: FC<{ effects: SupportEffect[]; rarity: Number }> = ({ effects, rarity }) => {
  const [allEffects] = useAtom(effectsAtom);

  const { t } = useTranslation();

  const columns = useMemo(() => {
    return [
      { key: "type", title: t("效果"), width: 200 },
      { key: "init", title: t("初始") },
      { key: "limit_lv25", title: "lv25" },
      { key: "limit_lv30", title: "lv30" },
      { key: "limit_lv35", title: "lv35" },
      { key: "limit_lv40", title: "lv40" },
      ...(rarity > 1 ? [{ key: "limit_lv45", title: "lv45" }] : []),
      ...(rarity > 2 ? [{ key: "limit_lv50", title: "lv50" }] : []),
    ];
  }, [rarity]);

  const data = useMemo(() => {
    return effects.map((effect) => {
      return {
        type: effect.type,
        init: getValue(effect, "init"),
        limit_lv25: getValue(effect, "limit_lv25"),
        limit_lv30: getValue(effect, "limit_lv30"),
        limit_lv35: getValue(effect, "limit_lv35"),
        limit_lv40: getValue(effect, "limit_lv40"),
        limit_lv45: getValue(effect, "limit_lv45"),
        limit_lv50: getValue(effect, "limit_lv50"),
      };
    });
  }, [effects]);

  const tablePropsInit: ITableProps = {
    columns: columns.map((column) => ({
      ...column,
      colGroup: { style: { minWidth: 80 } },
      dataType: DataType.String,
    })),
    data: data,
    editingMode: EditingMode.Cell,
    rowKeyField: "id",
    format: ({ column, value }) => {
      if (column.key === "type") {
        const effect = allEffects?.[value];
        if (!effect) return value;
        return (
          <div
            data-tip={`<div>
            <p>${effect.name}</p>
            <p>${t(effect.name)}</p>
            <p>${effect.description}</p>
            <p>${t(effect.description)}</p>
            </div>`}
          >
            {t(effect.name)}
          </div>
        );
      }
    },
  };

  const [tableProps, changeTableProps] = useState(tablePropsInit);
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
          content: ({ column: { key } }) => key === "type" && <></>,
        },
        // 第一列左钉
        headCell: {
          elementAttributes: (props) => {
            if (props.column.key === "type") {
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
            if (props.column.key === "type") {
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
  // return (
  //   <TableContainer component={Paper}>
  //     <Table sx={{ minWidth: 650 }} aria-label="simple table">
  //       <TableHead>
  //         <TableRow>
  //           {columns.map((column) => (
  //             <TableCell>{column.title}</TableCell>
  //           ))}
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {effects.map((row) => (
  //           <TableRow key={row.type} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
  //             {columns.map((column) => {
  //               if (column.render) {
  //                 return (
  //                   <TableCell key={column.key}>{column.render(row[column.field], row)}</TableCell>
  //                 );
  //               } else {
  //                 return <TableCell key={column.key}>{row[column.field]}</TableCell>;
  //               }
  //             })}
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // );
};

export default EffectTable;
