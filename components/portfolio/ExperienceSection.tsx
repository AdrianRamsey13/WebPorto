import type { Experience } from "@/lib/generated/prisma/client";
import { SectionHeading } from "./AboutSection";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date(date));
}

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeading label="Experience" title="My Journey" />

        {experiences.length === 0 ? (
          <p className="mt-12 text-muted-foreground text-sm italic">
            No experience added yet — manage them via the admin panel.
          </p>
        ) : (
          <div className="mt-12 relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div key={exp.id} className={`relative flex gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 md:left-1/2 mt-5" />

                  {/* Spacer for alternating */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}>
                    <div className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{exp.role}</h3>
                        {exp.current && (
                          <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-primary mb-1">{exp.company}</p>
                      <p className="text-xs text-muted-foreground mb-3">
                        {formatDate(exp.startDate)} — {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
                        {exp.location && ` · ${exp.location}`}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
