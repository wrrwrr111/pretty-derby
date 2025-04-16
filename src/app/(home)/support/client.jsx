"use client";

import dynamic from "next/dynamic";

const SupportListWithFilter = dynamic(() => import("@/components/support/SupportListWithFilter"), {
  ssr: false,
});

export function ClientOnly() {
  return (
    <>
      <SupportListWithFilter />
    </>
  );
}
