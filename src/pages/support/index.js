import React from "react";
import { useDidRecover } from "react-router-cache-route";

import SupportListWithFilter from "../../components/support/SupportListWithFilter";
const TITLE = "支援 - 乌拉拉大胜利 - 赛马娘资料站";

const Support = () => {
  document.title = TITLE;
  useDidRecover(() => {
    document.title = TITLE;
  });

  return <SupportListWithFilter />;
};
export default Support;
