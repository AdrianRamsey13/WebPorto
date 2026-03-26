import { prisma } from "@/lib/prisma";
import { SkillForm } from "../SkillForm";
import { createSkill } from "../actions";

export default async function NewSkillPage() {
  const skills = await prisma.skill.findMany({ select: { category: true }, distinct: ["category"] });
  const categories = skills.map((s) => s.category);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tambah Skill</h1>
        <p className="text-muted-foreground text-sm mt-1">Skill akan dikelompokkan berdasarkan kategori di portfolio.</p>
      </div>
      <SkillForm action={createSkill} categories={categories} />
    </div>
  );
}
