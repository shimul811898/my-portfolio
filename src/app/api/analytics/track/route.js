import { db } from "@/lib/mongodb";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = body.path || "/";

    const cookieStore = await cookies();
    let visitorId = cookieStore.get("portfolio_vid")?.value;
    let isNewVisitor = false;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      isNewVisitor = true;
    }

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";

    await db.collection("visits").insertOne({
      visitorId,
      path,
      ip,
      userAgent,
      createdAt: new Date(),
    });

    const response = Response.json({ success: true });

    if (isNewVisitor) {
      response.headers.set(
        "Set-Cookie",
        `portfolio_vid=${visitorId}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`
      );
    }

    return response;
  } catch (error) {
    console.error("Error logging visit:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
