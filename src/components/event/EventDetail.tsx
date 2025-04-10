// components/event/EventDetail.tsx
"use client";

import { useTranslation } from "react-i18next";
import SkillList from "../skill/SkillList";

interface EventDetailProps {
  data: any;
}

export default function EventDetail({ data }: EventDetailProps) {
  const { t } = useTranslation();

  if (!data) return null;

  return (
    <div className="space-y-3">
      <div className="text-lg font-semibold">{data.name}</div>
      <div className="text-muted-foreground">{t(data.name)}</div>

      <div className="space-y-2">
        {data.choiceList.map((choice: any, index: number) => (
          <div
            key={index}
            className={`flex p-2 rounded ${index % 2 === 0 ? "bg-muted" : "bg-background"}`}
          >
            <div className="w-1/3 font-medium mr-4">
              <p>{choice[0]}</p>
              <p className="text-muted-foreground">{t(choice[0])}</p>
            </div>
            <div className="flex-1 space-y-1">
              {choice[1].map((result: string, idx: number) => (
                <p key={idx}>{result}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {data.skills?.length > 0 && (
        <>
          <div className="font-semibold">{t("技能")}</div>
          <SkillList idList={data.skills} />
        </>
      )}
    </div>
  );
}
