"use client";

import { useActionState } from "react";
import { changePassword } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, null);

  return (
    <form action={action} className="space-y-5 max-w-sm">
      {state?.error && (
        <div className="px-4 py-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="px-4 py-3 rounded-lg bg-primary/10 text-primary text-sm border border-primary/20">
          Password berhasil diubah.
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="current">Password Saat Ini</Label>
        <Input id="current" name="current" type="password" placeholder="••••••••" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new">Password Baru</Label>
        <Input id="new" name="new" type="password" placeholder="Min. 8 karakter" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm">Konfirmasi Password Baru</Label>
        <Input id="confirm" name="confirm" type="password" placeholder="Ulangi password baru" required />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Menyimpan..." : "Ubah Password"}
      </Button>
    </form>
  );
}
