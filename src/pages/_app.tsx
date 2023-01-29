import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { appWithTranslation } from "next-i18next";

import Layout from "../components/common/Layout";

import dynamic from "next/dynamic";

const Tooltip = dynamic(() => import("react-tooltip").then((mod) => mod.Tooltip));

import { api } from "../utils/api";

// import "../styles/index.css";
import "../styles/globals.css";

import "../i18n";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Tooltip className="z-max !hidden md:!inline-block" />
    </SessionProvider>
  );
};

export default api.withTRPC(appWithTranslation(MyApp));
