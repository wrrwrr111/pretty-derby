import { LocalStoragePreset } from "lowdb/browser";
import axios from "axios";
import lodash from "lodash";
import { LowSync } from "lowdb/lib";

// Define your database schema
type Schema = {
  userId?: any;
  lan: string;
  selected: {
    supports: Record<number, {}>;
    player: {};
    races: any[];
  };
  myDecks: any[];
  mySupports: any[];
};

const defaultData: Schema = {
  lan: "cn",
  selected: {
    supports: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
    player: {},
    races: [],
  },
  myDecks: [],
  mySupports: [],
};

// Create a custom interface that combines LowSync with lodash chain
interface LowSyncWithChain<T> extends LowSync<T> {
  chain: lodash.ExpChain<T>;
}

// Initialize the database
const db = LocalStoragePreset<Schema>("db", defaultData) as LowSyncWithChain<Schema>;

// Add the chain property
db.chain = lodash.chain(db.data);

// Initialize database with default values
async function initializeDB() {
  await db.read();

  // Set defaults if they don't exist
  db.data ||= { ...defaultData };
  db.data.lan ||= "cn";
  db.data.selected ||= {
    supports: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
    player: {},
    races: [],
  };
  db.data.myDecks ||= [];
  db.data.mySupports ||= [];

  // Fetch userId if not present
  if (!db.data.userId) {
    await fetchUserId();
  }

  await db.write();
}

async function fetchUserId() {
  try {
    const res = await axios.get("https://urarawin-worker.urarawin.workers.dev/api/sqlite/d");
    db.data.userId = res.data;
    await db.write();
  } catch (error) {
    console.error("Failed to fetch userId:", error);
  }
}

// Initialize the database
initializeDB();

export default db;
