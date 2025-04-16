"use client";

import dynamic from "next/dynamic";

const Page = dynamic(() => import("@/components/buff"), {
  ssr: false,
});

export function ClientOnly() {
  return <Page />;
}
