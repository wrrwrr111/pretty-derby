import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

import axios from "axios";
import { useTranslation } from "react-i18next";
import { CDN_SERVER } from "@/config";
import { Deck, DeckComponentProps } from "./deck-types";

const RecommendDecks: React.FC<DeckComponentProps> = ({ player, loadDeck }) => {
  const { t } = useTranslation();
  const [recommendDecks, setRecommendDecks] = useState<Deck[]>([]);
  const [playerId, setPlayerId] = useState("");

  const searchDeck = async () => {
    if (playerId !== player.id) {
      const formData = player ? { playerId: player.id } : {};
      const res = await axios.post(
        "https://urarawin-worker.urarawin.workers.dev/api/sqlite/searchDeck",
        formData
      );
      setRecommendDecks(res.data || []);
      setPlayerId(player.id);
    }
  };

  return (
    <Popover onOpenChange={(open) => open && searchDeck()}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          {t("推荐卡组")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[800px] max-h-[800px] overflow-auto">
        <div className="space-y-4">
          {recommendDecks.map((deck) => (
            <div key={deck.id} className="w-full grid grid-cols-8 gap-2">
              <div className="col-span-full space-y-2">
                {deck.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {deck.imgUrls.map((imgUrl) => (
                <div className="col-span-1" key={imgUrl}>
                  <img src={CDN_SERVER + imgUrl} alt={imgUrl} className="w-full" />
                </div>
              ))}

              <div className="col-span-1">
                <Button variant="outline" size="sm" onClick={() => loadDeck(deck)}>
                  {t("读取卡组")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RecommendDecks;
