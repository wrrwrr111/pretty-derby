import React from "react";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from "react-i18next";
import { useDB } from "@/hooks/index";
import { EFFECT_LIMITS } from "@/config";

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
    // cur=40 lv35=40 lv40=-1 lv50=-1
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

const EffectTable = (props) => {
  const { t } = useTranslation();
  const db = useDB();
  if (!db) return null;
  const effects = db.get("effects").value();

  // 定义列配置
  let columns: ColumnDef<any>[] = [
    {
      accessorKey: "type",
      header: t("效果"),
      cell: ({ row }) => (
        <p
          data-tip={`<div><p>${effects[row.original.type].name}</p><p>${t(
            effects[row.original.type].name
          )}</p><p>${effects[row.original.type].description}</p><p>${t(
            effects[row.original.type].description
          )}</p></div>`}
        >
          {t(effects[row.original.type].name)}
        </p>
      ),
    },
    {
      accessorKey: "init",
      header: t("初始"),
      cell: ({ row }) => getValue(row.original, "init"),
    },
    {
      accessorKey: "limit_lv25",
      header: "lv25",
      cell: ({ row }) => getValue(row.original, "limit_lv25"),
    },
    {
      accessorKey: "limit_lv30",
      header: "lv30",
      cell: ({ row }) => getValue(row.original, "limit_lv30"),
    },
    {
      accessorKey: "limit_lv35",
      header: "lv35",
      cell: ({ row }) => getValue(row.original, "limit_lv35"),
    },
    {
      accessorKey: "limit_lv40",
      header: "lv40",
      cell: ({ row }) => getValue(row.original, "limit_lv40"),
    },
    {
      accessorKey: "limit_lv45",
      header: "lv45",
      cell: ({ row }) => getValue(row.original, "limit_lv45"),
    },
    {
      accessorKey: "limit_lv50",
      header: "lv50",
      cell: ({ row }) => getValue(row.original, "limit_lv50"),
    },
  ];

  // 根据稀有度过滤列
  if (props.rarity === 2) {
    columns = columns.slice(0, columns.length - 1);
  } else if (props.rarity === 1) {
    columns = columns.slice(0, columns.length - 2);
  }

  // 使用 useReactTable hook
  const table = useReactTable({
    data: props.effects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.type, // 使用 type 作为行 ID
  });

  return (
    <div className="w-full overflow-x-auto">
      <ShadTable>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ShadTable>
    </div>
  );
};

const getEffectMark = (maxLevel) => {
  let marks = [];
  const levels = [1, 5, 10, 15, 20, 25, 30, 35, 40];

  if (maxLevel >= 45) {
    levels.push(45);
  }
  if (maxLevel === 50) {
    levels.push(50);
  }

  return levels.map((level) => ({
    value: level,
    label: `lv${level}`,
  }));
};

const TestEffectTable = (props) => {
  const { t } = useTranslation();
  const getMaxLevel = (rarity) => {
    switch (rarity) {
      case 1:
        return 40;
      case 2:
        return 45;
      case 3:
        return 50;
      default:
        return 1;
    }
  };
  const maxLevel = getMaxLevel(props.rarity);
  const [selectingLevel, setSelectingLevel] = React.useState(maxLevel);

  const calc = (data, input) => {
    let nodes = [];
    let output = 0;
    let prevNode = { level: 0, value: 0 };
    for (let i = 0; i < data.length; i += 1) {
      if (data[i] !== -1) {
        let level = i * 5;
        if (level === 0) {
          level = 1;
        }
        nodes.push({ level: level, value: data[i] });
        prevNode = { level: level, value: data[i] };
      }
      if (i === data.length - 1 && data[i] === -1) {
        nodes.push({ level: maxLevel, value: prevNode.value });
      }
    }
    nodes.push({ level: 999, value: prevNode.value });

    const level = Math.floor(input);
    let upperNode = { level: 0, value: 0 };
    let lowerNode = { level: 0, value: 0 };
    if (level < 0 || level > maxLevel) {
      output = 0;
    } else if (level < nodes[0].level) {
      output = 0;
    } else {
      for (let i = 0; i < nodes.length; i += 1) {
        if (level >= nodes[i].level && level < nodes[i + 1].level) {
          lowerNode = nodes[i];
          upperNode = nodes[i + 1] || nodes[i];
          break;
        }
      }
      output = Math.floor(
        ((upperNode.value - lowerNode.value) / (upperNode.level - lowerNode.level)) *
          (level - lowerNode.level) +
          lowerNode.value
      );
    }

    return output;
  };

  const db = useDB();
  if (!db) return null;
  const effects = db.get("effects").value();

  return (
    <div className="space-y-4">
      {props.unique_effect && (
        <>
          <div className="flex w-full items-center justify-between p-2">
            <div>{t("固有效果")}</div>
            <div>{`${t("激活等级")}:${props.unique_effect.lv}`}</div>
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            {["0", "1"].map((index) =>
              props.unique_effect[`type_${index}`] ? (
                <div
                  key={index}
                  className="col-span-1 flex items-center rounded-xl border border-solid bg-green-300 border-green-500"
                >
                  <div
                    className="flex-auto truncate pl-2"
                    data-tip={`<div><p>${
                      effects[props.unique_effect[`type_${index}`]]?.name
                    }</p><p>${t(effects[props.unique_effect[`type_${index}`]]?.name)}</p><p>${
                      effects[props.unique_effect[`type_${index}`]]?.description
                    }</p><p>${t(
                      effects[props.unique_effect[`type_${index}`]]?.description
                    )}</p></div>`}
                  >
                    {t(effects[props.unique_effect[`type_${index}`]]?.name)}
                  </div>
                  <div className="bg-white h-full w-10 md:w-24 rounded-r-xl pl-2 flex items-center shrink-0">
                    {props.unique_effect[`value_${index}`]}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </>
      )}

      <div className="w-full flex items-center gap-4">
        <div className="whitespace-nowrap">{t("设置等级")}</div>
        <Slider
          className="w-full"
          min={1}
          max={maxLevel}
          value={[selectingLevel]}
          onValueChange={(value) => setSelectingLevel(value[0])}
          step={1}
          marks={getEffectMark(maxLevel)}
        />
        <Badge variant="outline" className="min-w-[3rem] justify-center">
          lv{selectingLevel}
        </Badge>
      </div>

      <div className="w-full grid grid-cols-2 gap-2">
        {props.effects?.map((item) => {
          const data = [
            item.init,
            item.limit_lv5,
            item.limit_lv10,
            item.limit_lv15,
            item.limit_lv20,
            item.limit_lv25,
            item.limit_lv30,
            item.limit_lv35,
            item.limit_lv40,
            item.limit_lv45,
            item.limit_lv50,
          ].filter((item) => item);

          return (
            <div
              key={item.type}
              className="col-span-1 flex items-center rounded-xl border border-solid bg-green-300 border-green-500"
            >
              <div
                className="flex-auto truncate pl-2"
                data-tip={`<div><p>${effects[item.type].name}</p><p>${t(
                  effects[item.type].name
                )}</p><p>${effects[item.type].description}</p><p>${t(
                  effects[item.type].description
                )}</p></div>`}
              >
                {t(effects[item.type].name)}
              </div>
              <div className="bg-white h-full w-10 md:w-24 rounded-r-xl pl-2 flex items-center shrink-0">
                {calc(data, selectingLevel)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { EffectTable, TestEffectTable };
