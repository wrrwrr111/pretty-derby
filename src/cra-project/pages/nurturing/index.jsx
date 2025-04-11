import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, Typography, IconButton } from "@material-tailwind/react";
import { Xmark } from "iconoir-react";

// import shortid from 'shortid'
// import axios from "axios";
import ScrollBars from "react-custom-scrollbars";
import { Popover } from "antd";

import { useDB } from "../../hooks";
import { useTranslation } from "react-i18next";

import dbL from "@cra/dbL";
import EventList from "@cra/components/event/EventList";
import SkillList from "@cra/components/skill/SkillList";
import { BuffButton } from "@cra/components/buff";

import { RaceTimeline, RaceCheckbox } from "@cra/components/race";
import { MyDecks, RecommendDecks } from "@cra/components/deck";

import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
// import Race from './race'
import SupportListWithFilter from "@cra/components/support/SupportListWithFilter";
import PlayerList from "@cra/components/player/PlayerList";

import { CDN_SERVER } from "@cra/config";
import { Helmet } from "react-helmet";
import { set } from "astro:schema";
const layoutWithBlank = [
  { i: "a", x: 0, y: 0, w: 2, h: 2 },
  { i: "b", x: 2, y: 0, w: 7, h: 2 },
  { i: "c", x: 0, y: 2, w: 9, h: 7 },
  { i: "d", x: 0, y: 10, w: 4, h: 4 },
  { i: "e", x: 4, y: 10, w: 5, h: 7 },
  { i: "f", x: 0, y: 14, w: 4, h: 3 },
  // {i: 'w', x: 5, y: 10, w: 6, h: 7},
  { i: "s0", x: 17, y: 0, w: 5, h: 8 },
  { i: "s1", x: 22, y: 0, w: 5, h: 8 },
  { i: "s2", x: 27, y: 0, w: 5, h: 8 },
  { i: "s3", x: 17, y: 9, w: 5, h: 8 },
  { i: "s4", x: 22, y: 9, w: 5, h: 8 },
  { i: "s5", x: 27, y: 9, w: 5, h: 8 },
];
const layoutWithoutBlank = [
  { i: "a", x: 0, y: 0, w: 2, h: 2 },
  { i: "b", x: 2, y: 0, w: 9, h: 2 },
  { i: "c", x: 0, y: 2, w: 11, h: 7 },
  { i: "d", x: 0, y: 10, w: 5, h: 4 },
  { i: "e", x: 5, y: 10, w: 6, h: 7 },
  { i: "f", x: 0, y: 14, w: 5, h: 3 },
  // {i: 'w', x: 5, y: 10, w: 6, h: 7},
  { i: "s0", x: 11, y: 0, w: 7, h: 8 },
  { i: "s1", x: 18, y: 0, w: 7, h: 8 },
  { i: "s2", x: 25, y: 0, w: 7, h: 8 },
  { i: "s3", x: 11, y: 9, w: 7, h: 8 },
  { i: "s4", x: 18, y: 9, w: 7, h: 8 },
  { i: "s5", x: 25, y: 9, w: 7, h: 8 },
];
const Nurturing = () => {
  const { t } = useTranslation();

  const [needSelect, setNeedSelect] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const [supportIndex, setSupportIndex] = useState(1);

  const selected = dbL.get("selected").value();
  const [supports, setSupports] = useState(selected.supports);
  const [player, setPlayer] = useState(selected.player);

  const [raceFilterCondition, setRaceFilterCondition] = useState(
    selected.raceFilterCondition || {
      distanceType: [],
      grade: [],
      ground: [],
    }
  );
  const [filterRace, setFilterRace] = useState(selected.filterRace || {});
  const db = useDB();
  const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);
    React.useEffect(() => {
      const handleWindowResize = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return { height, width };
  };

  const dynamicRowHeight = Math.floor((useViewport().height - 128 - 40) / 18);
  const dynamicGridWidth = Math.floor(useViewport().width - 10);
  const originalLayout = dbL.get("layout").value() || layoutWithoutBlank;
  const [layout, setLayout] = useState(originalLayout);

  if (!db) return null;
  const races = db.get("races").value();
  const showPlayer = () => {
    setIsPlayerVisible(true);
  };
  const closePlayer = () => {
    setIsPlayerVisible(false);
  };
  const handleSelectPlayer = (data) => {
    setIsPlayerVisible(false);
    setPlayer(data);
    // save player
    selected.player = data;
    dbL.get("selected").assign(selected).write();
  };

  const showSupport = (index) => {
    setNeedSelect(true);
    setIsSupportVisible(true);
    setSupportIndex(index);
  };
  const showSupport2 = (index) => {
    setNeedSelect(false);
    setIsSupportVisible(true);
    setSupportIndex(index);
  };

  const closeSupport = () => {
    setIsSupportVisible(false);
  };
  const handleSelectSupport = (data) => {
    let newData = {};
    newData[supportIndex] = data;
    setSupports(Object.assign({}, supports, newData));
    setIsSupportVisible(false);

    // save
    selected.supports[supportIndex] = data;
    dbL.get("selected").assign(selected).write();
  };

  const loadDeck = (deck) => {
    selected.supports = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };
    selected.player = {};
    if (deck.playerId) {
      selected.player = db.get("players").find({ id: deck.playerId }).value();
    }
    setPlayer(selected.player);
    deck.supportsId.forEach((id, index) => {
      if (id) {
        selected.supports[index] = db.get("supports").find({ id: id }).value();
      }
    });
    setSupports({ ...selected.supports });
    dbL.get("selected").assign(selected).write();
  };

  // race checkbox发生变化
  const onChangeRace = (filterCondition) => {
    setRaceFilterCondition(filterCondition);
    //根据条件过滤
    let tmpRaceList = Object.values(filterCondition).some((f) => f.length > 0)
      ? Object.entries(filterCondition)
          .filter(([key, filters]) => filters.length > 0)
          .reduce(
            (result, [key, filters]) =>
              result.filter((race) => filters.includes(race[key])),
            races
          )
      : [];
    //过滤后整理成 dataNum:[raceId]
    let tmpFilterRace = {};
    for (let race of tmpRaceList) {
      if (tmpFilterRace[race.dateNum]) {
        tmpFilterRace[race.dateNum].push(race.id);
      } else {
        tmpFilterRace[race.dateNum] = [race.id];
      }
    }
    //更新state
    setFilterRace(tmpFilterRace);
    selected.raceFilterCondition = filterCondition;
    selected.filterRace = tmpFilterRace;
    dbL
      .get("selected")
      .assign({ ...selected })
      .write();
  };

  const onLayoutChange = (layout) => {
    /*eslint no-console: 0*/
    dbL.set("layout", layout).write();
    setLayout(layout);
    // onLayoutChange(layout); // updates status display
  };
  const panelClass = "bg-white border border-solid border-gray-500";
  const headClass = "panel-heading w-full text-center bg-gray-300 cursor-move";
  const pBodyStyle = {
    height: "calc(100% - 22px)",
  };
  return (
    <>
      <Helmet>
        <title>育成 - 乌拉拉大胜利 - 赛马娘资料站</title>
      </Helmet>
      <GridLayout
        cols={32}
        layout={layout}
        draggableCancel=".panel-title"
        draggableHandle=".panel-heading"
        rowHeight={dynamicRowHeight}
        width={dynamicGridWidth}
        onLayoutChange={onLayoutChange}
        useCSSTransforms={false}
      >
        <div key="a" className={panelClass}>
          <div className={headClass} onClick={showPlayer}>
            {t("选择马娘")}
          </div>
          {player.id && (
            <img
              src={CDN_SERVER + player.imgUrl}
              alt={player.imgUrl}
              style={{ ...pBodyStyle }}
              onClick={showPlayer}
            />
          )}
        </div>
        <div key="b" className={panelClass}>
          <div className={headClass}>{t("操作")}</div>
          <div className="flex flex-wrap">
            <Button
              size="sm"
              buttonType="outline"
              className="add-player"
              onClick={showPlayer}
            >
              {t("选择马娘")}
            </Button>
            <Button size="sm" buttonType="outline" onClick={showSupport2}>
              {t("支援卡查询")}
            </Button>
            <BuffButton />
            <Popover
              content={
                <RaceCheckbox
                  onChange={onChangeRace}
                  raceFilterCondition={raceFilterCondition}
                />
              }
            >
              <Button size="sm" buttonType="outline">
                {t("比赛")}
              </Button>
            </Popover>
            <MyDecks player={player} supports={supports} loadDeck={loadDeck} />
            <RecommendDecks player={player} loadDeck={loadDeck} />

            <Button
              size="sm"
              buttonType="outline"
              onClick={() => setLayout(layoutWithBlank)}
            >
              {t("初始化布局(有留白)")}
            </Button>
            <Button
              size="sm"
              buttonType="outline"
              onClick={() => setLayout(layoutWithoutBlank)}
            >
              {t("初始化布局(无留白)")}
            </Button>
          </div>
        </div>
        <div key="c" className={panelClass}>
          <div className={headClass}>{t("事件")}</div>
          <ScrollBars autoHide={true} style={{ ...pBodyStyle }}>
            {/* <p>{player.id}</p> */}
            <EventList idList={player.eventList} sortFlag={true} />
          </ScrollBars>
        </div>
        <div key="d" className={panelClass}>
          <div className={headClass}>{t("技能")}</div>
          <ScrollBars autoHide={true} style={{ ...pBodyStyle }}>
            <SkillList idList={player.skillList} isNur={true} size="small" />
          </ScrollBars>
        </div>
        <div key="e" className={panelClass}>
          <div className={headClass}>{t("比赛")}</div>
          <ScrollBars autoHide={true} style={{ ...pBodyStyle }}>
            <RaceTimeline
              raceList={player.raceList || []}
              filterRace={filterRace}
            />
          </ScrollBars>
        </div>
        <div key="f" className={panelClass}>
          <div className={headClass}>{t("隐藏事件")}</div>
          <ScrollBars autoHide={true} style={{ ...pBodyStyle }}>
            <EventList idList={player.hideEvent} />
          </ScrollBars>
        </div>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          let support = supports[index];
          if (support.id) {
            return (
              <div key={`s${index}`} className={panelClass}>
                <div className={headClass}>
                  <span
                    className="panel-title"
                    onClick={() => showSupport(index)}
                    style={{ cursor: "pointer" }}
                  >
                    {t("选择支援卡")}
                  </span>
                </div>
                <ScrollBars autoHide={true} style={{ ...pBodyStyle }}>
                  <div style={{ display: "flex" }}>
                    <img
                      style={{ width: "26%", height: "39%" }}
                      src={CDN_SERVER + support.imgUrl}
                      alt={support.imgUrl}
                    />
                    <div style={{ flex: "1 1 auto" }}>
                      <EventList
                        idList={supports[index].eventList}
                        pid={supports[index].id}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      margin: "4px 0",
                      background: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {t("培训技能")}
                  </div>
                  <SkillList
                    idList={supports[index].possessionSkill}
                    isNur={true}
                    size="small"
                  />
                  <div
                    style={{
                      margin: "4px 0",
                      background: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {t("事件技能")}
                  </div>
                  <SkillList
                    idList={supports[index].trainingEventSkill}
                    isNur={true}
                    size="small"
                  />
                </ScrollBars>
              </div>
            );
          } else {
            return (
              <div key={`s${index}`} className={panelClass}>
                <Button
                  size="sm"
                  buttonType="outline"
                  onClick={() => showSupport(index)}
                >
                  {t("选择支援卡")}
                </Button>
              </div>
            );
          }
        })}
      </GridLayout>
      <Dialog
        size="lg"
        open={isPlayerVisible}
        onOpenChange={setIsPlayerVisible}
      >
        <Dialog.Overlay>
          <Dialog.Content>
            <div className="mb-4 flex items-center justify-between gap-4">
              <Typography type="h6">选择支援卡</Typography>
              <Dialog.DismissTrigger
                as={IconButton}
                size="sm"
                variant="ghost"
                color="secondary"
                isCircular
                className="absolute right-2 top-2"
              >
                <Xmark className="h-5 w-5" />
              </Dialog.DismissTrigger>
            </div>

            <div className="flex flex-col overflow-y-auto max-h-[80vh]">
              <PlayerList onClick={handleSelectPlayer} sortFlag={true} />
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog>
      <Dialog
        size="lg"
        open={isSupportVisible}
        onOpenChange={setIsSupportVisible}
      >
        <Dialog.Overlay>
          <Dialog.Content>
            <div className="mb-4 flex items-center justify-between gap-4">
              <Typography type="h6">选择支援卡</Typography>
              <Dialog.DismissTrigger
                as={IconButton}
                size="sm"
                variant="ghost"
                color="secondary"
                isCircular
                className="absolute right-2 top-2"
              >
                <Xmark className="h-5 w-5" />
              </Dialog.DismissTrigger>
            </div>

            <div className="flex-col overflow-y-auto max-h-[80vh] flex">
              <SupportListWithFilter
                formName="nurSup"
                onClick={needSelect ? handleSelectSupport : null}
                limitHeight={true}
                sortFlag={true}
              />
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog>
    </>
  );
};

export default Nurturing;
