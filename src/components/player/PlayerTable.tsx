import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PlayerCard from "@/components/player/PlayerCard";
import { useTranslation } from "react-i18next";
import {
  PLAYER_ADAPT_FILTERS,
  PLAYER_GROW_FILTERS,
  PLAYER_RARITIES,
  PLAYER_ADAPT_TITLES,
} from "@/config";

const PlayerTable = (props) => {
  const { t } = useTranslation();

  const coloredGradeText = (value) => {
    // Implement your colored grade text rendering here
    return <span>{value}</span>;
  };

  const getColumn = (text, type) => {
    const accessorKey = PLAYER_ADAPT_TITLES[text];
    const filters = type === "adapt" ? PLAYER_ADAPT_FILTERS : PLAYER_GROW_FILTERS;

    return {
      accessorKey,
      header: t(text),
      cell: ({ row }) => coloredGradeText(row.getValue(accessorKey)),
      meta: {
        filterOptions: filters.map(filter => ({
          label: filter.text,
          value: filter.value,
        })),
      },
      size: type === "adapt" ? 80 : 100,
    };
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "imgUrl",
      header: "角色",
      cell: ({ row }) => (
        <PlayerCard
          data={row.original}
          onSelect={props.onSelect}
          name={false}
        />
      ),
      size: 100,
    },
    {
      accessorKey: "name",
      header: "称号",
      cell: ({ row }) => t(row.getValue("name")),
    },
    {
      accessorKey: "charaName",
      header: "角色名",
      cell: ({ row }) => t(row.getValue("charaName")),
    },
    {
      accessorKey: "rare",
      header: "稀有度",
      cell: ({ row }) => PLAYER_RARITIES[row.getValue("rare")],
    },
    getColumn("芝", "adapt"),
    getColumn("ダート", "adapt"),
    getColumn("短距離", "adapt"),
    getColumn("マイル", "adapt"),
    getColumn("中距離", "adapt"),
    getColumn("長距離", "adapt"),
    getColumn("逃げ", "adapt"),
    getColumn("先行", "adapt"),
    getColumn("差し", "adapt"),
    getColumn("追込", "adapt"),
    getColumn("スピード", "grow"),
    getColumn("スタミナ", "grow"),
    getColumn("パワー", "grow"),
    getColumn("根性", "grow"),
    getColumn("賢さ", "grow"),
  ];

  const table = useReactTable({
    data: props.list.sort((a, b) => b.rare - a.rare),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      columnVisibility: {
        // You can hide columns here if needed
      },
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: header.getSize() }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {/* You can add filter UI here if needed */}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
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
      </Table>
    </div>
  );
};

export default PlayerTable;
