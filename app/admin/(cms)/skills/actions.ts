"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseForm(formData: FormData) {
  return {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    level: parseInt(formData.get("level") as string, 10),
    iconUrl: (formData.get("iconUrl") as string) || null,
  };
}

export async function createSkill(formData: FormData) {
  await prisma.skill.create({ data: parseForm(formData) });
  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  await prisma.skill.update({ where: { id }, data: parseForm(formData) });
  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}
