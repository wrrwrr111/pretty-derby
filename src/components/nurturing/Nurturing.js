import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Card,
  CardHeader,
  CardBody,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
// import shortid from 'shortid'
// import axios from "axios";
import ScrollBars from "react-custom-scrollbars";

import { useTranslation } from "react-i18next";

import EventList from "../event/EventList";
import SkillList from "../skill/SkillList";
import BuffTable from "../buff/BuffTable";
import RaceTimeline from "../race/RaceTimeline";
import RaceCheckbox from "../race/RaceCheckbox";
import MyDecks from "../deck/MyDecks";
import RecommendDecks from "../deck/RecommendDecks";

import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
// import Race from './race.js'
import SupportListWithFilter from "../support/SupportListWithFilter";
import PlayerList from "../player/PlayerList";

import { CDN_SERVER } from "../../config";

import { useAtom } from "jotai";
import { supportsAtom, racesAtom, playersAtom } from "../../hooks/atoms";
import { useImmerAtom } from "jotai-immer";
import { selectedAtom } from "../../hooks/localAtoms";

// const TITLE = "育成 - 乌拉拉大胜利 - 赛马娘资料站";
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

const CustomGridItemComponent = React.forwardRef(
  ({ style, className, onMouseDown, onMouseUp, onTouchEnd, children, ...props }, ref) => {
    return (
      <Card
        // divider
        style={style}
        // className={`relative flex flex-col overflow-auto border border-solid border-gray-500 bg-white ${className}`}
        className={className}
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </Card>
    );
  }
);
const CustomGridItemHead = ({ children, className, ...props }) => {
  return (
    <CardHeader
      floated={false}
      className="panel-heading mx-0 mt-0 text-center"
      color="light-blue"
      // className={`panel-heading stick top-0 h-6 w-full cursor-move overflow-hidden bg-gray-300 text-center ${className}`}
      {...props}
    >
      {children}
    </CardHeader>
  );
};
const CustomGridItemBody = ({ children, className, ...props }) => {
  return (
    <CardBody className={`flex-auto p-2`} {...props}>
      <ScrollBars autoHide={true} className={`h-full`}>
        {children}
      </ScrollBars>
    </CardBody>
  );
};

