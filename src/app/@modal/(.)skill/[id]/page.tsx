import dbJSON from "@/assert/db.json";
import Modal from "@/components/Modal";
import { DB } from "typings";

export default function PlayerModal({ params }: { params: { id: string } }) {
  const skill = (dbJSON as DB).skills.find((skill) => skill.id === params.id);
  console.log("🚀 ~ file: page.tsx:6 ~ PlayerModal ~ params.id:", params.id);
  // json序列化返回
  return (
    <Modal>
      <h1>{skill?.name}</h1>
      <pre>{JSON.stringify(skill, null, 2)}</pre>
    </Modal>
  );
}
