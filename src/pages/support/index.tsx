import Head from "next/head";
import React from "react";

import SupportListWithFilter from "src/components/support/SupportListWithFilter";

export default () => {
  return (
    <div className="container mx-auto flex">
      <Head>
        <title>支援 - 乌拉拉大胜利 - 赛马娘资料站</title>
      </Head>
      <SupportListWithFilter />
    </div>
  );
};
