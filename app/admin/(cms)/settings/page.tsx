import { ChangePasswordForm } from "./ChangePasswordForm";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Kelola akun admin kamu.</p>
      </div>

      <div className="space-y-4 max-w-sm">
        <h2 className="text-base font-semibold">Ganti Password</h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
