import { atom } from "jotai";
import { Player } from "../../../typings";

const playersJSON = require("./players.json");

export const playersAtom = atom<Player[]>(playersJSON || []);
