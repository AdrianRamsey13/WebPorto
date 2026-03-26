import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { path, referrer } = await req.json();

    // Jangan track halaman admin
    if (!path || path.startsWith("/admin")) {
      return NextResponse.json({ ok: true });
    }

    await prisma.pageView.create({
      data: {
        path,
        referrer: referrer || null,
        userAgent: req.headers.get("user-agent") || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
