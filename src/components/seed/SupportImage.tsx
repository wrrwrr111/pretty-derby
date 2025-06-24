import React from "react";
import { Image } from "antd";
import { useDB } from "@/hooks";
import { IMAGE_FALLBACK, CDN_SERVER } from "@/config";

const SupportImage = ({ id }) => {
  const db = useDB();
  if (!db) return null;
  const support = db.get("supports").find({ id }).value();
  return <Image src={support?.imgUrl ? CDN_SERVER + support.imgUrl : ""} fallback={IMAGE_FALLBACK} width={80} preview={false} />;
};

export default SupportImage;
