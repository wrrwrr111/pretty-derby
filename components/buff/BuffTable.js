import React from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "context/state";
const BuffTable = (props) => {
  const { t } = useTranslation();
  const { buffs } = useAppContext();
  const cellStyle = {
    // width:'20%',
    height: "32px",
    fontSize: 16,
    textAlign: "flex-start",
    paddingLeft: 16,
    fontWeight: 500,
    borderWidth: "thin",
    borderStyle: "solid solid solid solid",
    borderColor: "gray",
  };
  return (
    <table>
      <tbody>
        {buffs.map((buff) => (
          <tr key={buff.name}>
            <td style={{ ...cellStyle }}>{t(buff.name)}</td>
            <td style={{ ...cellStyle }}>{t(buff.describe)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default BuffTable;
