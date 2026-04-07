"use server";

import { prisma } from "@/lib/prisma";

export async function submitContact(_: unknown, formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim();
  const subject = (formData.get("subject") as string).trim();
  const message = (formData.get("message") as string).trim();

  if (!name || !email || !message) return { error: "Nama, email, dan pesan wajib diisi." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Format email tidak valid." };
  if (message.length < 10) return { error: "Pesan terlalu pendek." };

  await prisma.message.create({ data: { name, email, subject: subject || null, message } });

  return { success: true };
}
