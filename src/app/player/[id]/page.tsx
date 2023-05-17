import dbJSON from "@/assert/db.json";
import { DB } from "typings";
export default function PlayerPage({ params }: { params: { id: string } }) {
  const player = (dbJSON as DB).players.find((player) => player.id === params.id);
  // json序列化返回
  return <pre className="block">{JSON.stringify(player, null, 2)}</pre>;
}
