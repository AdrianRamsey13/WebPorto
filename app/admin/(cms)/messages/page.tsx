import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { MessageActions } from "./MessageActions";

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold">Pesan Masuk</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {messages.length} pesan · {unreadCount} belum dibaca
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge className="ml-auto">{unreadCount} baru</Badge>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-xl text-muted-foreground">
          <p className="text-sm">Belum ada pesan masuk.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id}
              className={`rounded-xl border p-5 transition-colors ${msg.read ? "border-border bg-card" : "border-primary/30 bg-primary/5"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground">{msg.name}</span>
                    {!msg.read && <Badge variant="default" className="text-xs">Baru</Badge>}
                    <span className="text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat("id-ID", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      }).format(new Date(msg.createdAt))}
                    </span>
                  </div>
                  <a href={`mailto:${msg.email}`}
                    className="text-sm text-primary hover:underline">
                    {msg.email}
                  </a>
                  {msg.subject && (
                    <p className="text-sm font-medium text-foreground mt-2">{msg.subject}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
                <div className="shrink-0">
                  <MessageActions id={msg.id} read={msg.read} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
