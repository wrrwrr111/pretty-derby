import low from "lowdb";
import Memory from "lowdb/adapters/Memory";

import jsonDB from "@/assert/db.json";

const adapterM = new Memory();
const db = low(adapterM);
db.set("players", jsonDB.players).write();
db.set("supports", jsonDB.supports).write();
db.set("skills", jsonDB.skills).write();
db.set("events", jsonDB.events).write();
db.set("updateTime", jsonDB.updateTime).write();
db.set("races", jsonDB.races).write();
db.set("buffs", jsonDB.buffs).write();
db.set("effects", jsonDB.effects).write();

const useDB = () => {
  return db;
};

export { useDB };
