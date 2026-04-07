"use client";

import { useTransition } from "react";
import { markAsRead, deleteMessage } from "./actions";
import { Button } from "@/components/ui/button";
import { CheckCheck, Trash2 } from "lucide-react";

export function MessageActions({ id, read }: { id: string; read: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-1">
      {!read && (
        <Button variant="ghost" size="icon" title="Tandai sudah dibaca"
          disabled={pending}
          onClick={() => startTransition(() => markAsRead(id))}>
          <CheckCheck className="w-4 h-4 text-primary" />
        </Button>
      )}
      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"
        title="Hapus pesan" disabled={pending}
        onClick={() => {
          if (!confirm("Hapus pesan ini?")) return;
          startTransition(() => deleteMessage(id));
        }}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
