// import classnames from "classnames";
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

import { useTranslation } from "react-i18next";

import SupportList from "src/components/support/SupportList";
import SupportFilterForm from "src/components/support/SupportFilterForm";
import { atom, Atom, PrimitiveAtom, useAtom, WritableAtom } from "jotai";
import { supportsAtom, effectsAtom, eventsAtom } from "../../hooks/atoms";
// import { mySupportsAtom } from "../../hooks/localAtoms";
import { Support } from "typings";
import { atomWithStorage } from "jotai/utils";
import { atomWithImmer, useImmerAtom, withImmer } from "jotai-immer";

export const mySupportsAtom = atomWithStorage<string[]>("mySupports", []);

const SupportListWithFilter: React.FC<{
  supportList?: Support[];
  onClick?: Function;
  limitHeight?: boolean;
  formName?: string;
}> = ({ supportList, onClick, limitHeight, formName }) => {
  const [supports] = useAtom(supportsAtom);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(supportList || supports);
  const [chooseMode, setChooseMode] = useState(false);
  const [showMode, setShowMode] = useState(false);

  const [mySupports, setMySupports] = useImmerAtom(mySupportsAtom);

  const changeChooseMode = () => {
    setShowMode(!showMode);
    setChooseMode(!chooseMode);
  };

  const changeShowMode = () => {
    setShowMode(!showMode);
  };

  const onSelect = (item) => {
    setMySupports((draft) => {
      const index = draft.findIndex((id: string) => id === item.id);
      if (index !== -1) {
        return draft.splice(index, 1);
      }
      draft.push(item.id);
    });
  };

  return (
    <>
      <div className="sticky top-20 hidden h-[calc(100vh_-_120px)] w-1/4 flex-col overflow-auto p-1 md:flex">
        <Button className="my-1 flex-shrink-0" onClick={changeShowMode} variant="outlined">
          {t("高亮我的卡组")}
        </Button>
        <Button className="my-1 flex-shrink-0" onClick={changeChooseMode} variant="outlined">
          {t("配置卡组")}
        </Button>
        {chooseMode && (
          <Button className="my-1 flex-shrink-0" onClick={changeChooseMode} variant="outlined">
            {t("配置完成")}
          </Button>
        )}
        <SupportFilterForm formName={formName} onUpdate={setList} />
      </div>
      <Button className="fixed top-20 z-40 bg-opacity-80 md:hidden" onClick={() => setOpen(true)}>
        筛选
      </Button>
      <Dialog size="lg" open={open} handler={setOpen}>
        <DialogHeader>{"筛选支援卡"}</DialogHeader>
        <DialogBody className="flex flex-col">
          <SupportFilterForm formName={formName} onUpdate={setList} />
        </DialogBody>
      </Dialog>

      <SupportList
        className={`justify-between md:w-3/4 ${limitHeight && "h-[80vh] overflow-auto"}`}
        sortFlag={true}
        dataList={list}
        ownList={showMode ? mySupports : null}
        onClick={chooseMode ? onSelect : onClick}
      />
    </>
  );
};
export default SupportListWithFilter;
