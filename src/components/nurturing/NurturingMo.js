import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import shortid from "shortid";
import { Button } from "@material-tailwind/react";

import { useTranslation } from "react-i18next";
import {
  Divider,
  Row,
  Col,
  Modal,
  Popconfirm,
  Popover,
  // Tooltip
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import SupportListWithFilter from "../support/SupportListWithFilter";
import PlayerList from "../player/PlayerList";
import RaceTimeline from "../race/RaceTimeline";
import RaceCheckbox from "../race/RaceCheckbox";
import { CDN_SERVER } from "../../config";
import { useAtom } from "jotai";
import { supportsAtom, racesAtom, playersAtom } from "../../hooks/atoms";

import { useImmerAtom } from "jotai-immer";
import { myDecksAtom, selectedAtom } from "../../hooks/localAtoms";

// const TITLE = "育成 - 乌拉拉大胜利 - 赛马娘资料站";

const Nurturing = (props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [races] = useAtom(racesAtom);
  const [allPlayer] = useAtom(playersAtom);
  const [allSupports] = useAtom(supportsAtom);
  const [selected, setSelected] = useImmerAtom(selectedAtom);
  const [decks, setDecks] = useImmerAtom(myDecksAtom);

  const [needSelect, setNeedSelect] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isSupportVisible, setIsSupportVisible] = useState(false);

  const [supportIndex, setSupportIndex] = useState(1);

  // const [isRaceVisible, setIsRaceVisible] = useState(false);

  // const selected = dbL.get("selected").value();
  // const [supports, setSupports] = useState(selected.supports);
  // const [player, setPlayer] = useState(selected.player);
  // const [raceFilterCondition, setRaceFilterCondition] = useState(
  //   selected.raceFilterCondition || {
  //     distanceType: [],
  //     grade: [],
  //     ground: [],
  //   }
  // );
  // const [filterRace, setFilterRace] = useState(selected.filterRace || {});
  // const [decks, setDecks] = useState(dbL.get("myDecks").value());

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

  const handleSelectSupportShow = (data) => {
    router.push(`/support-detail/${data.id}`);
    closeSupport();
  };
  // 卡组相关操作
  const saveDeck = (deck) => {
    const { player = {}, supports = [] } = selected;
    const tmpDeck = {
      imgUrls: [],
      supportsId: [],
    };
    if (player.id) {
      tmpDeck.playerId = player.id;
      tmpDeck.imgUrls.push(player.imgUrl);
    }
    [0, 1, 2, 3, 4, 5].forEach((index) => {
      if (supports[index] && supports[index].id) {
        tmpDeck.imgUrls.push(supports[index].imgUrl);
        tmpDeck.supportsId.push(supports[index].id);
      } else {
        tmpDeck.supportsId.push(null);
      }
    });
    if (deck) {
      //update
      setDecks((draft) => {
        const index = draft.findIndex(({ id }) => deck.id === id);
        if (index !== -1) draft[index] = tmpDeck;
      });
    } else {
      //add
      tmpDeck.id = shortid.generate();
      setDecks((draft) => {
        draft.push(tmpDeck);
      });
    }
  };
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

  const deleteDeck = (deck) => {
    setDecks((draft) => {
      const index = draft.findIndex(({ id }) => deck.id === id);
      if (index !== -1) draft.splice(index, 1);
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

  const toSupportDetail = (id) => {
    router.push(`/support/${id}`);
  };
  const toPlayerDetail = (id) => {
    router.push(`/player/${id}/1`);
  };
  const toBuffList = (id) => {
    router.push(`/buff`);
  };

  return (
    <>
      <div className="flex justify-center">
        {selected.player.imgUrl && (
          <img
            src={CDN_SERVER + selected.player.imgUrl}
            alt={selected.player.imgUrl}
            width="128"
            onClick={() => toPlayerDetail(selected.player.id)}
          />
        )}
        <div className="flex flex-auto flex-wrap items-center">
          <Button size="sm" buttonType="outline" onClick={showPlayer}>
            {t("选择马娘")}
          </Button>
          <Button size="sm" buttonType="outline" onClick={showSupport2}>
            {t("支援卡查询")}
          </Button>
          <Button size="sm" buttonType="outline" onClick={toBuffList}>
            {t("BUFF")}
          </Button>
          <Popover
            trigger="click"
            content={
              <RaceCheckbox
                onChange={onChangeRace}
                raceFilterCondition={selected.filterCondition}
              />
            }
          >
            <Button>{t("比赛")}</Button>
          </Popover>
          <Popover
            trigger="click"
            width={"80%"}
            content={
              <>
                <Button size="sm" buttonType="outline" onClick={() => saveDeck()}>
                  {t("保存为新卡组")}
                </Button>
                {decks.map((deck) => (
                  <div className="grid grid-cols-8" key={deck.id}>
                    {deck.imgUrls.map((imgUrl) => (
                      <div className="col-span-1" key={imgUrl}>
                        <img src={CDN_SERVER + imgUrl} alt={imgUrl} width={"100"} />
                      </div>
                    ))}
                    <div className="col-span-1">
                      <Button
                        size="sm"
                        buttonType="outline"
                        type="primary"
                        onClick={() => loadDeck(deck)}
                      >
                        {t("读取卡组")}
                      </Button>
                      <Popconfirm title="确认覆盖？" onConfirm={() => saveDeck(deck)}>
                        <Button size="sm" buttonType="outline" danger type="dashed">
                          {t("覆盖卡组")}
                        </Button>
                      </Popconfirm>
                      <Popconfirm title="确认删除？" onConfirm={() => deleteDeck(deck)}>
                        <Button size="sm" buttonType="outline" danger type="dashed">
                          {t("删除卡组")}
                        </Button>
                      </Popconfirm>
                    </div>
                  </div>
                ))}
              </>
            }
          >
            <Button>{t("我的卡组")}</Button>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2" justify="space-around">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="col-span-4">
            <Button
              size="sm"
              buttonType="outline"
              icon={<EditOutlined />}
              onClick={() => showSupport(index)}
            >
              {t("选择支援卡")}
            </Button>
            {selected.supports[index] && selected.supports[index].id && (
              <img
                src={CDN_SERVER + selected.supports[index].imgUrl}
                alt={selected.supports[index].name}
                width={"100%"}
                onClick={() => toSupportDetail(selected.supports[index].id)}
              />
            )}
          </div>
        ))}
      </div>

      <Divider>比赛</Divider>
      <div className="h-[400px] w-full overflow-auto pt-[10px]">
        <RaceTimeline raceList={selected.player.raceList} filterRace={selected.filterRace} />
      </div>

      <Modal
        visible={isPlayerVisible}
        onOk={closePlayer}
        onCancel={closePlayer}
        footer={null}
        width={"100%"}
        bodyStyle={{ maxHeight: "80vh", overflow: "auto" }}
      >
        <PlayerList sortFlag={true} onClick={handleSelectPlayer} />
      </Modal>
      <Modal
        visible={isSupportVisible}
        onOk={closeSupport}
        onCancel={closeSupport}
        footer={null}
        width={"100%"}
        bodyStyle={{ height: "80vh", overflow: "auto" }}
      >
        <SupportListWithFilter
          formName="nurSupMo"
          onClick={needSelect ? handleSelectSupport : handleSelectSupportShow}
          sortFlag={true}
        />
      </Modal>
    </>
  );
};

export default Nurturing;
