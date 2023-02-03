import React from "react";
import SupportList from "../support/SupportList";
import { PlayerList } from "../player/PlayerList";

import { SKILL_TYPES, CDN_SERVER } from "@/config";

import { useTranslation } from "react-i18next";
import { atom, useAtom, Provider, useAtomValue } from "jotai";
import { skillsAtom, supportsAtom, playersAtom, skillAtomFamily } from "../../hooks/atoms";
import useTilg from "tilg";

export const skillDetailIdAtom = atom("");

const skillDetailSupportsAtom = atom((get) => {
  const id = get(skillDetailIdAtom);
  const supports = get(supportsAtom);
  return supports
    .filter((support) => support.skillList.includes(id))
    .sort((a, b) => b.rarity - a.rarity);
});

const skillDetailPlayersAtom = atom((get) => {
  const id = get(skillDetailIdAtom);
  const players = get(playersAtom);
  return players
    .filter((player) => player.skillList.includes(id))
    .sort((a, b) => Number(b.rare) - Number(a.rare));
});

const SkillDetail = ({ isNur = false }) => {
  const { t } = useTranslation();
  const id = useAtomValue(skillDetailIdAtom);
  const data = useAtomValue(skillAtomFamily({ id }));

  const skillDetailSupports = useAtomValue(skillDetailSupportsAtom);
  const skillDetailPlayers = useAtomValue(skillDetailPlayersAtom);

  useTilg({ skillDetailSupports, skillDetailPlayers });

  if (!data) return null;
  return (
    <div className="flex w-full max-w-[calc(100vw_-_40px)] flex-col p-3">
      <div className="mb-1 flex w-full items-center bg-gray-100">
        <div className="flex w-20 items-center justify-center">
          <img alt={data.name} src={CDN_SERVER + data.imgUrl} className="w-14" />
        </div>
        <div className="flex-auto">
          <p>{t(data.name)}</p>
          <p className="text-gray-500">{data.name}</p>
        </div>
      </div>
      <div className="mb-1 flex w-full">
        <div className="w-20 flex-shrink-0 text-center">{t("技能描述")}</div>
        <div className="flex-auto">
          <p>{t(data.describe)}</p>
          <p className="text-gray-500">{data.describe}</p>
        </div>
      </div>
      <div className="mb-1 flex w-full bg-gray-100">
        <div className="w-20 flex-shrink-0 text-center">{t("触发条件")}</div>
        <div className="flex-auto">
          <p>{t(data.condition)}</p>
          <p className="text-gray-500">{data.condition}</p>
        </div>
      </div>
      <div className="mb-1 flex w-full">
        <div className="w-20 flex-shrink-0 text-center">{t("技能效果")}</div>
        <div className="flex-auto">
          {data.ability?.map((ability) => {
            return (
              <span key={ability.type}>{`${SKILL_TYPES[ability.type]} ${
                ability.value / 10000
              }`}</span>
            );
          })}
        </div>
      </div>
      <div className="mb-1 flex w-full bg-gray-100">
        <div className="w-20 flex-shrink-0 text-center">{t("持续时间")}</div>
        <div className="flex-auto">{`${data.ability_time / 10000}s * ${t(
          "赛道长度"
        )} / 1000}`}</div>
      </div>
      <div className="mb-1 flex w-full">
        <div className="w-20 flex-shrink-0 text-center">{t("冷却时间")}</div>
        <div className="flex-auto">{`${data.cooldown / 10000}s * ${t("赛道长度")} / 1000`}</div>
      </div>
      <div className="mb-1 flex w-full bg-gray-100">
        <div className="w-20 flex-shrink-0 text-center">{t("技能价格")}</div>
        <div className="flex-auto">{data.need_skill_point}</div>
      </div>
      <div className="mb-1 flex w-full">
        <div className="w-20 flex-shrink-0 text-center">{t("技能评分")}</div>
        <div className="flex-auto">{data.grade_value}</div>
      </div>
      {!isNur && (
        <>
          {skillDetailSupports.length > 0 && (
            <>
              <div>{t("支援卡")}</div>
              <SupportList className="w-full" dataList={skillDetailSupports} sortFlag={false} />
            </>
          )}
          {skillDetailPlayers.length > 0 && (
            <>
              <div>{t("角色")}</div>
              <PlayerList dataList={skillDetailPlayers} />
            </>
          )}
          {/* {data.events?.length > 0 && (
            <>
              <div>{t("事件")}</div>
              <EventList className="w-full" idList={data.events} />
            </>
          )} */}
        </>
      )}
    </div>
  );
};

export default SkillDetail;
