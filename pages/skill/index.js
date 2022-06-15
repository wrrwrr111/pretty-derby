import React, { useEffect, useState } from "react";

import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import Button from "@material-tailwind/react/Button";

import SkillList from "components/skill/SkillList";
import SkillFilterForm from "components/skill/SkillFilterForm";

import { useAppContext } from "context/state";
// const TITLE = "技能 - 乌拉拉大胜利 - 赛马娘资料站";

const Skill = (props) => {
  const { skills } = useAppContext();
  const [show, setShow] = React.useState(false);
  const [skillList, setSkillList] = useState(skills);
  // init supportMode

  return (
    <div className="container mx-auto flex">
      <div
        className="sticky top-20 hidden md:flex w-1/4 flex-col p-1 overflow-auto"
        style={{
          height: "calc(100vh - 120px)",
        }}
      >
        <SkillFilterForm onUpdate={setSkillList} />
      </div>
      <Button className="md:hidden fixed top-20 z-40 bg-opacity-80" onClick={() => setShow(true)}>
        筛选
      </Button>
      <Modal size={"lg"} active={show} toggler={() => setShow(false)}>
        <ModalHeader toggler={() => setShow(false)}>{"筛选技能"}</ModalHeader>
        <ModalBody className="flex flex-col">
          <SkillFilterForm onUpdate={setSkillList} />
        </ModalBody>
      </Modal>
      <SkillList className="w-full md:w-3/4" dataList={skillList} sortFlag={true} />
    </div>
  );
};

export default Skill;
