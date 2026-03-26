import { PageTracker } from "@/components/portfolio/PageTracker";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTracker />
      {children}
    </>
  );
}
