import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, TrendingUp, FileText } from "lucide-react";
import { TrafficChart } from "./TrafficChart";

async function getTrafficData() {
  const now = new Date();
  const startOf7Days = new Date(now);
  startOf7Days.setDate(now.getDate() - 6);
  startOf7Days.setHours(0, 0, 0, 0);

  const startOf30Days = new Date(now);
  startOf30Days.setDate(now.getDate() - 29);

  const [totalViews, last7Days, last30Days, topPages, dailyViews] = await Promise.all([
    prisma.pageView.count(),

    prisma.pageView.count({
      where: { createdAt: { gte: startOf7Days } },
    }),

    prisma.pageView.count({
      where: { createdAt: { gte: startOf30Days } },
    }),

    prisma.pageView.groupBy({
      by: ["path"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),

    prisma.pageView.groupBy({
      by: ["createdAt"],
      _count: { id: true },
      where: { createdAt: { gte: startOf7Days } },
    }),
  ]);

  // Susun data harian untuk 7 hari terakhir
  const dayMap: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    dayMap[d.toISOString().split("T")[0]] = 0;
  }
  for (const row of dailyViews) {
    const day = new Date(row.createdAt).toISOString().split("T")[0];
    if (day in dayMap) dayMap[day] = (dayMap[day] ?? 0) + row._count.id;
  }

  const chartData = Object.entries(dayMap).map(([date, views]) => ({
    date: new Intl.DateTimeFormat("id-ID", { weekday: "short", day: "numeric" }).format(new Date(date)),
    views,
  }));

  return { totalViews, last7Days, last30Days, topPages, chartData };
}

export default async function TrafficPage() {
  const { totalViews, last7Days, last30Days, topPages, chartData } = await getTrafficData();

  const stats = [
    { label: "Total Views", value: totalViews, icon: Eye },
    { label: "7 Hari Terakhir", value: last7Days, icon: TrendingUp },
    { label: "30 Hari Terakhir", value: last30Days, icon: FileText },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Traffic</h1>
        <p className="text-muted-foreground text-sm mt-1">Statistik pengunjung portfolio kamu.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{s.value.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart 7 hari */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Views 7 Hari Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <TrafficChart data={chartData} />
        </CardContent>
      </Card>

      {/* Top pages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top Pages</CardTitle>
        </CardHeader>
        <CardContent>
          {topPages.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">Belum ada data traffic.</p>
          ) : (
            <div className="space-y-3">
              {topPages.map((page, i) => {
                const pct = totalViews > 0 ? Math.round((page._count.id / totalViews) * 100) : 0;
                return (
                  <div key={page.path} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-muted-foreground w-4 shrink-0">#{i + 1}</span>
                        <span className="truncate font-mono text-xs">{page.path}</span>
                      </div>
                      <span className="shrink-0 font-semibold ml-4">{page._count.id.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
