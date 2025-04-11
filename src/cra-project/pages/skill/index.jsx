import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Dialog, Typography, IconButton } from "@material-tailwind/react";
import { Xmark } from "iconoir-react";

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

  localStorage.getItem("supportMode") === null &&
    localStorage.setItem("supportMode", 0);

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

          <Dialog size="lg" open={show} onOpenChange={setShow}>
            <Dialog.Overlay>
              <Dialog.Content>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <Typography type="h6">筛选技能</Typography>
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
                  <SkillFilterForm onUpdate={setSkillList} />
                </div>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog>
        </>
      )}

      <SkillList
        className="w-full md:w-3/4"
        dataList={skillList}
        sortFlag={true}
      />
    </>
  );
};

export default Skill;
