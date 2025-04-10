import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SkillList from "@cra/components/skill/SkillList";
import SkillFilterForm from "@cra/components/skill/SkillFilterForm";

import useViewport from "@cra/utils/useViewport";

import { useDB } from "../../hooks";

const Skill = (props) => {
  const viewport = useViewport();
  const [show, setShow] = React.useState(false);
  const [skillList, setSkillList] = useState();
  const db = useDB();

  useEffect(() => {
    if (db) {
      const allSkillList = db.get("skills").orderBy("db_id").value();
      setSkillList(allSkillList);
    }
  }, [db]);

  if (!db) return null;

  localStorage.getItem("supportMode") === null && localStorage.setItem("supportMode", 0);

  return (
    <>
      <Helmet>
        <title>技能 - 乌拉拉大胜利 - 赛马娘资料站</title>
      </Helmet>

      {viewport?.width >= 768 ? (
        <div
          className="sticky top-20 hidden md:flex w-1/4 flex-col p-1 overflow-auto"
          style={{ height: "calc(100vh - 120px)" }}
        >
          <SkillFilterForm onUpdate={setSkillList} />
        </div>
      ) : (
        <>
          <Button
            className="md:hidden fixed top-20 z-40 bg-opacity-80"
            onClick={() => setShow(true)}
          >
            筛选
          </Button>
          <Dialog open={show} onOpenChange={setShow}>
            <DialogContent className="p-4">
              <DialogHeader>
                <DialogTitle>筛选技能</DialogTitle>
              </DialogHeader>
              <SkillFilterForm onUpdate={setSkillList} />
            </DialogContent>
          </Dialog>
        </>
      )}

      <SkillList className="w-full md:w-3/4" dataList={skillList} sortFlag={true} />
    </>
  );
};

export default Skill;
