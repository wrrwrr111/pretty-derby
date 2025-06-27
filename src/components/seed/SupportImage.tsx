import React from "react";
import { useDB } from "@/hooks/useDB";
import { Image } from "@/components/ui/image";

const SupportImage = ({ id }: { id: string }) => {
  const { db } = useDB();
  if (!db) return null;
  const support = db.chain.get("supports").find({ id }).value();
  return <Image src={support?.imgUrl} width={80} />;
};

export default SupportImage;
