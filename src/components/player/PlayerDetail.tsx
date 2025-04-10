"use server";

// components/player/PlayerDetail.tsx
import EventList from "../event/EventList";
import SkillList from "../skill/SkillList";
// import RaceTimeline from "../race/RaceTimeline";
import { PlayerItem } from "./PlayerItem";
import { AdaptBox, GrowBox } from "./Boxes";
import dbJSON from "@/assert/db.json";
import { Section } from "./Section";
import { getTranslation } from "@/i18n";

interface PlayerDetailProps {
  data: any;
  isNur?: boolean;
}

export default async function PlayerDetail({ data, isNur }: PlayerDetailProps) {
  const { t } = await getTranslation();
  return (
    <div className="space-y-4">
      <PlayerItem data={data} t={t} />
      {isNur ? (
        <>
          <Section title={t("多选项事件")}>
            <EventList
              dataList={data.eventList0.reduce((list, cur) => {
                return [...list, dbJSON.events.find((e) => e.id === cur)];
              }, [])}
            />
          </Section>
          <Section title={t("赛后事件")}>
            <EventList
              dataList={data.eventList2.reduce((list, cur) => {
                return [...list, dbJSON.events.find((e) => e.id === cur)];
              }, [])}
            />
          </Section>
          <Section title={t("通用事件")}>
            <EventList
              // idList={data.eventList3}
              dataList={data.eventList3.reduce((list, cur) => {
                return [...list, dbJSON.events.find((e) => e.id === cur)];
              }, [])}
            />
          </Section>
          <Section title={t("隐藏事件")}>
            <EventList
              dataList={data.hideEvent.reduce((list, cur) => {
                return [...list, dbJSON.events.find((e) => e.id === cur)];
              }, [])}
              type="all"
            />
          </Section>
          <Section title={t("赛程")}>
            111
            {/* <RaceTimeline raceList={data.raceList} showButton={false} /> */}
          </Section>
          <Section title={t("技能")}>
            <SkillList
              dataList={data.skillList.reduce((list, cur) => {
                return [...list, dbJSON.skills.find((e) => e.id === cur)];
              }, [])}
            />
          </Section>
        </>
      ) : (
        <>
          <AdaptBox player={data} />
          <GrowBox player={data} />
          <Section title={t("技能")}>
            <SkillList
              dataList={data.skillList.reduce((list, cur) => {
                return [...list, dbJSON.skills.find((e) => e.id === cur)];
              }, [])}
            />
          </Section>
          <Section title={t("多选项事件")}>
            <EventList
              dataList={data.eventList0.reduce((list, cur) => {
                return [...list, dbJSON.events.find((e) => e.id === cur)];
              }, [])}
            />
          </Section>
          <Section title={t("无选项事件")}>
            <EventList
              dataList={data.eventList1.reduce((list, cur) => {
                return [...list, dbJSON.events.find((e) => e.id === cur)];
              }, [])}
            />
          </Section>
          <Section title={t("赛后事件")}>
            <EventList
              dataList={data.hideEvent.reduce((list, cur) => {
                return [...list, dbJSON.events.find((e) => e.id === cur)];
              }, [])}
            />
          </Section>
          <Section title={t("通用事件")}>
            <EventList
              dataList={data.eventList3.reduce((list, cur) => {
                return [...list, dbJSON.events.find((e) => e.id === cur)];
              }, [])}
            />
          </Section>
          <Section title={t("隐藏事件")}>
            <EventList
              dataList={data.eventList4.reduce((list, cur) => {
                return [...list, dbJSON.events.find((e) => e.id === cur)];
              }, [])}
            />
          </Section>
          <Section title={t("赛程")}>
            111
            {/* <RaceTimeline raceList={data.raceList} /> */}
          </Section>
        </>
      )}
    </div>
  );
}
