import React, { useState } from "react";
import { useRouter } from "next/router";
import shortid from "shortid";
import Button from "@material-tailwind/react/Button";

import dbL from "src/dbL.js";
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
import SupportListWithFilter from "components/support/SupportListWithFilter";
import PlayerList from "components/player/PlayerList.js";
import RaceTimeline from "components/race/RaceTimeline";
import RaceCheckbox from "components/race/RaceCheckbox";
import { CDN_SERVER } from "src/config";
import { useAppContext } from "context/state";
// const TITLE = "育成 - 乌拉拉大胜利 - 赛马娘资料站";

const Nurturing = (props) => {
  const { races, players: allPlayer, supports: allSupports } = useAppContext();
  const { t } = useTranslation();
  const router = useRouter();
  const [needSelect, setNeedSelect] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const [supportIndex, setSupportIndex] = useState(1);

  // const [isRaceVisible, setIsRaceVisible] = useState(false);

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
  const [decks, setDecks] = useState(dbL.get("myDecks").value());
  const showPlayer = () => {
    setIsPlayerVisible(true);
  };
  const closePlayer = () => {
    setIsPlayerVisible(false);
  };
  const handleSelectPlayer = (data) => {
    setIsPlayerVisible(false);
    setPlayer(data);

    // save
    selected.player = data;
    dbL.get("selected").assign(selected).write();
    closePlayer();
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
    closeSupport();
  };
  const handleSelectSupportShow = (data) => {
    router.push(`/support-detail/${data.id}`);
    closeSupport();
  };
  // 卡组相关操作
  const saveDeck = (deck) => {
    let tmpDeck = {
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
      dbL.get("myDecks").find({ id: deck.id }).assign(tmpDeck).write();
    } else {
      //
      tmpDeck.id = shortid.generate();
      dbL.get("myDecks").push(tmpDeck).write();
    }
    setDecks([...dbL.get("myDecks").value()]);
  };
  const loadDeck = (deck) => {
    selected.supports = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };
    selected.player = {};
    if (deck.playerId) {
      selected.player = allPlayer.find((item) => item.id === deck.playerId);
    }
    setPlayer(selected.player);
    deck.supportsId.forEach((id, index) => {
      if (id) {
        selected.supports[index] = allSupports.find((item) => item.id === id);
      }
    });
    setSupports({ ...selected.supports });
    dbL.get("selected").assign(selected).write();
  };
  const deleteDeck = (deck) => {
    dbL.get("myDecks").remove({ id: deck.id }).write();
    setDecks([...dbL.get("myDecks").value()]);
  };
  // race checkbox发生变化
  const onChangeRace = (filterCondition) => {
    setRaceFilterCondition(filterCondition);
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
    //更新state
    setFilterRace(tmpFilterRace);
    selected.raceFilterCondition = filterCondition;
    selected.filterRace = tmpFilterRace;
    dbL
      .get("selected")
      .assign({ ...selected })
      .write();
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        {player.imgUrl && (
          <img
            src={CDN_SERVER + player.imgUrl}
            alt={player.imgUrl}
            width="128"
            onClick={() => toPlayerDetail(player.id)}
          />
        )}
        <div className="flex-auto flex flex-wrap items-center">
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
              <RaceCheckbox onChange={onChangeRace} raceFilterCondition={raceFilterCondition} />
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
                  <Row key={deck.id}>
                    {deck.imgUrls.map((imgUrl) => (
                      <Col span={3} key={imgUrl}>
                        <img src={CDN_SERVER + imgUrl} alt={imgUrl} width={"100"} />
                      </Col>
                    ))}
                    <Col span={3}>
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
                    </Col>
                  </Row>
                ))}
              </>
            }
          >
            <Button>{t("我的卡组")}</Button>
          </Popover>
        </div>
      </div>

      <Row justify="space-around">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Col span={7} key={index} style={{}}>
            <Button
              size="sm"
              buttonType="outline"
              icon={<EditOutlined />}
              onClick={() => showSupport(index)}
            >
              {t("选择支援卡")}
            </Button>
            {supports[index] && supports[index].id && (
              <img
                src={CDN_SERVER + supports[index].imgUrl}
                alt={supports[index].name}
                width={"100%"}
                onClick={() => toSupportDetail(supports[index].id)}
              />
            )}
          </Col>
        ))}
      </Row>

      <Divider>比赛</Divider>
      <div style={{ overflow: "auto", paddingTop: "10px", width: "100%", height: "400px" }}>
        <RaceTimeline raceList={player.raceList} filterRace={filterRace} />
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
