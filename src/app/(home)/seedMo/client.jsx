"use client";

import dynamic from "next/dynamic";

const Page = dynamic(() => import("@/_pages/seedMo"), {
  ssr: false,
});

export function ClientOnly() {
  return (
 <Page />
  );
}
