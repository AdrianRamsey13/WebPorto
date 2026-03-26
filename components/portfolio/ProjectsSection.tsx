import type { Project } from "@/lib/generated/prisma/client";
import { SectionHeading } from "./AboutSection";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Projects" title="What I've Built" />

        {projects.length === 0 ? (
          <p className="mt-12 text-muted-foreground text-sm italic">
            No projects added yet — manage them via the admin panel.
          </p>
        ) : (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
      {/* Image placeholder */}
      <div className="h-44 bg-muted flex items-center justify-center overflow-hidden">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl text-muted-foreground/30">{"</>"}</span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Featured
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-accent text-accent-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 pt-1">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-primary hover:underline">
              Live Demo →
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
