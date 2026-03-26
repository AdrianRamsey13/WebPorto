"use client";

import { useState } from "react";
import type { Skill } from "@/lib/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function SkillForm({
  skill,
  action,
  categories,
}: {
  skill?: Skill | null;
  action: (formData: FormData) => Promise<void>;
  categories: string[];
}) {
  const [level, setLevel] = useState(skill?.level ?? 75);
  const [showNewCategory, setShowNewCategory] = useState(false);

  return (
    <form action={action} className="space-y-6 max-w-lg">
      <div className="space-y-2">
        <Label htmlFor="name">Nama Skill <span className="text-destructive">*</span></Label>
        <Input id="name" name="name" defaultValue={skill?.name} placeholder="e.g. TypeScript" required />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="category">Kategori <span className="text-destructive">*</span></Label>
          <button type="button" className="text-xs text-primary hover:underline"
            onClick={() => setShowNewCategory(!showNewCategory)}>
            {showNewCategory ? "Pilih yang ada" : "+ Kategori baru"}
          </button>
        </div>
        {showNewCategory ? (
          <Input id="category" name="category" placeholder="e.g. Mobile, DevOps..." required />
        ) : (
          <select id="category" name="category" defaultValue={skill?.category ?? ""}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" required>
            <option value="" disabled>Pilih kategori...</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
            {categories.length === 0 && <option value="Backend">Backend</option>}
          </select>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Level</Label>
          <span className="text-sm font-semibold text-primary">{level}%</span>
        </div>
        <input type="range" name="level" min="0" max="100" value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full accent-primary" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Pemula</span><span>Menengah</span><span>Ahli</span>
        </div>
        {/* Preview bar */}
        <div className="h-1.5 rounded-full bg-border overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${level}%` }} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="iconUrl">Icon URL <span className="text-muted-foreground text-xs">(opsional)</span></Label>
        <Input id="iconUrl" name="iconUrl" defaultValue={skill?.iconUrl ?? ""} placeholder="https://..." />
      </div>

      <div className="flex gap-3">
        <Button type="submit">{skill ? "Simpan Perubahan" : "Tambah Skill"}</Button>
        <Button type="button" variant="outline" onClick={() => history.back()}>Batal</Button>
      </div>
    </form>
  );
}
