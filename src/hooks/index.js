import useSWRImmutable from "swr/immutable";
import low from "lowdb";
import Memory from "lowdb/adapters/Memory";

import jsonDB from "../assert/db.json";

// const useDB = () => {
//   const fetcher = (...args) =>
//     fetch(...args)
//       .then((res) => res.json())
//       .then((data) => {
//         const adapterM = new Memory();
//         const db = low(adapterM);
//         db.set("players", data.players).write();
//         db.set("supports", data.supports).write();
//         db.set("skills", data.skills).write();
//         db.set("events", data.events).write();
//         db.set("updateTime", data.updateTime).write();
//         db.set("races", data.races).write();
//         db.set("buffs", data.buffs).write();
//         db.set("effects", data.effects).write();
//         return db;
//       });
//   const { data } = useSWRImmutable(
//     "https://fastly.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/src/assert/db.json",
//     fetcher
//   );
//   return data;
// };

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
