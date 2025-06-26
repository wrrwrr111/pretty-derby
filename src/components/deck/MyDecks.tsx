import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import dbL from "@/dbL";
import { useTranslation } from "react-i18next";
import { CDN_SERVER, DECK_LABELS } from "@/config";
import { Deck, DeckComponentProps } from "./deck-types";
import { deckActions } from "./DeckActions";
import { toast } from "sonner";

const MyDecks: React.FC<DeckComponentProps> = ({ player, supports, loadDeck }) => {
  const { t } = useTranslation();
  const [decks, setDecks] = useState(dbL.get("myDecks").value());
  const [confirmAction, setConfirmAction] = useState<{
    type: "save" | "delete" | "share";
    deck?: Deck;
    open: boolean;
  }>({ type: "save", open: false });

  const handleConfirm = async () => {
    let newDecks = decks;
    let message = "";

    switch (confirmAction.type) {
      case "save":
        newDecks = deckActions.saveDeck(confirmAction.deck || null, player, supports);
        message = t("卡组已保存");
        break;
      case "delete":
        newDecks = deckActions.deleteDeck(confirmAction.deck!);
        message = t("卡组已删除");
        break;
      case "share":
        const shareMessage = await deckActions.shareDeck(confirmAction.deck!);
        message = shareMessage || t("卡组已分享");
        break;
    }

    setDecks(newDecks);
    setConfirmAction({ ...confirmAction, open: false });
    toast.info(message);
  };

  const onChangeTag = (values: string[], deck: Deck) => {
    dbL.get("myDecks").find({ id: deck.id }).assign({ tags: values }).write();
    setDecks([...dbL.get("myDecks").value()]);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline">
            {t("我的卡组")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[800px] max-h-[800px] overflow-auto">
          <div className="space-y-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setConfirmAction({ type: "save", open: true })}
            >
              {t("保存为新卡组")}
            </Button>

            {decks.map((deck) => (
              <div key={deck.id} className="w-full grid grid-cols-8 gap-2">
                <div className="col-span-full space-y-2">
                  <Label>{t("标签")}</Label>
                  <div className="flex flex-wrap gap-2">
                    {DECK_LABELS.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${deck.id}-${option.value}`}
                          checked={deck.tags?.includes(option.value) || false}
                          onCheckedChange={(checked) => {
                            const newTags = checked
                              ? [...(deck.tags || []), option.value]
                              : (deck.tags || []).filter((tag) => tag !== option.value);
                            onChangeTag(newTags, deck);
                          }}
                        />
                        <Label htmlFor={`${deck.id}-${option.value}`}>{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {deck.imgUrls.map((imgUrl) => (
                  <div className="col-span-1" key={imgUrl}>
                    <img src={CDN_SERVER + imgUrl} alt={imgUrl} className="w-full" />
                  </div>
                ))}

                <div className="col-span-1 space-y-2">
                  <Button variant="outline" size="sm" onClick={() => loadDeck(deck)}>
                    {t("读取卡组")}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirmAction({ type: "save", deck, open: true })}
                  >
                    {t("覆盖卡组")}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirmAction({ type: "delete", deck, open: true })}
                  >
                    {t("删除卡组")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmAction({ type: "share", deck, open: true })}
                  >
                    {t("分享卡组")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog
        open={confirmAction.open}
        onOpenChange={(open) => setConfirmAction({ ...confirmAction, open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("确认操作")}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction.type === "save" && t("确认覆盖卡组？")}
              {confirmAction.type === "delete" && t("确认删除卡组？")}
              {confirmAction.type === "share" && t("确认分享卡组？")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("取消")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>{t("确认")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MyDecks;
