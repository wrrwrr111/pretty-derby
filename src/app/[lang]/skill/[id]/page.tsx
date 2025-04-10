import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import dbJSON from "@/assert/db.json";
import { SKILL_TYPES, CDN_SERVER } from "@/config";
import { getTranslation } from "@/i18n"; // 你根据实际路径替换
import type { Skill } from "@/types"; // 上面定义的类型

interface Props {
  params: { id: string };
}

export default async function SkillDetailPage({ params }: Props) {
  const skill = (dbJSON as any).skills.find((s: Skill) => s.id === params.id);
  const { t } = await getTranslation();

  if (!skill) return notFound();

  return (
    <Card className="p-4">
      <CardContent>
        <SkillDetail data={skill} t={t} isNur={false} />
      </CardContent>
    </Card>
  );
}
