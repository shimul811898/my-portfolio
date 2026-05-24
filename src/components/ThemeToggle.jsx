"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 p-3 bg-white dark:bg-slate-800 rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 z-50 hover:scale-110 active:scale-95 transition-transform duration-200 flex items-center justify-center text-slate-800 dark:text-slate-200 cursor-pointer"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 text-amber-400 fill-amber-400" />
      ) : (
        <Moon className="w-6 h-6 text-slate-700 fill-slate-100" />
      )}
    </button>
  );
}
