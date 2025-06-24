import React, { useState } from "react";
import { Modal } from "antd";
import SupportListWithFilter from "@/components/support/SupportListWithFilter";
import { IMAGE_FALLBACK } from "@/config";
import { Image } from "@/components/ui/image";

const SupportInput = ({ value = {}, onChange }) => {
  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const [data, setData] = useState({});

  const showSupport = () => setIsSupportVisible(true);
  const closeSupport = () => setIsSupportVisible(false);

  const triggerChange = (changedValue) => {
    closeSupport();
    onChange?.({ ...data, ...value, ...changedValue });
  };

  const handleSelectSupport = (data) => {
    setData(data);
    triggerChange(data);
  };

  return (
    <>
      <div className="w-16 h-16">
        <Image src={data.imgUrl} fallback={IMAGE_FALLBACK} onClick={showSupport} />
      </div>
      <Modal
        visible={isSupportVisible}
        onOk={closeSupport}
        onCancel={closeSupport}
        width="100%"
        bodyStyle={{ height: "80vh" }}
      >
        <div className="w-full h-full overflow-hidden flex relative">
          <SupportListWithFilter
            formName="seedSupMo"
            onClick={handleSelectSupport}
            sortFlag={true}
          />
        </div>
      </Modal>
    </>
  );
};

export default SupportInput;
