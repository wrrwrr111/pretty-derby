// import classnames from "classnames";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { Dialog, Typography, IconButton } from "@material-tailwind/react";
import { Xmark } from "iconoir-react";

import { useDB } from "../../hooks";
import { useTranslation } from "react-i18next";
import dbL from "@cra/dbL";

import SupportList from "@cra/components/support/SupportList";
import SupportFilterForm from "@cra/components/support/SupportFilterForm";
import useViewport from "@cra/utils/useViewport";

const SupportListWithFilter = (props) => {
  const { onClick, limitHeight, formName } = props;
  const { t } = useTranslation();
  const viewport = useViewport();
  const [show, setShow] = React.useState(false);
  const [list, setList] = useState(props.supportList || []);
  const [chooseMode, setChooseMode] = useState(false);
  const [showMode, setShowMode] = useState(false);
  const [chosenList, setChosenList] = useState(
    dbL.get("mySupports").value() || []
  );

  const db = useDB();
  useEffect(() => {
    if (db) setList(props.supportList || db.get("supports").value() || []);
  }, [db, props.supportList]);
  if (!db) return null;
  const changeChooseMode = () => {
    setShowMode(!showMode);
    setChooseMode(!chooseMode);
  };

  const changeShowMode = () => {
    setShowMode(!showMode);
  };

  const onSelect = (item) => {
    let tmpList = [...chosenList];
    const index = tmpList.indexOf(item.id);
    if (index === -1) {
      tmpList.push(item.id);
    } else {
      tmpList.splice(index, 1);
    }
    dbL.update("mySupports", tmpList).write();
    setChosenList([...tmpList]);
  };

  return (
    <>
      {viewport?.width >= 768 ? (
        <div
          className="sticky top-20 hidden md:flex w-1/4 flex-col p-1 overflow-auto"
          style={{
            height: "calc(100vh - 120px)",
          }}
        >
          <Button
            className="my-1 flex-shrink-0"
            onClick={changeShowMode}
            ripple="light"
          >
            {t("高亮我的卡组")}
          </Button>
          <Button
            className="my-1 flex-shrink-0"
            onClick={changeChooseMode}
            ripple="light"
          >
            {t("配置卡组")}
          </Button>
          {chooseMode && (
            <Button
              className="my-1 flex-shrink-0"
              onClick={changeChooseMode}
              ripple="light"
            >
              {t("配置完成")}
            </Button>
          )}
          <SupportFilterForm formName={formName} onUpdate={setList} />
        </div>
      ) : (
        <>
          <Button
            className="md:hidden fixed top-20 z-40 bg-opacity-80"
            onClick={() => setShow(true)}
          >
            筛选
          </Button>
          <Dialog size="lg" open={show} onOpenChange={setShow}>
            <Dialog.Overlay>
              <Dialog.Content>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <Typography type="h6">筛选支援卡</Typography>
                  <Dialog.DismissTrigger
                    as={IconButton}
                    size="sm"
                    variant="ghost"
                    color="secondary"
                    isCircular
                    className="absolute right-2 top-2"
                  >
                    <Xmark className="h-5 w-5" />
                  </Dialog.DismissTrigger>
                </div>

                <div className="flex flex-col ">
                  <SupportFilterForm formName={formName} onUpdate={setList} />
                </div>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog>
        </>
      )}

      <SupportList
        className={`md:w-3/4 justify-between ${
          limitHeight && "h-80vh overflow-auto"
        }`}
        sortFlag={true}
        dataList={list}
        ownList={showMode ? chosenList : null}
        onClick={chooseMode ? onSelect : onClick}
      />
    </>
  );
};
export default SupportListWithFilter;
