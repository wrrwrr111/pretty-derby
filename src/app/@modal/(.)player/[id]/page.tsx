import dbJSON from "@/assert/db.json";
import Modal from "@/components/Modal";
import Link from "next/link";
import { DB } from "typings";

export default function PlayerModal({ params }: { params: { id: string } }) {
  const player = (dbJSON as DB).players.find((player) => player.id === params.id);
  const skills = player?.skillList.map((skillId) => {
    return (dbJSON as DB).skills.find((skill) => skill.id === skillId);
  });
  console.log("🚀 ~ file: page.tsx:6 ~ PlayerModal ~ params.id:", params.id);
  // json序列化返回
  return (
    <Modal>
      <h1>{player?.name}</h1>
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill) => {
          return (
            <Link
              key={`skill_${skill?.id}`}
              href={`/skill/${skill?.id}`}
              className="w-20 overflow-hidden"
            >
              <h2>{skill?.name}</h2>
              {/* <p>{skill?.describe}</p> */}
            </Link>
          );
        })}
      </div>
      <pre>{JSON.stringify(player, null, 2)}</pre>
    </Modal>
  );
}
