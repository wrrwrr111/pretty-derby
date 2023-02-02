import { FC, useState } from "react";
import axios from "axios";

import { Button, Popover, PopoverHandler, PopoverContent, Chip } from "@material-tailwind/react";

import { useTranslation } from "react-i18next";
import { CDN_SERVER } from "../../config";
import useSWR from "swr";

const RecommendDecks = ({ playerId, loadDeck }) => {
  const { t } = useTranslation();
  const { data: recommendDecks } = useSWR(
    playerId ? ["api/sqlite/searchDeck", { playerId }] : null,
    async () => {
      const formData = { playerId };
      const res = await axios.post("https://urarawin.com/api/sqlite/searchDeck", formData);
      return res.data || [];
    }
  );

  console.log(recommendDecks);
  // const deleteDeck = async (deck) => {
  //   const res = await axios.post("https://urarawin.com/api/sqlite/deleteDeck", deck)
  //   searchDeck()
  // }
  return (
    <Popover>
      <PopoverHandler>
        <Button size="sm" buttonType="outline">
          {t("推荐卡组")}
        </Button>
      </PopoverHandler>
      <PopoverContent>
        {recommendDecks?.map((deck) => (
          <div key={deck.id} className="grid w-full grid-cols-8">
            <div className="col-span-full">
              {deck.tags && deck.tags.map((tag) => <Chip key={tag} value={tag} />)}
            </div>
            {deck.imgUrls.map((imgUrl) => (
              <div className="col-span-1" key={imgUrl}>
                <img src={CDN_SERVER + imgUrl} alt={imgUrl} width={"100"} />
              </div>
            ))}
            <div className="col-span-1">
              <Button type="primary" onClick={() => loadDeck(deck)}>
                {t("读取卡组")}
              </Button>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default RecommendDecks;
