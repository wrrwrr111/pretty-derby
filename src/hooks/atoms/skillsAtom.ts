import { atom } from "jotai";
import { Skill } from "../../../typings";

const skillsJSON = require("./skills.json");

export const skillsAtom = atom<Skill[]>(skillsJSON || []);
