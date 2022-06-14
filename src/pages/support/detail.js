import React from "react";
import { useDidRecover } from "react-router-cache-route";
import SupportDetail from "../../components/support/SupportDetail.js";

const TITLE = "支援 - 乌拉拉大胜利 - 赛马娘资料站";
const SupportDetailPage = (props) => {
  const id = props.match?.params?.id;
  document.title = TITLE;
  useDidRecover(() => {
    document.title = TITLE;
  });
  return (
    <div className="flex flex-auto w-full flex-wrap max-w-6xl mx-auto">
      <SupportDetail id={id} />
    </div>
  );
};

export default SupportDetailPage;
