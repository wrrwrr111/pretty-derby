import dbJSON from "@/assert/db.json";
import Modal from "@/components/Modal";
import { DB } from "../../../../../assert/DB";
import { DialogTitle } from "@radix-ui/react-dialog";

export default async function PlayerModal(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const skill = (dbJSON as DB).skills.find((skill) => skill.id === params.id);

  if (!skill) {
    return <div>player not found</div>;
  }

  console.log("🚀 ~ file: page.tsx:6 ~ PlayerModal ~ params.id:", params.id);
  // json序列化返回

  return (
    <Modal>
      <DialogTitle>{skill.name}</DialogTitle>
      <pre>{JSON.stringify(skill, null, 2)}</pre>
    </Modal>
  );
}
