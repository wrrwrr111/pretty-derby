// components/player/PlayerItem.tsx
import Image from "next/image";
import { CDN_SERVER } from "@/config";
import { Badge } from "@/components/ui/badge";

export async function PlayerItem({
  data,
  t,
}: {
  data: any;
  t: (key: string) => string;
}) {
  const { name, imgUrl, charaName } = data;

  return (
    <div className="flex items-center gap-4">
      <Image
        src={CDN_SERVER + imgUrl}
        alt={name}
        width={64}
        height={64}
        className="rounded-md border"
      />
      <div className="space-y-1">
        <div className="text-lg font-semibold">
          {name} <Badge variant="secondary">{t(name)}</Badge>
        </div>
        <div className="text-muted-foreground">
          {charaName} <Badge variant="outline">{t(charaName)}</Badge>
        </div>
      </div>
    </div>
  );
}
