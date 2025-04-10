import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import i18n from "../i18n";
const LanButton = () => {
  const [show, setShow] = useState(false);
  const changeLanguage = (lan) => {
    i18n.changeLanguage(lan);
    setShow(false);
  };
  return (
    <>
      <Button
        size="sm"
        color="lightBlue"
        onClick={() => setShow(true)}
        ripple="light"
      >
        {i18n.language}
      </Button>
      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent>
          <div className="grid grid-cols-3 gap-3">
            <Button onClick={() => changeLanguage("zh_CN")}>zh_CN</Button>
            <Button
              className="cursor-pointer"
              onClick={() => changeLanguage("en")}
            >
              en
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanButton;
