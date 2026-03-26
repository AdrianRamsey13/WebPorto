import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { SkillForm } from "../../SkillForm";
import { updateSkill } from "../../actions";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [skill, allSkills] = await Promise.all([
    prisma.skill.findUnique({ where: { id } }),
    prisma.skill.findMany({ select: { category: true }, distinct: ["category"] }),
  ]);
  if (!skill) notFound();

  const categories = allSkills.map((s) => s.category);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Skill</h1>
        <p className="text-muted-foreground text-sm mt-1">{skill.name}</p>
      </div>
      <SkillForm skill={skill} action={updateSkill.bind(null, id)} categories={categories} />
    </div>
  );
}
