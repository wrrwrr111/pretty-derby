// src/context/state.js
import { createContext, useContext } from "react";
import dbJSON from "src/assert/db.json";
const sortedData = {
  ...dbJSON,
  skills: dbJSON.skills.sort((a, b) => a.id - b.id),
};
const AppContext = createContext();

export function AppWrapper({ children }) {
  return <AppContext.Provider value={sortedData}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
