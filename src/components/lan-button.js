import React, { useState } from "react";

import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import Button from "@material-tailwind/react/Button";

import i18n from "../i18n";
const LanButton = (props) => {
  const [show, setShow] = useState(false);
  const changeLanguage = (lan) => {
    i18n.changeLanguage(lan);
    setShow(false);
  };
  return (
    <>
      <Button size="sm" color="lightBlue" onClick={() => setShow(true)} ripple="light">
        {i18n.language}
      </Button>
      <Modal active={show} toggler={() => setShow(false)}>
        <ModalBody>
          <div className="grid grid-cols-3 gap-3">
            <Button onClick={() => changeLanguage("zh_CN")}>zh_CN</Button>
            <Button className="cursor-pointer" onClick={() => changeLanguage("en")}>
              en
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LanButton;
