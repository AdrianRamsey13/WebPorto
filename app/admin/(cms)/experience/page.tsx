import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";
import { DeleteExperienceButton } from "./DeleteExperienceButton";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", { month: "short", year: "numeric" }).format(new Date(date));
}

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: [{ current: "desc" }, { startDate: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Experience</h1>
          <p className="text-muted-foreground text-sm mt-1">{experiences.length} entri</p>
        </div>
        <Button asChild>
          <Link href="/admin/experience/new">
            <Plus className="w-4 h-4 mr-2" />Tambah
          </Link>
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-xl text-muted-foreground">
          <p className="text-sm">Belum ada experience. Tambah yang pertama!</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posisi</TableHead>
                <TableHead>Perusahaan</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiences.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {exp.role}
                      {exp.current && <Badge className="text-xs">Current</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>{exp.company}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} — {exp.current ? "Sekarang" : exp.endDate ? formatDate(exp.endDate) : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{exp.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/experience/${exp.id}/edit`}><Pencil className="w-4 h-4" /></Link>
                      </Button>
                      <DeleteExperienceButton id={exp.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
