import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useDB } from "@/hooks/useDB";
import { getDate, getGolds, getColor } from "./race-utils";

interface RaceTimelineProps {
  raceList?: Record<number, any>;
  filterRace?: Record<number, any[]>;
  showButton?: boolean;
}

const RaceTimeline: React.FC<RaceTimelineProps> = React.memo(({
  raceList,
  filterRace,
  showButton
}) => {
  const { t } = useTranslation();
  const [showSpare, setShowSpare] = useState(false);
  const { db } = useDB();
  if (!db) return null;

  return (
    <div className="space-y-4">
      {showButton && (
        <Button onClick={() => setShowSpare(!showSpare)}>
          {showSpare ? t("隐藏空闲月份") : t("显示空闲月份")}
        </Button>
      )}

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-300" />

        <div className="space-y-8 pl-8">
          {Array.from({ length: 72 - 13 }, (_, i) => i + 13).map((i) => {
            if (raceList && raceList[i]) {
              const id = raceList[i].id;
              const curRace = db.chain.get("races").find({ id }).value();
              const golds = getGolds(curRace);
              return (
                <div key={`race-${id}`} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1/2 -ml-4 h-3 w-3 -translate-y-1/2 transform rounded-full bg-red-500" />
                  {/* Timeline content */}
                  <div className="rounded-lg border bg-white p-3 shadow-sm">
                    <div className="text-sm font-medium text-gray-500">{getDate(i)}</div>
                    <div className="mt-1 text-base">
                      {`${curRace.grade} / ${curRace.distanceType} / ${curRace.distance} / ${curRace.name} / ${
                        raceList[i].goal || "参赛"
                      }${golds ? " / " + golds : ""}`}
                    </div>
                  </div>
                </div>
              );
            } else if (filterRace && filterRace[i]) {
              return filterRace[i].map((id, index) => {
                const curRace = db.chain.get("races").find({ id }).value();
                const golds = getGolds(curRace);
                const color = getColor(curRace.grade);
                return (
                  <div key={`filter-${id}`} className="relative">
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-0 top-1/2 -ml-4 h-3 w-3 -translate-y-1/2 transform rounded-full bg-${color}-500`}
                    />
                    {/* Timeline content */}
                    <div className="rounded-lg border bg-white p-3 shadow-sm">
                      {index === 0 && (
                        <div className="text-sm font-medium text-gray-500">{getDate(i)}</div>
                      )}
                      <div className="mt-1 text-sm">
                        {`${curRace.grade} / ${curRace.distanceType} / ${curRace.distance} / ${curRace.name}${
                          golds ? " / " + golds : ""
                        }`}
                      </div>
                    </div>
                  </div>
                );
              });
            } else if (showSpare) {
              return (
                <div key={`empty-${i}`} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1/2 -ml-4 h-3 w-3 -translate-y-1/2 transform rounded-full bg-gray-300" />
                  {/* Timeline content (empty) */}
                  <div className="text-sm text-gray-400">{getDate(i)}</div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
});

export default RaceTimeline;
