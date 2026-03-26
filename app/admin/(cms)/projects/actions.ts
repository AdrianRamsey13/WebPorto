"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseProjectForm(formData: FormData) {
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    longDesc: (formData.get("longDesc") as string) || null,
    imageUrl: (formData.get("imageUrl") as string) || null,
    demoUrl: (formData.get("demoUrl") as string) || null,
    repoUrl: (formData.get("repoUrl") as string) || null,
    tags,
    featured: formData.get("featured") === "on",
    status: (formData.get("status") as "ACTIVE" | "COMPLETED" | "ARCHIVED") ?? "ACTIVE",
  };
}

export async function createProject(formData: FormData) {
  await prisma.project.create({ data: parseProjectForm(formData) });
  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await prisma.project.update({ where: { id }, data: parseProjectForm(formData) });
  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}
