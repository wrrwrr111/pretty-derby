"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="max-h-[80vh] w-fit max-w-[80vw] overflow-y-auto">
      <DialogTitle>Are you absolutely sure?</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
