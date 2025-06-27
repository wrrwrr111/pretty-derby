import low from "lowdb";
import Memory from "lowdb/adapters/Memory";
import { useState, useEffect } from "react";

let db: ReturnType<typeof low> | null = null;
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
        console.log("🚀 ~ fetchData ~ jsonDB:", jsonDB)

        const adapter = new Memory();
        db = low(adapter);

        db.set("players", jsonDB.players).write();
        db.set("supports", jsonDB.supports).write();
        db.set("skills", jsonDB.skills).write();
        db.set("events", jsonDB.events).write();
        db.set("updateTime", jsonDB.updateTime).write();
        db.set("races", jsonDB.races).write();
        db.set("buffs", jsonDB.buffs).write();
        db.set("effects", jsonDB.effects).write();

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
