// app/player/[id]/page.tsx
import { notFound } from "next/navigation";
import dbJSON from "@/assert/db.json";
import { Card, CardContent } from "@/components/ui/card";
import PlayerDetail from "@/components/player/PlayerDetail";
import { getTranslation } from "@/i18n"; // 你需要创建一个用于 SSR 的翻译方法

export default async function PlayerPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const player = (dbJSON as any).players.find((p) => p.id === id);

  if (!player) return notFound();

  const { t } = await getTranslation(); // SSR 方式处理翻译

  return (
    <Card className="p-4">
      <CardContent>
        <PlayerDetail data={player} isNur={false} />
      </CardContent>
    </Card>
  );
}
