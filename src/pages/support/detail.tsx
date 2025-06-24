import React from "react";
import SupportDetail from "@/components/support/SupportDetail";

const SupportDetailPage = (props) => {
  const id = props.match?.params?.id;

  return (
    <div className="flex flex-auto w-full flex-wrap max-w-6xl mx-auto">
      <SupportDetail id={id} page />
    </div>
  );
};

export default SupportDetailPage;
