import React, { useState } from "react";
import shortid from "shortid";
import axios from "axios";

import Button from "@/components/material-tailwind/Button";
import { Tag, message, Popover, Popconfirm, Checkbox } from "antd";

import dbL from "../dbL.js";

import { useTranslation } from "react-i18next";
import { CDN_SERVER, DECK_LABELS } from "@/config";

const MyDecks = (props) => {
  const { t } = useTranslation();
  const [decks, setDecks] = useState(dbL.get("myDecks").value());
  // 卡组相关操作
  const saveDeck = (deck) => {
    let tmpDeck = {
      imgUrls: [],
      supportsId: [],
      tags: [],
    };
    if (props.player.id) {
      tmpDeck.playerId = props.player.id;
      tmpDeck.imgUrls.push(props.player.imgUrl);
    }
    [0, 1, 2, 3, 4, 5].forEach((index) => {
      if (props.supports[index] && props.supports[index].id) {
        tmpDeck.imgUrls.push(props.supports[index].imgUrl);
        tmpDeck.supportsId.push(props.supports[index].id);
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

  const deleteDeck = (deck) => {
    dbL.get("myDecks").remove({ id: deck.id }).write();
    setDecks([...dbL.get("myDecks").value()]);
  };
  const shareDeck = async (deck) => {
    //判断表格
    // if(deck.playerId)
    const formData = {
      ...deck,
      id: deck.playerId + deck.supportsId.sort((a, b) => a.localeCompare(b)).join(""),
    };
    const res = await axios.post("https://urarawin.com/api/sqlite/addDeck", formData);
    const data = res.data;
    data && message.info(data.msg);
  };

  const onChangeTag = (values, deck) => {
    dbL.get("myDecks").find({ id: deck.id }).assign({ tags: values }).write();
    setDecks([...dbL.get("myDecks").value()]);
  };

  return (
    <Popover
      width={"100%"}
      overlayStyle={{ maxHeight: 800, overflow: "auto" }}
      content={
        <>
          <Button size="sm" buttonType="outline" onClick={() => saveDeck()}>
            {t("保存为新卡组")}
          </Button>
          {decks.map((deck) => (
            <div key={deck.id} className="w-full grid grid-cols-8">
              <div className="col-span-full">
                <Checkbox.Group
                  options={DECK_LABELS}
                  defaultValue={deck.tags || []}
                  onChange={(values) => onChangeTag(values, deck)}
                />
              </div>
              {deck.imgUrls.map((imgUrl) => (
                <div className="col-span-1" key={imgUrl}>
                  <img src={CDN_SERVER + imgUrl} alt={imgUrl} width={"100"} />
                </div>
              ))}
              <div className="col-span-1">
                <Button type="primary" onClick={() => props.loadDeck(deck)}>
                  {t("读取卡组")}
                </Button>
                <Popconfirm title={t("确认覆盖？")} onConfirm={() => saveDeck(deck)}>
                  <Button danger type="dashed">
                    {t("覆盖卡组")}
                  </Button>
                </Popconfirm>
                <Popconfirm title={t("确认删除？")} onConfirm={() => deleteDeck(deck)}>
                  <Button danger type="dashed">
                    {t("删除卡组")}
                  </Button>
                </Popconfirm>
                <Popconfirm title={t("确认分享？")} onConfirm={() => shareDeck(deck)}>
                  <Button>分享卡组</Button>
                </Popconfirm>
              </div>
            </div>
          ))}
        </>
      }
    >
      <Button size="sm" buttonType="outline">
        {t("我的卡组")}
      </Button>
    </Popover>
  );
};

const RecommendDecks = (props) => {
  // const [recommendDecks,setRecommendDecks] = useState(res.data||[])
  const { t } = useTranslation();
  const [recommendDecks, setRecommendDecks] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const searchDeck = async () => {
    if (playerId !== props.player.id) {
      const formData = props.player ? { playerId: props.player.id } : {};
      const res = await axios.post("https://urarawin.com/api/sqlite/searchDeck", formData);
      setRecommendDecks(res.data || []);
      setPlayerId(props.player.id);
    }
  };
  // const deleteDeck = async (deck) => {
  //   const res = await axios.post("https://urarawin.com/api/sqlite/deleteDeck", deck)
  //   searchDeck()
  // }
  return (
    <Popover
      width={"100%"}
      onVisibleChange={searchDeck}
      overlayStyle={{ maxHeight: 800, overflow: "auto" }}
      content={recommendDecks.map((deck) => (
        <div key={deck.id} className="w-full grid grid-cols-8">
          <div className="col-span-full">
            {deck.tags && deck.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
          {deck.imgUrls.map((imgUrl) => (
            <div className="col-span-1" key={imgUrl}>
              <img src={CDN_SERVER + imgUrl} alt={imgUrl} width={"100"} />
            </div>
          ))}
          <div className="col-span-1">
            <Button type="primary" onClick={() => props.loadDeck(deck)}>
              {t("读取卡组")}
            </Button>
          </div>
        </div>
      ))}
    >
      <Button size="sm" buttonType="outline">
        {t("推荐卡组")}
      </Button>
    </Popover>
  );
};

export { MyDecks, RecommendDecks };
