import React, { useState } from "react";

import { Dialog, DialogBody, Button } from "@material-tailwind/react";

import i18n from "src/i18n";
const LanButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const changeLanguage = (lan) => {
    i18n.changeLanguage(lan);
    setOpen(false);
  };
  return (
    <>
      <Button size="sm" color="lightBlue" onClick={() => setOpen(true)} ripple="light">
        {i18n.language}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          <div className="grid grid-cols-3 gap-3">
            <Button onClick={() => changeLanguage("zh_CN")}>zh_CN</Button>
            <Button className="cursor-pointer" onClick={() => changeLanguage("en")}>
              en
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default LanButton;
