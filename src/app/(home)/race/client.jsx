"use client";

import dynamic from "next/dynamic";

const Page = dynamic(() => import("@/_pages/race"), {
  ssr: false,
});

export function ClientOnly() {
  return (
 <Page />
  );
}
