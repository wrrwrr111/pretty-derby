import React from "react";
import { Button } from "@/components/ui/button";
// import {useState} from 'react';
import { useDB } from "@/hooks/index";
import { useTranslation } from "react-i18next";
const BuffButton = () => {
  return (
    <Button size="sm" buttonType="outline" data-tip="buff list">
      Buff
    </Button>
  );
};
const BuffList = () => {
  const { t } = useTranslation();
  const { db } = useDB();
  if (!db) return null;
  const buffs = db.get("buffs").value();
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
export { BuffButton, BuffList };

export default BuffList;
