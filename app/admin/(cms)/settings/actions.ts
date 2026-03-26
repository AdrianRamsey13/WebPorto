"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function changePassword(_: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) return { error: "Tidak terautentikasi." };

  const current = formData.get("current") as string;
  const next = formData.get("new") as string;
  const confirm = formData.get("confirm") as string;

  if (!current || !next || !confirm) return { error: "Semua field wajib diisi." };
  if (next.length < 8) return { error: "Password baru minimal 8 karakter." };
  if (next !== confirm) return { error: "Konfirmasi password tidak cocok." };

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return { error: "User tidak ditemukan." };

  const valid = await bcrypt.compare(current, user.password);
  if (!valid) return { error: "Password saat ini salah." };

  const hashed = await bcrypt.hash(next, 12);
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

  return { success: true };
}
