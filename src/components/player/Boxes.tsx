// components/player/Boxes.tsx
import { Card, CardContent } from "@/components/ui/card";
import { getTranslation } from "@/i18n";

export async function AdaptBox({ player }: { player: any }) {
  const { t } = await getTranslation();

  return (
    <Card>
      <CardContent className="grid grid-cols-5 gap-2 p-4">
        <Label>{t("场地适应")}</Label>
        <Grade label={t("芝")} grade={player.grass} />
        <Grade label={t("ダート")} grade={player.dirt} />
        <div className="col-span-2" />

        <Label>{t("赛程适应")}</Label>
        <Grade label={t("短距離")} grade={player.shortDistance} />
        <Grade label={t("マイル")} grade={player.mile} />
        <Grade label={t("中距離")} grade={player.mediumDistance} />
        <Grade label={t("長距離")} grade={player.longDistance} />

        <Label>{t("脚质适应")}</Label>
        <Grade label={t("逃げ")} grade={player.escape} />
        <Grade label={t("先行")} grade={player.leading} />
        <Grade label={t("差し")} grade={player.insert} />
        <Grade label={t("追込")} grade={player.tracking} />
      </CardContent>
    </Card>
  );
}

// 继续在 Boxes.tsx 中

export async function GrowBox({ player }: { player: any }) {
  const { t } = await getTranslation();

  return (
    <Card>
      <CardContent className="grid grid-cols-5 gap-2 p-4">
        <Label>{t("スピード")}</Label>
        <Label>{t("スタミナ")}</Label>
        <Label>{t("パワー")}</Label>
        <Label>{t("根性")}</Label>
        <Label>{t("賢さ")}</Label>

        <Center>{player.speedGrow}</Center>
        <Center>{player.staminaGrow}</Center>
        <Center>{player.powerGrow}</Center>
        <Center>{player.gutsGrow}</Center>
        <Center>{player.wisdomGrow}</Center>
      </CardContent>
    </Card>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center rounded-md bg-green-200 p-1 text-sm font-medium text-green-900">
      {children}
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center">{children}</div>;
}

function Grade({ label, grade }: { label: string; grade: string }) {
  const colorMap: Record<string, string> = {
    S: "text-yellow-500",
    A: "text-orange-500",
    B: "text-purple-500",
    C: "text-green-500",
    D: "text-blue-400",
  };
  const colorClass = colorMap[grade] || "text-gray-500";

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm">{label}</span>
      <span className={`text-xl font-bold ${colorClass}`}>{grade}</span>
    </div>
  );
}
