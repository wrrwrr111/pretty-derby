import { CDN_SERVER, SKILL_TYPES } from "@/config";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { getTranslation } from "@/i18n";
import { Skill } from "@/types";

export default async function SkillDetail({ data }: { data: Skill }) {
  const { t } = await getTranslation();
  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <img
            src={"/" + data.imgUrl}
            alt={t(data.name)}
            className="h-16 w-16 rounded"
          />
          <div>
            <h1 className="text-xl font-semibold">{t(data.name)}</h1>
            <p className="text-muted-foreground text-sm">{data.name}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <div>
            <h2 className="font-medium">{t("技能描述")}</h2>
            <p>{t(data.describe)}</p>
            <p className="text-muted-foreground text-sm">{data.describe}</p>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium">{t("触发条件")}</h2>
            <p>{t(data.condition)}</p>
            <p className="text-muted-foreground text-sm">{data.condition}</p>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium">{t("技能效果")}</h2>
            <div className="flex flex-wrap gap-2">
              {data.ability?.map((ability, index) => {
                return (
                  <Badge key={index}>
                    {SKILL_TYPES[ability.type]} {ability.value / 10000}
                  </Badge>
                );
              })}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium">{t("持续时间")}</h2>
            <p>{`${data.ability_time / 10000}s * ${t("赛道长度")} / 1000`}</p>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium">{t("冷却时间")}</h2>
            <p>{`${data.cooldown / 10000}s * ${t("赛道长度")} / 1000`}</p>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium">{t("技能价格")}</h2>
            <p>{data.need_skill_point}</p>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium">{t("技能评分")}</h2>
            <p>{data.grade_value}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
