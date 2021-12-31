import React, { useState, useRef } from "react";

import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";

import dbL from "../dbL.js";
import t from "./t.js";

let lan = dbL.get("lan").value();
const LanButton = (props) => {
  const [code, setCode] = useState(lan || "cn");
  const [show, setShow] = useState(false)
  const buttonRef = useRef();
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
  return (
    <>
      <Button size='sm' color="lightBlue" onClick={() => setShow(true)} ripple="light">
        {code}
      </Button>
      <Modal active={show} toggler={() => setShow(false)}>
        <ModalBody>
          <div className='grid grid-cols-3 gap-3'>
            <Button
              onClick={changeToCn}
              code={"cn"}
            >
              cn
            </Button>
            <Button
              className="cursor-pointer"
              onClick={changeToUs}
              code={"us"}
            >
              us
            </Button>
            <Button
              onClick={changeToJp}
              code={"jp"}
            >
              jp
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LanButton;
