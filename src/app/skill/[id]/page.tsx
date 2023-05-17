import dbJSON from "@/assert/db.json";
import { DB } from "typings";
export default function PlayerPage({ params }: { params: { id: string } }) {
  const skill = (dbJSON as DB).skills.find((skill) => skill.id === params.id);
  // json序列化返回
  return <pre className="block">{JSON.stringify(skill, null, 2)}</pre>;
}
