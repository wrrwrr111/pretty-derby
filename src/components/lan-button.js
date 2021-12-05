import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import dbL from "../dbL.js";
import { Popover } from "antd";
import t from "./t.js";

const LanButton = (props) => {
  let lan = dbL.get("lan").value();
  const [code, setCode] = useState(lan || "cn");
  const changeToCn = () => {
    lan = "cn";
    dbL.set("lan", "cn").write();
    setCode("cn");
    t("", "cn");
    window.location.reload(true);
  };
  const changeToUs = () => {
    lan = "us";
    dbL.set("lan", "us").write();
    setCode("us");
    t("", "us");
    window.location.reload(true);
  };
  const changeToJp = () => {
    lan = "jp";
    dbL.set("lan", "jp").write();
    setCode("jp");
    t("", "jp");
    window.location.reload(true);
  };
  const flagStyle = {
    width: 40,
    height: 30,
    margin: 4,
  };
  return (
    <Popover
      content={
        <div style={{ display: "flex" }}>
          <span
            className="cursor-pointer"
            onClick={changeToCn}
            code={"cn"}
            style={{ ...flagStyle }}
          >
            cn
          </span>
          <span
            className="cursor-pointer"
            onClick={changeToUs}
            code={"us"}
            style={{ ...flagStyle }}
          >
            us
          </span>
          <span
            className="cursor-pointer"
            onClick={changeToJp}
            code={"jp"}
            style={{ ...flagStyle }}
          >
            jp
          </span>
        </div>
      }
    >
      <div className="flex items-center mx-10 cursor-pointer">{code}</div>
    </Popover>
  );
};

export default withRouter(LanButton);
