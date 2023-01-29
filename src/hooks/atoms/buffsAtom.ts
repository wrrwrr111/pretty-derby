import { atom } from "jotai";
import { Buff } from "../../../typings";

const buffsJSON = require("./buffs.json");

export const buffsAtom = atom<Buff[]>(buffsJSON || []);
