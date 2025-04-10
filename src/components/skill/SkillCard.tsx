"use client";

import { useState } from "react";
import { CDN_SERVER } from "@/config";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import { Event } from "@/types";

const rarityColor = {
  1: "bg-white",
  2: "bg-yellow-200",
  3: "bg-purple-200",
  4: "bg-purple-200",
  5: "bg-purple-200",
};

const SkillCard = ({
  data,
  onClick,
}: {
  data: Event;
  onClick?: () => void;
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);

  if (!data) return null;

  const content = (
    <Button
      variant="outline"
      className={cn(rarityColor[data.rarity])}
      onClick={onClick}
    >
      {show && (
        <Image
          className="h-5 w-5"
          onError={() => setShow(false)}
          alt={data.name}
          src={"/" + data.imgUrl}
          width="20"
          height="20"
        />
      )}
      {data.name}
    </Button>
  );

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="top">
          <div className="text-xs">
            <div>{t(data.describe)}</div>
            <div>{t(data.condition)}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SkillCard;
