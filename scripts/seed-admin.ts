import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@portfolio.local";
  const password = "admin123"; // ganti setelah login pertama!

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hashed, name: "Admin" },
  });

  console.log("Admin user created:", user.email);
  console.log("Password:", password);
  console.log("\nSEGERA ganti password setelah login pertama!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
