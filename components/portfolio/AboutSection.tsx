"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/generated/prisma/client";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

const FALLBACK_BIO = `I'm a passionate backend developer specializing in .NET and web technologies.
I love building robust, scalable systems and clean APIs that power great user experiences.
When I'm not coding, I'm exploring new technologies and best practices in software architecture.`;

export function AboutSection({ profile }: { profile: Profile | null }) {
  const bio = profile?.bio ?? FALLBACK_BIO;
  const location = profile?.location;
  const email = profile?.email;
  const github = profile?.github;
  const linkedin = profile?.linkedin;

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="About" title="Who I Am" />

        <div className="grid md:grid-cols-2 gap-12 mt-12 items-start">
          <FadeIn direction="left">
            <p className="text-muted-foreground leading-relaxed">{bio}</p>
          </FadeIn>

          <StaggerContainer className="space-y-4">
            {location && <StaggerItem><InfoRow icon="📍" label="Location" value={location} /></StaggerItem>}
            {email && <StaggerItem><InfoRow icon="📧" label="Email" value={email} href={`mailto:${email}`} /></StaggerItem>}
            {github && <StaggerItem><InfoRow icon="🐙" label="GitHub" value={github.replace("https://", "")} href={github} /></StaggerItem>}
            {linkedin && <StaggerItem><InfoRow icon="💼" label="LinkedIn" value={linkedin.replace("https://www.linkedin.com/in/", "")} href={linkedin} /></StaggerItem>}
            {!location && !email && !github && !linkedin && (
              <StaggerItem>
                <p className="text-sm text-muted-foreground italic">
                  Update your profile via the admin panel to show contact info here.
                </p>
              </StaggerItem>
            )}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
      <span className="text-lg">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline truncate block">{value}</a>
        ) : (
          <p className="text-sm font-medium truncate">{value}</p>
        )}
      </div>
    </div>
  );
}

export function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="space-y-2">
      <motion.p
        className="text-xs font-semibold tracking-widest text-primary uppercase"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {label}
      </motion.p>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-foreground"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="w-12 h-1 bg-primary rounded-full"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
    </div>
  );
}
