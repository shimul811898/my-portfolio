"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { FaArrowUp } from "react-icons/fa";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Do not render anything until client-side hydration is complete
  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button onClick={scrollToTop} className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl border dark:border-slate-700">
        <FaArrowUp className="w-5 h-5" />
      </button>
      <button onClick={toggleTheme} className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl border dark:border-slate-700">
        {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
}