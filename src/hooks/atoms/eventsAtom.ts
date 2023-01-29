import { atom } from "jotai";
import { Event } from "../../../typings";

const eventsJSON = require("./events.json");

export const eventsAtom = atom<Event[]>(eventsJSON || []);
