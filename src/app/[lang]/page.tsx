import dbJSON from "@/assert/db.json";
import { CDN_SERVER } from "@/config";
import Link from "next/link";
import { getTranslation } from "@/i18n"

export default async function TestPage({params}: { params: { lang: string}, }) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  const players = (dbJSON as any).players;
  return (
    <div className="flex flex-wrap gap-1">
      {players.map((player: any) => {
        return (
          <Link
            key={`player_${player.id}`}
            href={`/${lang}/player/${player.id}`}
            className="max-w-1/4 w-24 p-1"
          >
            {/* <div className={`relative cursor-pointer pb-[100%]`}>
              <div className="absolute bottom-2 left-1 right-1 top-3 flex flex-wrap items-center justify-center rounded-lg border-2 border-solid border-gray-500">
                <p className="truncate">{t(player.charaName)}</p>
                <p className="truncate">{t(player.name)}</p>
              </div>
              <img
                className="absolute top-0 aspect-32/35 w-full"
                alt={t(player.name)}
                src={CDN_SERVER + player.imgUrl}
              />
            </div> */}
            <div className="avatar">
              <div className="w-24 rounded-sm">
                <img
                  className="aspect-32/35 h-[unset]! w-full"
                  alt={t(player.name)}
                  src={CDN_SERVER + player.imgUrl}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
