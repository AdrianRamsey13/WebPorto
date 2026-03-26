"use client";

interface ChartData {
  date: string;
  views: number;
}

export function TrafficChart({ data }: { data: ChartData[] }) {
  const max = Math.max(...data.map((d) => d.views), 1);

  if (data.every((d) => d.views === 0)) {
    return (
      <p className="text-sm text-muted-foreground italic py-4 text-center">
        Belum ada data traffic minggu ini.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-2 h-40">
        {data.map((d) => {
          const heightPct = Math.max((d.views / max) * 100, d.views > 0 ? 4 : 0);
          return (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group">
              <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {d.views}
              </span>
              <div className="w-full rounded-t-sm bg-primary/20 hover:bg-primary/40 transition-colors relative"
                style={{ height: `${heightPct}%`, minHeight: d.views > 0 ? "4px" : "0" }}
              >
                {d.views > 0 && (
                  <div className="absolute inset-x-0 bottom-0 bg-primary rounded-t-sm transition-all" style={{ height: "100%" }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        {data.map((d) => (
          <div key={d.date} className="flex-1 text-center text-xs text-muted-foreground truncate">
            {d.date}
          </div>
        ))}
      </div>
    </div>
  );
}
