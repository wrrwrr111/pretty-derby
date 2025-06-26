import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PlayerImage from "./PlayerImage";
import SupportImage from "./SupportImage";
import { SEED_BLUE_LABELS, SEED_RED_LABELS } from "@/config";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface SeedData {
  id: string;
  gameId: string;
  playerId0: string;
  blue0: string;
  blueLevel0: string;
  red0: string;
  redLevel0: string;
  greenLevel0: string;
  uraLevel0: string;
  playerId1: string;
  playerId2: string;
  supportId: string;
  supportLevel: number;
  uraLevel: string;
  white: string;
  likes: number;
  dislikes: number;
  userId: string;
  [key: string]: any;
}

interface SeedTableProps {
  data: SeedData[];
  total: number;
  onChange: (pagination: any) => void;
  onLike: (seed: SeedData) => void;
  onDislike: (seed: SeedData) => void;
  onDelete: (seed: SeedData) => void;
  userId: string;
}

const SeedTable: React.FC<SeedTableProps> = ({
  data,
  total,
  onChange,
  onLike,
  onDislike,
  onDelete,
  userId,
}) => {
  const columns = [
    {
      accessorKey: "gameId",
      header: "玩家id",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span>{row.original.gameId}</span>
            <CopyToClipboard
              text={row.original.gameId}
              onCopy={() => toast.info("复制成功")}
            >
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Copy className="h-4 w-4" />
              </Button>
            </CopyToClipboard>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onLike(row.original)}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <span>{row.original.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onDislike(row.original)}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
            <span>{row.original.dislikes}</span>
          </div>
          {row.original.userId === userId && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onDelete(row.original)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
    {
      accessorKey: "playerId0",
      header: "主要",
      cell: ({ row }) => <PlayerImage id={row.original.playerId0} />,
    },
    {
      accessorKey: "blue0",
      header: "蓝色因子",
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {`${SEED_BLUE_LABELS[row.original.blue0]}\xa0\xa0${row.original.blueLevel0}`}
        </span>
      ),
    },
    {
      accessorKey: "red0",
      header: "红色因子",
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {`${SEED_RED_LABELS[row.original.red0]}\xa0\xa0${row.original.redLevel0}`}
        </span>
      ),
    },
    {
      accessorKey: "greenLevel0",
      header: "绿色因子",
      cell: ({ row }) => (
        <span className="whitespace-nowrap">{`固有\xa0\xa0${row.original.greenLevel0}`}</span>
      ),
    },
    {
      accessorKey: "uraLevel0",
      header: "URA",
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {row.original.uraLevel0 ? `URA  ${row.original.uraLevel0}` : ""}
        </span>
      ),
    },
    {
      accessorKey: "playerId1",
      header: "父辈1",
      cell: ({ row }) => <PlayerImage id={row.original.playerId1} />,
    },
    {
      accessorKey: "playerId2",
      header: "父辈2",
      cell: ({ row }) => <PlayerImage id={row.original.playerId2} />,
    },
    {
      id: "allBlue",
      header: "总计蓝色",
      cell: ({ row }) => (
        <div className="flex flex-col">
          {Object.keys(SEED_BLUE_LABELS).map(
            (key) =>
              row.original[key] && (
                <span key={key} className="whitespace-nowrap">
                  {`${SEED_BLUE_LABELS[key]}\xa0\xa0${row.original[key]}`}
                </span>
              )
          )}
        </div>
      ),
    },
    {
      id: "allRed",
      header: "总计红色",
      cell: ({ row }) => (
        <div className="flex flex-col">
          {Object.keys(SEED_RED_LABELS).map(
            (key) =>
              row.original[key] && (
                <span key={key} className="whitespace-nowrap">
                  {`${SEED_RED_LABELS[key]}\xa0\xa0${row.original[key]}`}
                </span>
              )
          )}
        </div>
      ),
    },
    {
      accessorKey: "uraLevel",
      header: "总计URA",
    },
    {
      accessorKey: "white",
      header: "总计白色",
    },
    {
      accessorKey: "supportId",
      header: "支援卡",
      cell: ({ row }) => <SupportImage id={row.original.supportId} />,
    },
    {
      accessorKey: "supportLevel",
      header: "突破等级",
      cell: ({ row }) => (
        <div className="flex">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-4 w-4 rounded-full mx-0.5 ${
                i < row.original.supportLevel ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / 10),
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex: 0, pageSize: 10 })
          : updater;
      onChange({
        current: newPagination.pageIndex + 1,
        pageSize: newPagination.pageSize,
        total,
      });
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
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
              <TableRow key={row.id}>
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
                暂无数据
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          上一页
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          下一页
        </Button>
      </div>
    </div>
  );
};

export default SeedTable;
