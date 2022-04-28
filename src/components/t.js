import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";

import ZH from "../assert/locales/zh_CN.json";
import EN from "../assert/locales/en.json";
const adapter = new LocalStorage("db");
const db = low(adapter);

const lan = db.get("lan").value() || "cn";
let lanData = {};
if (lan === "cn") {
  lanData = ZH;
} else if (lan === "us") {
  lanData = EN;
}
const t = (text, lan) => {
  if (lan === "cn") {
    lanData = ZH;
  } else if (lan === "us") {
    lanData = EN;
  }
  let result = lanData[text] || text;

  return result;
};
export default t;
