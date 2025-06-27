import React from "react";
import { useDB } from "@/hooks";
import { Image } from "@/components/ui/image";

const PlayerImage = ({ id }: { id: string }) => {
  const { db } = useDB();
  if (!db) return null;
  const player = db.get("players").find({ id }).value();
  return <Image src={player?.imgUrl} width={80} />;
};

export default PlayerImage;
