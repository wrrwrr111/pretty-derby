import React, { useState } from "react";
import { Modal } from "antd";
import SupportListWithFilter from "@/components/support/SupportListWithFilter";
import { CDN_SERVER, IMAGE_FALLBACK } from "@/config";

import { Image } from "@/components/ui/image";

const SupportInput = ({ value = {}, onChange }) => {
  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const [data, setData] = useState({});

  const showSupport = () => setIsSupportVisible(true);
  const closeSupport = () => setIsSupportVisible(false);

  const triggerChange = (changedValue) => {
    setIsSupportVisible(false);
    onChange?.({ ...data, ...value, ...changedValue });
  };

  const handleSelectSupport = (data) => {
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
        onClick={showSupport}
      />
      <Modal
        visible={isSupportVisible}
        onOk={closeSupport}
        onCancel={closeSupport}
        width={"80%"}
        bodyStyle={{ height: "90vh" }}
      >
        <div className="w-full h-full overflow-hidden flex relative">
          <SupportListWithFilter formName="seedSup" onClick={handleSelectSupport} sortFlag={true} />
        </div>
      </Modal>
    </>
  );
};

export default SupportInput;
