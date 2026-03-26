import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProjectForm } from "../../ProjectForm";
import { updateProject } from "../../actions";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  const action = updateProject.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground text-sm mt-1">{project.title}</p>
      </div>
      <ProjectForm project={project} action={action} />
    </div>
  );
}
