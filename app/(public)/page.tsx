import { getProfile, getProjects, getExperiences, getSkills } from "@/lib/portfolio-data";
import { Navbar } from "@/components/portfolio/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ContactSection } from "@/components/portfolio/ContactSection";

export const metadata = {
  title: "Ramsey Adrian — Web Developer",
  description: "Web Developer · .Net Developer · Backend Specialist",
};

export default async function PortfolioPage() {
  const [profile, projects, experiences, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperiences(),
    getSkills(),
  ]);

  const displayName = profile?.name ?? "Ramsey Adrian";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar name={displayName} />
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <ContactSection profile={profile} />
    </div>
  );
}
