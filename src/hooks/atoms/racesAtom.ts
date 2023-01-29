import { atom } from "jotai";
import { Race } from "../../../typings";

const racesJSON = require("./races.json");

export const racesAtom = atom<Race[]>(racesJSON || []);
