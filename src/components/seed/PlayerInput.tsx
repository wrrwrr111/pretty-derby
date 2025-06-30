import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PlayerList from "@/components/player/PlayerList";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlayerData {
  imgUrl?: string;
  [key: string]: any;
}

interface PlayerInputProps {
  value?: PlayerData;
  onChange?: (value: PlayerData) => void;
}

const PlayerInput: React.FC<PlayerInputProps> = ({ value = {}, onChange }) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [data, setData] = useState<PlayerData>({});

  const showPlayer = () => setIsPlayerVisible(true);
  const closePlayer = () => setIsPlayerVisible(false);

  const triggerChange = (changedValue: PlayerData) => {
    closePlayer();
    onChange?.({ ...data, ...value, ...changedValue });
  };

  const handleSelectPlayer = (playerData: PlayerData) => {
    setData(playerData);
    triggerChange(playerData);
  };

  return (
    <>
      <div className="w-16 h-16 cursor-pointer" onClick={showPlayer}>
        <Image
          src={data?.imgUrl}
          alt="Player image"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <Dialog open={isPlayerVisible} onOpenChange={setIsPlayerVisible}>
        <DialogContent className="max-w-[90vw]! w-full h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Select Player</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-full">
            <PlayerList sortFlag={true} onClick={handleSelectPlayer} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlayerInput;
