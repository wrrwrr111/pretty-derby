import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { appWithTranslation } from "next-i18next";

import Layout from "../components/common/Layout";
import { Tooltip, TooltipProvider } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { api } from "../utils/api";

import "../styles/globals.css";

import "../i18n";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <TooltipProvider>
          <Component {...pageProps} />
          <Tooltip className="z-[10000]" />
        </TooltipProvider>
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(appWithTranslation(MyApp));
