import React, { useState } from "react";
import { Modal } from "antd";
import PlayerList from "@/components/player/PlayerList";
import { CDN_SERVER, IMAGE_FALLBACK } from "@/config";

import { Image } from "@/components/ui/image";

const PlayerInput = ({ value = {}, onChange }) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [data, setData] = useState({});

  const showPlayer = () => setIsPlayerVisible(true);
  const closePlayer = () => setIsPlayerVisible(false);

  const triggerChange = (changedValue) => {
    setIsPlayerVisible(false);
    onChange?.({ ...data, ...value, ...changedValue });
  };

  const handleSelectPlayer = (data) => {
    setData(data);
    triggerChange(data);
  };

  return (
    <>
      <Image
        src={data.imgUrl ? CDN_SERVER + data.imgUrl : ""}
        preview="false"
        fallback={IMAGE_FALLBACK}
        width={80}
        onClick={showPlayer}
      />
      <Modal
        visible={isPlayerVisible}
        onOk={closePlayer}
        onCancel={closePlayer}
        width={"80%"}
        bodyStyle={{ maxHeight: "80vh", overflow: "auto" }}
      >
        <PlayerList sortFlag={true} onClick={handleSelectPlayer} />
      </Modal>
    </>
  );
};

export default PlayerInput;
