import { ExperienceForm } from "../ExperienceForm";
import { createExperience } from "../actions";

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tambah Experience</h1>
        <p className="text-muted-foreground text-sm mt-1">Pengalaman kerja, pendidikan, atau freelance.</p>
      </div>
      <ExperienceForm action={createExperience} />
    </div>
  );
}
