import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/admin/dashboard");

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <LoginForm />
    </main>
  );
}
