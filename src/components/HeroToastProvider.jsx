"use client";

import { ToastProvider } from "@heroui/toast";

export default function HeroToastProvider() {
  return (
    <ToastProvider
      placement="top-right"
      maxVisibleToasts={5}
      toastOffset={20}
      toastProps={{
        variant: "flat",
        timeout: 4000,
        classNames: {
          base: "shadow-2xl backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-2xl",
          title: "font-semibold text-sm",
          description: "text-xs opacity-90",
        },
      }}
    />
  );
}
