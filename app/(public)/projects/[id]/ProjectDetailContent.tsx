"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/generated/prisma/client";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(new Date(date));
}

export function ProjectDetailContent({ project }: { project: Project }) {
  return (
    <motion.main
      className="max-w-4xl mx-auto px-6 pt-28 pb-20"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Back */}
      <FadeIn delay={0.05}>
        <Link href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="group-hover:-translate-x-0.5 transition-transform">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Kembali ke Projects
        </Link>
      </FadeIn>

      {/* Header */}
      <div className="space-y-4">
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium
              ${project.status === "ACTIVE" ? "bg-primary/10 text-primary border-primary/20" :
                "bg-muted text-muted-foreground border-border"}`}>
              {project.status}
            </span>
            {project.featured && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium">
                Featured
              </span>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg text-muted-foreground">{project.description}</p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="flex items-center gap-3 pt-1">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-accent transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                Source Code
              </a>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Image */}
      {project.imageUrl && (
        <FadeIn delay={0.3} className="mt-10 rounded-xl overflow-hidden border border-border aspect-video bg-muted">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        </FadeIn>
      )}

      {/* Long description */}
      {project.longDesc && (
        <FadeIn delay={0.1} className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">Tentang Project</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.longDesc}</p>
        </FadeIn>
      )}

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">Tech Stack</h2>
          <StaggerContainer className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <StaggerItem key={tag}>
                <span className="px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium border border-border">
                  {tag}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}

      {/* Dates */}
      {(project.startDate || project.endDate) && (
        <FadeIn className="mt-10 p-4 rounded-xl border border-border bg-card">
          <h2 className="text-sm font-semibold text-muted-foreground mb-2">Periode</h2>
          <p className="text-sm">
            {project.startDate ? formatDate(project.startDate) : "—"}
            {" → "}
            {project.endDate ? formatDate(project.endDate) : "Sekarang"}
          </p>
        </FadeIn>
      )}
    </motion.main>
  );
}
