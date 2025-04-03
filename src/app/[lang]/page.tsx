import dbJSON from "@/assert/db.json";
import { CDN_SERVER } from "@/config";
import Link from "next/link";
import { getTranslation } from "@/i18n";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export default async function TestPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  const players = (dbJSON as any).players;
  return (
    <div className="flex flex-wrap justify-between gap-1">
      {players.map((player: any) => {
        return (
          <Link
            key={`player_${player.id}`}
            href={`/${lang}/player/${player.id}`}
            className="basis-24"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-pointer">
                  <div className="w-24 rounded-sm">
                    <AspectRatio ratio={32 / 35}>
                      <img
                        className="h-[unset]! w-full"
                        alt={t(player.name)}
                        src={CDN_SERVER + player.imgUrl}
                      />
                    </AspectRatio>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm font-semibold">{t(player.name)}</p>
                  <p className="text-xs">{t(player.charaName)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        );
      })}
    </div>
  );
}
