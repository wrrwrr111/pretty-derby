import React from "react";
import { useRouter } from "next/router.js";
import SupportDetail from "/components/support/SupportDetail.js";

// const TITLE = "支援 - 乌拉拉大胜利 - 赛马娘资料站";
const SupportDetailPage = () => {
  const router = useRouter();
  const id = router.query?.id;
  return (
    <div className="flex flex-auto w-full flex-wrap max-w-6xl mx-auto">
      <SupportDetail id={id} />
    </div>
  );
};

export default SupportDetailPage;
