import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        Selamat datang, {session?.user?.name ?? session?.user?.email}
      </p>
    </div>
  );
}
