"use client";

import type { Experience } from "@/lib/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function toDateInput(date: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export function ExperienceForm({
  experience,
  action,
}: {
  experience?: Experience | null;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Perusahaan / Institusi <span className="text-destructive">*</span></Label>
          <Input id="company" name="company" defaultValue={experience?.company} placeholder="PT. Example" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Posisi / Role <span className="text-destructive">*</span></Label>
          <Input id="role" name="role" defaultValue={experience?.role} placeholder="Backend Developer" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi <span className="text-destructive">*</span></Label>
        <Textarea id="description" name="description" defaultValue={experience?.description} placeholder="Tanggung jawab dan pencapaian..." rows={3} required />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Lokasi</Label>
          <Input id="location" name="location" defaultValue={experience?.location ?? ""} placeholder="Jakarta, Indonesia" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Tipe</Label>
          <select id="type" name="type" defaultValue={experience?.type ?? "WORK"}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="WORK">Work</option>
            <option value="EDUCATION">Education</option>
            <option value="FREELANCE">Freelance</option>
            <option value="VOLUNTEER">Volunteer</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Mulai <span className="text-destructive">*</span></Label>
          <Input id="startDate" name="startDate" type="date" defaultValue={toDateInput(experience?.startDate ?? null)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Selesai</Label>
          <Input id="endDate" name="endDate" type="date" defaultValue={toDateInput(experience?.endDate ?? null)} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="current" name="current" defaultChecked={experience?.current ?? false}
          className="w-4 h-4 accent-primary" />
        <Label htmlFor="current" className="cursor-pointer">Masih bekerja di sini (current)</Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit">{experience ? "Simpan Perubahan" : "Tambah Experience"}</Button>
        <Button type="button" variant="outline" onClick={() => history.back()}>Batal</Button>
      </div>
    </form>
  );
}
