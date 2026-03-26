import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, Briefcase, Wrench, Star, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  const [projectCount, featuredCount, experienceCount, skillCount] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { featured: true } }),
    prisma.experience.count(),
    prisma.skill.count(),
  ]);

  const recentProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { id: true, title: true, status: true, featured: true },
  });

  const stats = [
    { label: "Total Projects", value: projectCount, icon: FolderKanban, href: "/admin/projects" },
    { label: "Featured", value: featuredCount, icon: Star, href: "/admin/projects" },
    { label: "Experience", value: experienceCount, icon: Briefcase, href: "/admin/experience" },
    { label: "Skills", value: skillCount, icon: Wrench, href: "/admin/skills" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Selamat pagi" : hour < 17 ? "Selamat siang" : "Selamat malam";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          {greeting}, {session?.user?.name ?? "Admin"} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Ini ringkasan konten portfolio kamu.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:border-primary/40 transition-colors cursor-pointer">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Project Terbaru</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/projects" className="flex items-center gap-1 text-muted-foreground">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </div>

        {recentProjects.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border rounded-xl text-muted-foreground text-sm">
            Belum ada project.{" "}
            <Link href="/admin/projects/new" className="text-primary hover:underline">Tambah sekarang</Link>
          </div>
        ) : (
          <div className="rounded-xl border border-border divide-y divide-border">
            {recentProjects.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-sm">{p.title}</span>
                  {p.featured && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">Featured</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{p.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/projects/new"><FolderKanban className="w-4 h-4 mr-2" />Tambah Project</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/experience/new"><Briefcase className="w-4 h-4 mr-2" />Tambah Experience</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/skills/new"><Wrench className="w-4 h-4 mr-2" />Tambah Skill</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" target="_blank"><ArrowRight className="w-4 h-4 mr-2" />Lihat Portfolio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
