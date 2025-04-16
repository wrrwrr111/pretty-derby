"use client";

import dynamic from "next/dynamic";

const Page = dynamic(() => import("@/_pages/skill/detail"), {
  ssr: false,
});

export function ClientOnly() {
  return (
 <Page />
  );
}
