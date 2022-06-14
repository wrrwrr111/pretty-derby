import React from "react";
import Button from "@material-tailwind/react/Button";
// import {useState} from 'react';
import { useDB } from "/hooks/index.js";
import { useTranslation } from "react-i18next";
const BuffButton = (props) => {
  return (
    <Button size="sm" buttonType="outline" data-tip="buff list">
      Buff
    </Button>
  );
};
const BuffList = (props) => {
  const { t } = useTranslation();
  const db = useDB();
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
