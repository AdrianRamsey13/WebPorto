"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertProfile(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    title: formData.get("title") as string,
    bio: formData.get("bio") as string,
    location: (formData.get("location") as string) || null,
    email: (formData.get("email") as string) || null,
    github: (formData.get("github") as string) || null,
    linkedin: (formData.get("linkedin") as string) || null,
    twitter: (formData.get("twitter") as string) || null,
    website: (formData.get("website") as string) || null,
  };

  await prisma.profile.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });

  revalidatePath("/");
  revalidatePath("/admin/profile");
}
