"use client";

import dynamic from "next/dynamic";

const SkillListWithFilter = dynamic(() => import("@/components/skill/SkillListWithFilter"), {
  ssr: false,
});

export function ClientOnly() {
  return (
    <>
      <SkillListWithFilter />
    </>
  );
}
