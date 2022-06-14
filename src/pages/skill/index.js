import React, { useEffect, useState } from "react";
import { useDidRecover } from "react-router-cache-route";

import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import Button from "@material-tailwind/react/Button";

import SkillList from "@/components/skill/SkillList";
import SkillFilterForm from "@/components/skill/SkillFilterForm";

import useViewport from "@/utils/useViewport";

import { useDB } from "../../hooks";
const TITLE = "技能 - 乌拉拉大胜利 - 赛马娘资料站";

document.title = TITLE;
const Skill = (props) => {
  const viewport = useViewport();
  const [show, setShow] = React.useState(false);
  useDidRecover(() => {
    document.title = TITLE;
  });
  const [skillList, setSkillList] = useState();
  const db = useDB();
  useEffect(() => {
    if (db) {
      const allSkillList = db.get("skills").orderBy("db_id").value();
      setSkillList(allSkillList);
    }
  }, [db]);
  // 所有技能列表

  if (!db) return null;
  // init supportMode
  localStorage.getItem("supportMode") === null && localStorage.setItem("supportMode", 0);

  return (
    <>
      {viewport?.width >= 768 ? (
        <div
          className="sticky top-20 hidden md:flex w-1/4 flex-col p-1 overflow-auto"
          style={{
            height: "calc(100vh - 120px)",
          }}
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
          <Modal size={"lg"} active={show} toggler={() => setShow(false)}>
            <ModalHeader toggler={() => setShow(false)}>{"筛选技能"}</ModalHeader>
            <ModalBody className="flex flex-col">
              <SkillFilterForm onUpdate={setSkillList} />
            </ModalBody>
          </Modal>
        </>
      )}

      <SkillList className="w-full md:w-3/4" dataList={skillList} sortFlag={true} />
    </>
  );
};

export default Skill;
