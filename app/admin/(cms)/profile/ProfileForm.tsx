"use client";

import { useActionState } from "react";
import { upsertProfile } from "./actions";
import type { Profile } from "@/lib/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Field({ label, name, defaultValue, placeholder, type = "text" }: {
  label: string; name: string; defaultValue?: string | null;
  placeholder?: string; type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue ?? ""} placeholder={placeholder} />
    </div>
  );
}

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, action, pending] = useActionState(
    async (_: unknown, formData: FormData) => {
      await upsertProfile(formData);
      return { success: true };
    },
    null
  );

  return (
    <form action={action} className="space-y-6 max-w-2xl">
      {state?.success && (
        <div className="px-4 py-3 rounded-lg bg-primary/10 text-primary text-sm border border-primary/20">
          Profile berhasil disimpan.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nama" name="name" defaultValue={profile?.name} placeholder="Ramsey Adrian" />
        <Field label="Title / Role" name="title" defaultValue={profile?.title} placeholder="Web Developer · Backend" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" defaultValue={profile?.bio ?? ""} placeholder="Ceritakan sedikit tentang dirimu..." rows={4} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Lokasi" name="location" defaultValue={profile?.location} placeholder="Indonesia" />
        <Field label="Email" name="email" type="email" defaultValue={profile?.email} placeholder="hello@example.com" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="GitHub URL" name="github" defaultValue={profile?.github} placeholder="https://github.com/username" />
        <Field label="LinkedIn URL" name="linkedin" defaultValue={profile?.linkedin} placeholder="https://linkedin.com/in/username" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Twitter / X URL" name="twitter" defaultValue={profile?.twitter} placeholder="https://x.com/username" />
        <Field label="Website URL" name="website" defaultValue={profile?.website} placeholder="https://yourwebsite.com" />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Menyimpan..." : "Simpan Profile"}
      </Button>
    </form>
  );
}
