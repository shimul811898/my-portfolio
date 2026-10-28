"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();
  const trackedPathRef = useRef("");

  useEffect(() => {
    // Avoid double logging on the exact same pathname in React Strict Mode
    if (trackedPathRef.current === pathname) return;
    trackedPathRef.current = pathname;

    const trackVisit = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: pathname }),
        });
      } catch (err) {
        // Silently ignore to avoid disrupting user experience
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
