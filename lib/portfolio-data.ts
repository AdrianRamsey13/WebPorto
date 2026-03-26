import { prisma } from "./prisma";

export async function getProfile() {
  return prisma.profile.findFirst();
}

export async function getProjects() {
  return prisma.project.findMany({
    where: { status: { not: "ARCHIVED" } },
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getExperiences() {
  return prisma.experience.findMany({
    orderBy: [{ current: "desc" }, { startDate: "desc" }],
  });
}

export async function getSkills() {
  return prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
}
