import React from "react";
import { appWithTranslation } from "next-i18next";
import "antd/dist/antd.css";
import "@material-tailwind/react/tailwind.css";
import "tailwindcss/tailwind.css";
import "/public/styles/global.css";
import "/src/i18n";

import Layout from "/components/common/Layout.js";
import ReactTooltip from "react-tooltip";
const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
      <ReactTooltip className="z-max !hidden md:!inline-block" html={true} />
    </Layout>
  );
};

export default appWithTranslation(App);
