export interface Deck {
  id: string;
  imgUrls: string[];
  supportsId: (string | null)[];
  tags: string[];
  playerId?: string;
}

export interface Player {
  id: string;
  imgUrl: string;
}

export interface Support {
  id: string;
  imgUrl: string;
}

export interface DeckComponentProps {
  player: Player;
  supports: Support[];
  loadDeck: (deck: Deck) => void;
}
