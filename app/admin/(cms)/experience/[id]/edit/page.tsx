import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ExperienceForm } from "../../ExperienceForm";
import { updateExperience } from "../../actions";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({ where: { id } });
  if (!experience) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Experience</h1>
        <p className="text-muted-foreground text-sm mt-1">{experience.role} @ {experience.company}</p>
      </div>
      <ExperienceForm experience={experience} action={updateExperience.bind(null, id)} />
    </div>
  );
}
