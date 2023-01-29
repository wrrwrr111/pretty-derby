import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const uraraDbAtom = atomWithStorage(
  "db",
  {},
  {
    ...createJSONStorage(() => localStorage),
    delayInit: true,
  }
);

export const uraraUserIdAtom = atomWithStorage("uraraUserId", "", {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});

export const myDecksAtom = atomWithStorage("myDecks", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});

export const mySupportsAtom = atomWithStorage("mySupports", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});

export const layoutAtom = atomWithStorage("layout", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});

export const selectedAtom = atomWithStorage(
  "selected",
  {
    supports: [],
    player: {},
    races: [],
    filterCondition: {
      distanceType: [],
      grade: [],
      ground: [],
    },
    filterRace: {},
  },
  {
    ...createJSONStorage(() => localStorage),
    delayInit: true,
  }
);

//  {
//   lan: "cn",
//   selected: {
//     supports: {
//       "0": {},
//       "1": {},
//       "2": {},
//       "3": {},
//       "4": {},
//       "5": {},
//     },
//     player: {},
//     races: [],
//   },
//   myDecks: [],
//   mySupports: [],
//   userId: "6o-NSm6U4",
//   layout: [
//     {
//       w: 2,
//       h: 2,
//       x: 0,
//       y: 0,
//       i: "a",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 9,
//       h: 2,
//       x: 2,
//       y: 0,
//       i: "b",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 11,
//       h: 7,
//       x: 0,
//       y: 2,
//       i: "c",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 5,
//       h: 4,
//       x: 0,
//       y: 9,
//       i: "d",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 6,
//       h: 7,
//       x: 5,
//       y: 9,
//       i: "e",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 5,
//       h: 3,
//       x: 0,
//       y: 13,
//       i: "f",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 7,
//       h: 8,
//       x: 11,
//       y: 0,
//       i: "s0",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 7,
//       h: 8,
//       x: 18,
//       y: 0,
//       i: "s1",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 7,
//       h: 8,
//       x: 25,
//       y: 0,
//       i: "s2",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 7,
//       h: 8,
//       x: 11,
//       y: 8,
//       i: "s3",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 7,
//       h: 8,
//       x: 18,
//       y: 8,
//       i: "s4",
//       moved: false,
//       static: false,
//     },
//     {
//       w: 7,
//       h: 8,
//       x: 25,
//       y: 8,
//       i: "s5",
//       moved: false,
//       static: false,
//     },
//   ],
// };
