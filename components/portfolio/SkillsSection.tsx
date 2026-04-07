"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/lib/generated/prisma/client";
import { SectionHeading } from "./AboutSection";
import { StaggerContainer, StaggerItem } from "@/components/motion";

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Skills" title="What I Work With" />

        {skills.length === 0 ? (
          <p className="mt-12 text-muted-foreground text-sm italic">
            No skills added yet — manage them via the admin panel.
          </p>
        ) : (
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(grouped).map(([category, items]) => (
              <StaggerItem key={category}>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {items.map((skill) => (
                      <SkillBar key={skill.id} skill={skill} />
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}

function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
        />
      </div>
    </div>
  );
}
