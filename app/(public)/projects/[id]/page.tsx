import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getProfile } from "@/lib/portfolio-data";
import { Navbar } from "@/components/portfolio/Navbar";
import { ProjectDetailContent } from "./ProjectDetailContent";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return {};
  return { title: `${project.title} — Ramsey Adrian`, description: project.description };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, profile] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    getProfile(),
  ]);

  if (!project || project.status === "ARCHIVED") notFound();

  const displayName = profile?.name ?? "Ramsey Adrian";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar name={displayName} />
      <ProjectDetailContent project={project} />
    </div>
  );
}
