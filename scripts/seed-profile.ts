import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.profile.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      name: "Ramsey Adrian",
      title: "Web Developer · .Net Developer · Backend Specialist",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      location: "Indonesia",
    },
  });

  console.log("Profile seeded:", profile.name);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
