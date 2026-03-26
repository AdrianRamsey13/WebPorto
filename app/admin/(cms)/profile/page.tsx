import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Info ini tampil di Hero, About, dan Contact section portfolio kamu.
        </p>
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}
