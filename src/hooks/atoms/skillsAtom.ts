import { Atom, atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { Skill } from "../../../typings";

const skillsJSON = require("./skills.json");

export const skillsAtom = atom<Skill[]>(skillsJSON || []);

type Param = { id: string };
export const skillAtomFamily = atomFamily<Param, Atom<Skill | null>>(
  (param: Param) => atom(skillsJSON.find((item: Skill) => item.id == param.id) || null),
  (a: Param, b: Param) => a.id === b.id
);
