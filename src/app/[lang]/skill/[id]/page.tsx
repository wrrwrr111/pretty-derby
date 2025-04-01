import dbJSON from "@/assert/db.json";
import { DB } from "typings";
export default async function PlayerPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const skill = (dbJSON as DB).skills.find((skill) => skill.id === params.id);
  // json序列化返回
  return <pre className="block">{JSON.stringify(skill, null, 2)}</pre>;
}
