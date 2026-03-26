"use client";

import { useTransition } from "react";
import { deleteSkill } from "./actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeleteSkillButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"
      disabled={pending}
      onClick={() => {
        if (!confirm("Hapus skill ini?")) return;
        startTransition(() => deleteSkill(id));
      }}>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
