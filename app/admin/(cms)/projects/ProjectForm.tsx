"use client";

import { useState } from "react";
import type { Project } from "@/lib/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

function Field({ label, name, defaultValue, placeholder, type = "text", required }: {
  label: string; name: string; defaultValue?: string | null;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}{required && <span className="text-destructive ml-1">*</span>}</Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue ?? ""} placeholder={placeholder} required={required} />
    </div>
  );
}

export function ProjectForm({
  project,
  action,
}: {
  project?: Project | null;
  action: (formData: FormData) => Promise<void>;
}) {
  const [tags, setTags] = useState<string[]>(project?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  function addTag() {
    const val = tagInput.trim();
    if (val && !tags.includes(val)) setTags([...tags, val]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Judul" name="title" defaultValue={project?.title} placeholder="My Awesome Project" required />
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={project?.status ?? "ACTIVE"}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi Singkat <span className="text-destructive">*</span></Label>
        <Textarea id="description" name="description" defaultValue={project?.description ?? ""} placeholder="Deskripsi singkat yang tampil di card..." rows={2} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="longDesc">Deskripsi Lengkap</Label>
        <Textarea id="longDesc" name="longDesc" defaultValue={project?.longDesc ?? ""} placeholder="Penjelasan lebih detail tentang project ini..." rows={4} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Demo URL" name="demoUrl" defaultValue={project?.demoUrl} placeholder="https://demo.example.com" />
        <Field label="Repo URL" name="repoUrl" defaultValue={project?.repoUrl} placeholder="https://github.com/..." />
      </div>

      <Field label="Image URL" name="imageUrl" defaultValue={project?.imageUrl} placeholder="https://..." />

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            placeholder="Ketik tag lalu Enter..."
          />
          <Button type="button" variant="outline" onClick={addTag}>Tambah</Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        {/* Hidden input to submit tags as comma-separated */}
        <input type="hidden" name="tags" value={tags.join(",")} />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={project?.featured ?? false}
          className="w-4 h-4 accent-primary"
        />
        <Label htmlFor="featured" className="cursor-pointer">Tampilkan sebagai Featured project</Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit">
          {project ? "Simpan Perubahan" : "Tambah Project"}
        </Button>
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Batal
        </Button>
      </div>
    </form>
  );
}
