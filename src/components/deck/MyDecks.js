import React, { useState, Fragment } from "react";
import shortid from "shortid";
import axios from "axios";

import { Button } from "@material-tailwind/react";
import { Tag, message, Popover, Popconfirm, Checkbox } from "antd";

import { useTranslation } from "react-i18next";
import { CDN_SERVER, DECK_LABELS } from "src/config";
import { myDecksAtom } from "../../hooks/localAtoms";

import { useImmerAtom } from "jotai-immer";

const MyDecks = (props) => {
  const { t } = useTranslation();
  const [decks, setDecks] = useImmerAtom(myDecksAtom);

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

  const deleteDeck = (deck) => {
    //delete
    setDecks((draft) => {
      const index = draft.findIndex(({ id }) => deck.id === id);
      if (index !== -1) draft.splice(index, 1);
    });
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
    setDecks((draft) => {
      const index = draft.findIndex(({ id }) => deck.id === id);
      if (index !== -1) draft[index].tags = values;
    });
  };

  return (
    <Popover
      overlayClassName="max-h-[800px] overflow-auto"
      content={
        <Fragment>
          <Button size="sm" buttonType="outline" onClick={() => saveDeck()}>
            {t("保存为新卡组")}
          </Button>
          {decks.map((deck) => (
            <div key={deck.id} className="grid w-full grid-cols-8">
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
        </Fragment>
      }
    >
      <Button size="sm" buttonType="outline">
        {t("我的卡组")}
      </Button>
    </Popover>
  );
};

export default MyDecks;
