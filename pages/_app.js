import React, { useEffect, useState } from "react";
import { appWithTranslation } from "next-i18next";
import ReactTooltip from "react-tooltip";

import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import "@material-tailwind/react/tailwind.css";

import "public/styles/global.css";
import "src/i18n";

import Layout from "components/common/Layout.js";
import { AppWrapper } from "context/state";
const App = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <AppWrapper>
      <Layout>
        <Component {...pageProps} />
        {mounted && <ReactTooltip className="z-max !hidden md:!inline-block" html={true} />}
      </Layout>
    </AppWrapper>
  );
};

export default appWithTranslation(App);
