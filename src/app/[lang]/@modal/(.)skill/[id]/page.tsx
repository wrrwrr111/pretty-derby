import dbJSON from "@/assert/db.json";
import Modal from "@/components/Modal";
import { DB } from "typings";

export default async function PlayerModal(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
