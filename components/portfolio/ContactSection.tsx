"use client";

import { useActionState } from "react";
import type { Profile } from "@/lib/generated/prisma/client";
import { submitContact } from "@/app/(public)/contact/actions";
import { SectionHeading } from "./AboutSection";

export function ContactSection({ profile }: { profile: Profile | null }) {
  const [state, action, pending] = useActionState(submitContact, null);
  const github = profile?.github;
  const linkedin = profile?.linkedin;

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading label="Contact" title="Get In Touch" />

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          {/* Left — copy */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Ada project yang ingin dikerjakan bersama, atau sekadar ingin menyapa?
              Kirim pesan dan saya akan membalas secepatnya.
            </p>

            <div className="space-y-3">
              {profile?.email && (
                <a href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  </span>
                  {profile.email}
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                  </span>
                  GitHub
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </span>
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {state?.success ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <p className="font-semibold text-foreground">Pesan terkirim!</p>
                <p className="text-sm text-muted-foreground">Terima kasih, saya akan segera menghubungi kamu.</p>
              </div>
            ) : (
              <form action={action} className="space-y-4">
                {state?.error && (
                  <p className="text-sm text-destructive">{state.error}</p>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Nama</label>
                    <input name="name" required placeholder="Nama kamu"
                      className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email</label>
                    <input name="email" type="email" required placeholder="email@example.com"
                      className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Subjek <span className="text-muted-foreground text-xs">(opsional)</span></label>
                  <input name="subject" placeholder="Project collaboration, freelance, dll"
                    className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Pesan</label>
                  <textarea name="message" required rows={4} placeholder="Ceritakan tentang project atau pertanyaan kamu..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none" />
                </div>
                <button type="submit" disabled={pending}
                  className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
                  {pending ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile?.name ?? "Ramsey Adrian"}. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </section>
  );
}
