import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDB } from "@/hooks";
import { useTranslation } from "react-i18next";
import dbL from "@/dbL";
import SupportList from "@/components/support/SupportList";
import SupportFilterForm from "@/components/support/SupportFilterForm";
import useViewport from "@/utils/useViewport";

const SupportListWithFilter = (props) => {
  const { onClick, limitHeight, formName } = props;
  const { t } = useTranslation();
  const viewport = useViewport();
  const [showFilter, setShowFilter] = useState(false);
  const [list, setList] = useState(props.supportList || []);
  const [chooseMode, setChooseMode] = useState(false);
  const [showMode, setShowMode] = useState(false);
  const [chosenList, setChosenList] = useState(dbL.get("mySupports").value() || []);

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
    <div className="flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      {viewport?.width >= 768 ? (
        <div className="sticky top-20 hidden md:flex w-1/4 flex-col p-1 gap-2">
          <ScrollArea className="h-[calc(100vh-120px)] pr-3">
            <Button variant="outline" onClick={changeShowMode}>
              {t(showMode ? "取消高亮" : "高亮我的卡组")}
            </Button>
            <Button variant="outline" onClick={changeChooseMode}>
              {t(chooseMode ? "配置完成" : "配置卡组")}
            </Button>
            <SupportFilterForm formName={formName} onUpdate={setList} />
          </ScrollArea>
        </div>
      ) : (
        <>
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            className="md:hidden fixed top-20 z-40 bg-background/80 backdrop-blur"
            onClick={() => setShowFilter(true)}
          >
            {t("筛选")}
          </Button>

          {/* Mobile Filter Dialog */}
          <Dialog open={showFilter} onOpenChange={setShowFilter}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("筛选支援卡")}</DialogTitle>
              </DialogHeader>
              <SupportFilterForm formName={formName} onUpdate={setList} />
            </DialogContent>
          </Dialog>
        </>
      )}

      {/* Main Content */}
      <div className={`${limitHeight ? "h-[80vh]" : ""} ${viewport?.width >= 768 ? "w-3/4" : "w-full"}`}>
        <ScrollArea className={limitHeight ? "h-full" : ""}>
          <SupportList
            className="justify-between"
            sortFlag={true}
            dataList={list}
            ownList={showMode ? chosenList : null}
            onClick={chooseMode ? onSelect : onClick}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default SupportListWithFilter;
