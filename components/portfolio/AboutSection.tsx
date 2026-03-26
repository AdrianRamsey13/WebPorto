import type { Profile } from "@/lib/generated/prisma/client";

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
          {/* Bio */}
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{bio}</p>
          </div>

          {/* Info cards */}
          <div className="space-y-4">
            {location && (
              <InfoRow icon="📍" label="Location" value={location} />
            )}
            {email && (
              <InfoRow icon="📧" label="Email" value={email} href={`mailto:${email}`} />
            )}
            {github && (
              <InfoRow icon="🐙" label="GitHub" value={github.replace("https://", "")} href={github} />
            )}
            {linkedin && (
              <InfoRow icon="💼" label="LinkedIn" value={linkedin.replace("https://www.linkedin.com/in/", "")} href={linkedin} />
            )}

            {!location && !email && !github && !linkedin && (
              <p className="text-sm text-muted-foreground italic">
                Update your profile via the admin panel to show contact info here.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
      <span className="text-lg">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline truncate block">
            {value}
          </a>
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
      <p className="text-xs font-semibold tracking-widest text-primary uppercase">{label}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      <div className="w-12 h-1 bg-primary rounded-full" />
    </div>
  );
}
