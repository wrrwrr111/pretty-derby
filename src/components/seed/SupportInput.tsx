import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SupportListWithFilter from "@/components/support/SupportListWithFilter";
import { IMAGE_FALLBACK } from "@/config";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";

interface SupportData {
  imgUrl?: string;
  [key: string]: any;
}

interface SupportInputProps {
  value?: SupportData;
  onChange?: (value: SupportData) => void;
}

const SupportInput: React.FC<SupportInputProps> = ({ value = {}, onChange }) => {
  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const [data, setData] = useState<SupportData>({});

  const showSupport = () => setIsSupportVisible(true);
  const closeSupport = () => setIsSupportVisible(false);

  const triggerChange = (changedValue: SupportData) => {
    closeSupport();
    onChange?.({ ...data, ...value, ...changedValue });
  };

  const handleSelectSupport = (supportData: SupportData) => {
    setData(supportData);
    triggerChange(supportData);
  };

  return (
    <>
      <div className="w-16 h-16 cursor-pointer" onClick={showSupport}>
        <Image
          src={data.imgUrl}
          fallback={IMAGE_FALLBACK}
          alt="Support card"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <Dialog open={isSupportVisible} onOpenChange={setIsSupportVisible}>
        <DialogContent className="max-w-[90vw]! w-full h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Select Support Card</DialogTitle>
          </DialogHeader>
          <div className="h-full flex relative">
            <SupportListWithFilter
              formName="seedSupMo"
              onClick={handleSelectSupport}
              limitHeight={true}
              sortFlag={true}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SupportInput;
