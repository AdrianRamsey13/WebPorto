"use client";

import { useTransition } from "react";
import { deleteProject } from "./actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeleteProjectButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Hapus project ini?")) return;
    startTransition(() => deleteProject(id));
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:text-destructive"
      onClick={handleDelete}
      disabled={pending}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
