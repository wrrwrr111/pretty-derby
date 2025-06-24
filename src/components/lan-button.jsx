import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import i18n from "@/i18n";

const LanButton = () => {
  const changeLanguage = (lan) => {
    i18n.changeLanguage(lan);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {i18n.language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("zh_CN")}>
          中文 (zh_CN)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          English (en)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanButton;
