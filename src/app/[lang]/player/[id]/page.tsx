import dbJSON from "@/assert/db.json";
import { DB } from "../../../../../DB";
export default async function PlayerPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const player = (dbJSON as DB).players.find((player) => player.id === params.id);
  // json序列化返回
  return <pre className="block">{JSON.stringify(player, null, 2)}</pre>;
}
