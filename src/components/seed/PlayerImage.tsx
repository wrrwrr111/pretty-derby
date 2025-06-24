import React from "react";
import { Image } from "antd";
import { useDB } from "@/hooks";
import { IMAGE_FALLBACK, CDN_SERVER } from "@/config";

const PlayerImage = ({ id }) => {
  const db = useDB();
  if (!db) return null;
  const player = db.get("players").find({ id }).value();
  return <Image src={player?.imgUrl ? CDN_SERVER + player.imgUrl : ""} fallback={IMAGE_FALLBACK} width={80} preview={false} />;
};

export default PlayerImage;
