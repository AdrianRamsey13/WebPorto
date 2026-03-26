"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseForm(formData: FormData) {
  return {
    company: formData.get("company") as string,
    role: formData.get("role") as string,
    description: formData.get("description") as string,
    location: (formData.get("location") as string) || null,
    startDate: new Date(formData.get("startDate") as string),
    endDate: formData.get("endDate") ? new Date(formData.get("endDate") as string) : null,
    current: formData.get("current") === "on",
    type: (formData.get("type") as "WORK" | "EDUCATION" | "FREELANCE" | "VOLUNTEER") ?? "WORK",
  };
}

export async function createExperience(formData: FormData) {
  await prisma.experience.create({ data: parseForm(formData) });
  revalidatePath("/");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  await prisma.experience.update({ where: { id }, data: parseForm(formData) });
  revalidatePath("/");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}
