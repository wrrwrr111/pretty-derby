// components/event/EventCard.tsx
"use client";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

interface EventCardProps {
  data: any;
  onClick?: () => void;
  className?: string;
}

export function EventCard({ data, onClick, className }: EventCardProps) {
  if (!data) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          onClick={onClick}
          className={cn(
            "border px-2 py-1 rounded cursor-pointer truncate hover:bg-muted transition-all",
            className
          )}
        >
          {data.name}
        </Card>
      </TooltipTrigger>
      <TooltipContent className="max-w-[400px] p-2 text-sm text-left space-y-2">
        {data.choiceList.map((choice: any, index: number) => (
          <div key={index}>
            <div className="font-semibold">{choice[0]}</div>
            <div className="pl-2 border-l border-gray-300 space-y-1">
              {choice[1].map((result: string, idx: number) => (
                <div key={idx} className="text-muted-foreground">
                  {result}
                </div>
              ))}
            </div>
          </div>
        ))}
      </TooltipContent>
    </Tooltip>
  );
}
