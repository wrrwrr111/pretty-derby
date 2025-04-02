import dbJSON from "@/assert/db.json";
import Modal from "@/components/Modal";
import Link from "next/link";
import { DB } from "@/DB";
import { DialogTitle } from "@radix-ui/react-dialog";
import { getTranslation } from "@/i18n";

export default async function PlayerModal(props: { params: Promise<{ id: string,lang: string }> }) {
  const { id,lang } = await props.params;
  const { t } = await getTranslation(lang);
  const player = (dbJSON as DB).players.find((player) => player.id === id);

  if (!player) {
    return <div>player not found</div>;
  }

  const skills = player.skillList.map((skillId) => {
    return (dbJSON as DB).skills.find((skill) => skill.id === skillId);
  });
  console.log("🚀 ~ file: page.tsx:6 ~ PlayerModal ~ id:", id);
  // json序列化返回

  return (
    <Modal>

      <DialogTitle>{player.name}</DialogTitle>
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill) => {
          return (
            <Link
              key={`skill_${skill?.id}`}
              href={`/${lang}/skill/${skill?.id}`}
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
