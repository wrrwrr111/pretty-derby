import { Deck } from "./deck-types";
import dbL from "@/dbL";
import axios from "axios";
import shortid from "shortid";

export const deckActions = {
  saveDeck: (deck: Deck | null, player: Player, supports: Support[]) => {
    const tmpDeck: Deck = {
      imgUrls: [],
      supportsId: [],
      tags: [],
    };

    if (player.id) {
      tmpDeck.playerId = player.id;
      tmpDeck.imgUrls.push(player.imgUrl);
    }

    [0, 1, 2, 3, 4, 5].forEach((index) => {
      if (supports[index]?.id) {
        tmpDeck.imgUrls.push(supports[index].imgUrl);
        tmpDeck.supportsId.push(supports[index].id);
      } else {
        tmpDeck.supportsId.push(null);
      }
    });

    if (deck) {
      // Update existing deck
      dbL.chain.get("myDecks").find({ id: deck.id }).assign(tmpDeck)
      dbL.write();
    } else {
      // Create new deck
      tmpDeck.id = shortid.generate();
      dbL.chain.get("myDecks").push(tmpDeck)
      dbL.write();
    }

    return [...dbL.chain.get("myDecks").value()];
  },

  deleteDeck: (deck: Deck) => {
    dbL.chain.get("myDecks").remove({ id: deck.id })
    dbL.write();
    return [...dbL.chain.get("myDecks").value()];
  },

  shareDeck: async (deck: Deck) => {
    const formData = {
      ...deck,
      id: deck.playerId + deck.supportsId.sort((a, b) => (a || "").localeCompare(b || "")).join(""),
    };
    const res = await axios.post(
      "https://urarawin-worker.urarawin.workers.dev/api/sqlite/addDeck",
      formData
    );
    return res.data?.msg;
  },
};
