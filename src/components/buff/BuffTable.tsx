import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { ITableProps, Table } from "ka-table";
import { DataType } from "ka-table/enums";

import { buffsAtom } from "../../hooks/atoms";
const BuffTable = () => {
  const { t } = useTranslation();
  const [buffs] = useAtom(buffsAtom);

  const columns = [
    { key: "name", title: t("名称"), width: 200 },
    { key: "describe", title: t("效果") },
  ];

  const tableProps: ITableProps = {
    columns: columns.map((column) => ({
      ...column,
      colGroup: { style: { minWidth: 100 } },
      dataType: DataType.String,
    })),
    data: buffs,
    rowKeyField: "id",
    format: ({ column, value }) => {
      return t(value);
    },
  };

  return <Table {...tableProps} />;
};
export default BuffTable;
