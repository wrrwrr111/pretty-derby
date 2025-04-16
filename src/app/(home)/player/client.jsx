"use client";

import dynamic from "next/dynamic";

const PlayerList = dynamic(() => import("@/components/player/PlayerList"), { ssr: false });

export function ClientOnly() {
  return (
    <>
      <PlayerList className="justify-between" sortFlag={true} />
    </>
  );
}