const Nurturing = () => {
  const { t } = useTranslation();
  const [races] = useAtom(racesAtom);
  const [allPlayer] = useAtom(playersAtom);
  const [allSupports] = useAtom(supportsAtom);
  const [selected, setSelected] = useImmerAtom(selectedAtom);

  const [needSelect, setNeedSelect] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const [supportIndex, setSupportIndex] = useState(1);

  const [layout, setLayout] = useState(layoutWithoutBlank);
  const [gridWidth, setGridWidth] = useState(0);
  const [gridRowHeight, setGridRowHeight] = useState(0);

  useEffect(() => {
    setGridWidth(window.innerWidth - 10);
    setGridRowHeight(Math.floor((window.innerHeight - 128 - 40) / 18));
  }, []);

  const showPlayer = () => {
    setIsPlayerVisible(true);
  };
  const closePlayer = () => {
    setIsPlayerVisible(false);
  };
  const handleSelectPlayer = (data) => {
    closePlayer();
    setSelected((draft) => {
      draft.player = data;
    });
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
  const handleSelectSupport = useCallback(
    (data) => {
      closeSupport(false);
      setSelected((draft) => {
        draft.supports[supportIndex] = data;
      });
    },
    [supportIndex]
  );

  const loadDeck = (deck) => {
    setSelected((draft) => {
      deck.supportsId.forEach((id, index) => {
        if (id) {
          draft.supports[index] = allSupports.find((item) => item.id === id);
        }
      });
      if (deck.playerId) {
        draft.player = allPlayer.find((item) => item.id === deck.playerId);
      }
    });
  };

  // race checkbox发生变化
  const onChangeRace = (filterCondition) => {
    setSelected((draft) => {
      //根据条件过滤
      let tmpRaceList = Object.values(filterCondition).some((f) => f.length > 0)
        ? Object.entries(filterCondition)
            .filter(([key, filters]) => filters.length > 0)
            .reduce(
              (result, [key, filters]) => result.filter((race) => filters.includes(race[key])),
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

      draft.filterCondition = filterCondition;
      draft.filterRace = tmpFilterRace;
    });
  };

  const onLayoutChange = (layout) => {
    setLayout(layout);
  };

  return (
    <>
      <GridLayout
        cols={32}
        layout={layout}
        draggableCancel=".panel-title"
        draggableHandle=".panel-heading"
        rowHeight={gridRowHeight}
        width={gridWidth}
        onLayoutChange={onLayoutChange}
        useCSSTransforms={false}
        className="bg-[#f8fafc]"
      >
        <CustomGridItemComponent key="a">
          <CustomGridItemHead onClick={showPlayer}>{t("选择马娘")}</CustomGridItemHead>
          <CustomGridItemBody>
            {selected.player?.id && (
              <img
                src={CDN_SERVER + selected.player.imgUrl}
                alt={selected.player.imgUrl}
                onClick={showPlayer}
              />
            )}
          </CustomGridItemBody>
        </CustomGridItemComponent>
        <CustomGridItemComponent key="b">
          <CustomGridItemHead>{t("操作")}</CustomGridItemHead>
          <CustomGridItemBody>
            <div className="flex flex-wrap gap-1">
              <Button size="sm" buttonType="outline" className="add-player" onClick={showPlayer}>
                {t("选择马娘")}
              </Button>
              <Button size="sm" buttonType="outline" onClick={showSupport2}>
                {t("支援卡查询")}
              </Button>
              <Popover>
                <PopoverHandler>
                  <Button size="sm" buttonType="outline">
                    {t("Buff")}
                  </Button>
                </PopoverHandler>
                <PopoverContent>
                  <BuffTable />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverHandler>
                  <Button size="sm" buttonType="outline">
                    {t("比赛")}
                  </Button>
                </PopoverHandler>
                <PopoverContent>
                  <RaceCheckbox
                    onChange={onChangeRace}
                    raceFilterCondition={selected.filterCondition}
                  />
                </PopoverContent>
              </Popover>
              <MyDecks player={selected.player} supports={selected.supports} loadDeck={loadDeck} />
              <RecommendDecks playerId={selected.player?.id} loadDeck={loadDeck} />

              <Button size="sm" buttonType="outline" onClick={() => setLayout(layoutWithBlank)}>
                {t("初始化布局(有留白)")}
              </Button>
              <Button size="sm" buttonType="outline" onClick={() => setLayout(layoutWithoutBlank)}>
                {t("初始化布局(无留白)")}
              </Button>
            </div>
          </CustomGridItemBody>
        </CustomGridItemComponent>
        <CustomGridItemComponent key="c">
          <CustomGridItemHead>{t("事件")}</CustomGridItemHead>
          <CustomGridItemBody>
            <EventList idList={selected.player?.eventList} sortFlag={true} />
          </CustomGridItemBody>
        </CustomGridItemComponent>
        <CustomGridItemComponent key="d">
          <CustomGridItemHead>{t("技能")}</CustomGridItemHead>
          <CustomGridItemBody>
            <SkillList idList={selected.player?.skillList} isNur={true} size="small" />
          </CustomGridItemBody>
        </CustomGridItemComponent>
        <CustomGridItemComponent key="e">
          <CustomGridItemHead>{t("比赛")}</CustomGridItemHead>
          <CustomGridItemBody>
            <RaceTimeline
              raceList={selected.player?.raceList || []}
              filterRace={selected.filterRace}
            />
          </CustomGridItemBody>
        </CustomGridItemComponent>
        <CustomGridItemComponent key="f">
          <CustomGridItemHead>{t("隐藏事件")}</CustomGridItemHead>
          <CustomGridItemBody>
            <EventList idList={selected.player?.hideEvent} />
          </CustomGridItemBody>
        </CustomGridItemComponent>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const support = selected.supports[index];
          return (
            <CustomGridItemComponent key={`s${index}`}>
              <CustomGridItemHead>
                <span className="panel-title cursor-pointer" onClick={() => showSupport(index)}>
                  {t("选择支援卡")}
                </span>
              </CustomGridItemHead>
              {support?.id && (
                <CustomGridItemBody>
                  <div className="flex">
                    <img
                      className="h-[39%] w-[26%]"
                      src={CDN_SERVER + support.imgUrl}
                      alt={support.imgUrl}
                    />
                    <div className="flex-auto">
                      <EventList
                        idList={selected.supports[index]?.eventList}
                        pid={selected.supports[index]?.id}
                      />
                    </div>
                  </div>
                  <div className="my-1 bg-white bg-opacity-60">{t("培训技能")}</div>
                  <SkillList
                    idList={selected.supports[index]?.possessionSkill}
                    isNur={true}
                    size="small"
                  />
                  <div className="my-1 bg-white bg-opacity-60">{t("事件技能")}</div>
                  <SkillList
                    idList={selected.supports[index]?.trainingEventSkill}
                    isNur={true}
                    size="small"
                  />
                </CustomGridItemBody>
              )}
            </CustomGridItemComponent>
          );
        })}
      </GridLayout>
      <Dialog size="xl" open={isPlayerVisible} handler={setIsPlayerVisible}>
        <DialogHeader toggler={closePlayer}>选择角色</DialogHeader>
        <DialogBody className="h-full max-h-[80vh] w-full overflow-auto">
          <PlayerList onClick={handleSelectPlayer} sortFlag={true} />
        </DialogBody>
      </Dialog>
      <Dialog size="xl" open={isSupportVisible} handler={setIsSupportVisible}>
        <DialogHeader toggler={closeSupport}>选择支援卡</DialogHeader>
        <DialogBody className="relative flex h-full max-h-[80vh] w-full overflow-auto">
          <SupportListWithFilter
            formName="nurSup"
            onClick={needSelect ? handleSelectSupport : null}
            limitHeight={true}
            sortFlag={true}
          />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default Nurturing;
