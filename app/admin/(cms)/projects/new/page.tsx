import { ProjectForm } from "../ProjectForm";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tambah Project</h1>
        <p className="text-muted-foreground text-sm mt-1">Project baru akan langsung tampil di portfolio.</p>
      </div>
      <ProjectForm action={createProject} />
    </div>
  );
}
