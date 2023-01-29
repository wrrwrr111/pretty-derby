import { atom } from "jotai";
import { Support } from "../../../typings";

const supportsJSON = require("./supports.json");

export const supportsAtom = atom<Support[]>(supportsJSON || []);
