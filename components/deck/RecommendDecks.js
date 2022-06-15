import React, { useState } from "react";
import shortid from "shortid";
import axios from "axios";

import Button from "@material-tailwind/react/Button";
import { Tag, message, Popover, Popconfirm, Checkbox } from "antd";

import dbL from "/src/dbL.js";

import { useTranslation } from "react-i18next";
import { CDN_SERVER, DECK_LABELS } from "/src/config";
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

export default RecommendDecks