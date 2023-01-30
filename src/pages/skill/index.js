import React, { useState } from "react";

import { Button, Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

import SkillList from "src/components/skill/SkillList";
import SkillFilterForm from "src/components/skill/SkillFilterForm";

import { useAtom } from "jotai";
import { skillsAtom } from "../../hooks/atoms";

// const TITLE = "技能 - 乌拉拉大胜利 - 赛马娘资料站";

const Skill = (props) => {
  const [skills] = useAtom(skillsAtom);
  const [open, setOpen] = useState(false);
  const [skillList, setSkillList] = useState(skills);
  // init supportMode

  return (
    <div className="container mx-auto flex">
      <div className="sticky top-20 hidden h-[calc(100vh_-_120px)] w-1/4 flex-col overflow-auto p-1 md:flex">
        <SkillFilterForm onUpdate={setSkillList} />
      </div>
      <Button className="fixed top-20 z-40 bg-opacity-80 md:hidden" onClick={() => setOpen(true)}>
        筛选
      </Button>
      <Dialog size="lg" open={open} handler={setOpen}>
        <DialogHeader handler={setOpen}>{"筛选技能"}</DialogHeader>
        <DialogBody className="flex flex-col">
          <SkillFilterForm onUpdate={setSkillList} />
        </DialogBody>
      </Dialog>
      <SkillList className="w-full md:w-3/4" dataList={skillList} sortFlag={true} />
    </div>
  );
};

export default Skill;
