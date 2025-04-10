"use server";

import { Separator } from "@/components/ui/separator";

export async function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Separator />
      {children}
    </div>
  );
}
