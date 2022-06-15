import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useTranslation } from "react-i18next";
import { useDB } from "/hooks/index.js";

import { EFFECT_LIMITS } from "/src/config";

const getValue = (effect, cur) => {
  if (effect[cur] !== -1) {
    return effect[cur];
  } else {
    let index = EFFECT_LIMITS.indexOf(cur);
    let min = 0;
    let min_limit = "init";
    let max = 0;
    let max_limit = "limit_lv50";
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
      return (
        <div data-tip="插值">
          {Math.floor(
            min +
              ((max - min) * (EFFECT_LIMITS.indexOf(cur) - EFFECT_LIMITS.indexOf(min_limit))) /
                (EFFECT_LIMITS.indexOf(max_limit) - EFFECT_LIMITS.indexOf(min_limit))
          )}
        </div>
      );
    }
  }
};
const EffectTable = ({ effects, rarity }) => {
  const { t } = useTranslation();
  const db = useDB();
  if (!db) return null;
  const allEffects = db.get("effects").value();
  console.log(effects[0]);
  let columns = [
    {
      title: t("效果"),
      field: "type",
      key: "type",
      render: (type) => (
        <p
          data-tip={`<div><p>${allEffects[type].name}</p><p>${t(allEffects[type].name)}</p><p>${
            allEffects[type].description
          }</p><p>${t(allEffects[type].description)}</p></div>`}
        >
          {t(allEffects[type].name)}
        </p>
      ),
    },
    {
      title: t("初始"),
      field: "init",
      key: "init",
      render: (div, record) => getValue(record, "init"),
    },
    {
      title: "lv25",
      field: "limit_lv25",
      key: "limit_lv25",
      render: (div, record) => getValue(record, "limit_lv25"),
    },
    {
      title: "lv30",
      field: "limit_lv30",
      key: "limit_lv30",
      render: (div, record) => getValue(record, "limit_lv30"),
    },
    {
      title: "lv35",
      field: "limit_lv35",
      key: "limit_lv35",
      render: (div, record) => getValue(record, "limit_lv35"),
    },
    {
      title: "lv40",
      field: "limit_lv40",
      key: "limit_lv40",
      render: (div, record) => getValue(record, "limit_lv40"),
    },
    {
      title: "lv45",
      field: "limit_lv45",
      key: "limit_lv45",
      render: (div, record) => getValue(record, "limit_lv45"),
    },
    {
      title: "lv50",
      field: "limit_lv50",
      key: "limit_lv50",
      render: (div, record) => getValue(record, "limit_lv50"),
    },
  ];
  if (rarity === 2) {
    columns = columns.slice(0, columns.length - 1);
  } else if (rarity === 1) {
    columns = columns.slice(0, columns.length - 2);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {effects.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              {columns.map((column) => {
                if (column.render) {
                  return (
                    <TableCell key={column.key}>{column.render(row[column.field], row)}</TableCell>
                  );
                } else {
                  return <TableCell key={column.key}>{row[column.field]}</TableCell>;
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EffectTable;
