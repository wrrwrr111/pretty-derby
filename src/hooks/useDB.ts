import { Low, Memory } from "lowdb";
import { JSONFile } from "lowdb/node"; // If you need file storage later
import { useState, useEffect } from "react";
import lodash from "lodash";

// Define your database schema
export type Schema = {
  players: PlayerList;
  supports: SupportCardList;
  skills: SkillList[];
  events: any[];
  updateTime: string;
  races: any[];
  buffs: any[];
  effects: any[];
};

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

let db: LowWithLodash<Schema>;
let dbReady = false;

export function useDB() {
  const [loading, setLoading] = useState(!dbReady);

  useEffect(() => {
    if (dbReady) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch("/db.json");
        if (!res.ok) throw new Error("Failed to load db.json");
        const jsonDB = await res.json();
        console.log("🚀 ~ fetchData ~ jsonDB:", jsonDB);

        // Create in-memory database
        const adapter = new Memory<Schema>();
        db = new LowWithLodash(adapter, {
          players: [],
          supports: [],
          skills: [],
          events: [],
          updateTime: "",
          races: [],
          buffs: [],
          effects: [],
        });

        // Initialize with default data
        await db.read();

        // Update the database with fetched data
        db.data.players = jsonDB.players;
        db.data.supports = jsonDB.supports;
        db.data.skills = jsonDB.skills;
        db.data.events = jsonDB.events;
        db.data.updateTime = jsonDB.updateTime;
        db.data.races = jsonDB.races;
        db.data.buffs = jsonDB.buffs;
        db.data.effects = jsonDB.effects;

        await db.write();

        dbReady = true;
      } catch (error) {
        console.error("DB load error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { db, loading };
}
