import { atom } from "jotai";
import { Effect } from "../../../typings";

const effectsJSON = require("./effects.json");

export const effectsAtom = atom<Effect[]>(effectsJSON || []);
