import { Atom, atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { Player } from "../../../typings";

const playersJSON = require("./players.json");

export const playersAtom = atom<Player[]>(playersJSON || []);

type Param = { id: string };
export const playerAtomFamily = atomFamily<Param, Atom<Player | null>>(
  (param: Param) => atom(playersJSON.find((player: Player) => player.id == param.id) || null),
  (a: Param, b: Param) => a.id === b.id
);



