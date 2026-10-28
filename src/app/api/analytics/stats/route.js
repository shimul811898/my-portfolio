import { auth } from "@/lib/auth";
import { db } from "@/lib/mongodb";
import { headers } from "next/headers";

const ADMIN_EMAIL = "shimul181163@gmail.com";

export async function GET() {
  try {
    // Verify admin session on server
    const currentHeaders = await headers();
    const session = await auth.api.getSession({
      headers: currentHeaders,
    });

    if (
      !session ||
      !session.user ||
      (session.user.role !== "admin" && session.user.email !== ADMIN_EMAIL)
    ) {
      return Response.json(
        { success: false, error: "Access Denied: Only admin can view dashboard statistics." },
        { status: 403 }
      );
    }

    const totalVisits = await db.collection("visits").countDocuments();

    const uniqueVisitorsArray = await db
      .collection("visits")
      .distinct("visitorId");
    const uniqueVisitors = uniqueVisitorsArray.length;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayVisits = await db.collection("visits").countDocuments({
      createdAt: { $gte: startOfToday },
    });

    const totalUsers = await db.collection("user").countDocuments();

    const now = new Date();
    const activeSessions = await db.collection("session").countDocuments({
      expiresAt: { $gte: now },
    });

    const users = await db
      .collection("user")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const sessions = await db
      .collection("session")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const recentVisits = await db
      .collection("visits")
      .find({})
      .sort({ createdAt: -1 })
      .limit(15)
      .toArray();

    const formattedUsers = users.map((u) => {
      const hasActiveSession = sessions.some(
        (s) =>
          s.userId === u._id.toString() ||
          s.userId === u.id ||
          (s.expiresAt && new Date(s.expiresAt) > now && (s.userId === u.id || s.userId === u._id.toString()))
      );

      return {
        id: u._id.toString(),
        name: u.name || "Anonymous",
        email: u.email,
        role: u.role || "user",
        image: u.image || null,
        createdAt: u.createdAt || null,
        isOnline: hasActiveSession,
      };
    });

    return Response.json({
      success: true,
      stats: {
        totalVisits,
        uniqueVisitors,
        todayVisits,
        totalUsers,
        activeSessions,
      },
      users: formattedUsers,
      recentVisits: recentVisits.map((v) => ({
        id: v._id.toString(),
        path: v.path,
        ip: v.ip,
        userAgent: v.userAgent,
        createdAt: v.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return Response.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
