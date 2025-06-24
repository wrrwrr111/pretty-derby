import React, { useState } from "react";
import { Modal } from "antd";
import PlayerList from "@/components/player/PlayerList";
import { Image } from "@/components/ui/image";

const PlayerInput = ({ value = {}, onChange }) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [data, setData] = useState({});

  const showPlayer = () => setIsPlayerVisible(true);
  const closePlayer = () => setIsPlayerVisible(false);

  const triggerChange = (changedValue) => {
    closePlayer();
    onChange?.({ ...data, ...value, ...changedValue });
  };

  const handleSelectPlayer = (data) => {
    console.log("🚀 ~ handleSelectPlayer ~ data:", data);
    setData(data);
    triggerChange(data);
  };

  return (
    <>
      <div className="w-16 h-16">
        <Image src={data?.imgUrl} onClick={showPlayer} />
      </div>
      <Modal
        visible={isPlayerVisible}
        onOk={closePlayer}
        onCancel={closePlayer}
        width="100%"
        bodyStyle={{ maxHeight: "80vh", overflow: "auto" }}
      >
        <PlayerList sortFlag={true} onClick={handleSelectPlayer} />
      </Modal>
    </>
  );
};

export default PlayerInput;
