import React, { useState, useEffect } from "react";
import { useDidRecover } from "react-router-cache-route";

import Layout from "../../components/common/Layout.js";
import SupportListWithFilter from "../../components/support/SupportListWithFilter";
const TITLE = "支援 - 乌拉拉大胜利 - 赛马娘资料站";


const Support = (props) => {
  document.title = TITLE;
  useDidRecover(() => {
    document.title = TITLE;
  });

  return (
    <Layout 
    rootClass={"w-screen h-screen flex flex-col relative"}
    contentClass="flex flex-auto w-full flex-wrap max-w-6xl mx-auto overflow-hidden relative">
      <SupportListWithFilter></SupportListWithFilter>
    </Layout>
  );
};
export default Support;
