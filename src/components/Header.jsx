"use client";

import { useState, useEffect } from "react";
import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isHome) {
        const sections = ["home", "about", "expertise", "education", "project", "github", "blog"];
        let current = "home";
        
        // Use scroll position relative to viewport offset for high-accuracy section detection
        const scrollPosition = window.scrollY + 160; 

        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              current = id;
            }
          }
        }
        
        // Fallback for reaching bottom of page
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
          current = "blog";
        }

        setActiveSection(current);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navLinks = [
    { label: "Home", sectionId: "home", href: "/" },
    { label: "About", sectionId: "about", href: "/about" },
    { label: "Expertise", sectionId: "expertise", href: "/expertise" },
    { label: "Projects", sectionId: "project", href: "/project" },
    { label: "Education", sectionId: "education", href: "/education" },
    { label: "GitHub", sectionId: "github", href: "/github" },
  ];

  const handleNavClick = (e, link) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(link.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setActiveSection(link.sectionId);
    }
    setMobileMenuOpen(false);
  };

  const getHref = (link) => {
    if (isHome) return `#${link.sectionId}`;
    return `/#${link.sectionId}`;
  };

  const checkActive = (link) => {
    if (isHome) return activeSection === link.sectionId;
    const normalize = (p) => p.toLowerCase().replace(/\/$/, "");
    return normalize(pathname) === normalize(link.href);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b
        ${scrolled 
          ? "bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 h-16 shadow-[0_4px_30px_rgba(0,0,0,0.03)]" 
          : "bg-transparent border-transparent h-20"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        <Link 
          href="/" 
          className="flex items-center gap-2.5 font-bold text-xl tracking-tight group transition-transform active:scale-95"
        >
          <span className="text-xl font-mono text-blue-600 dark:text-cyan-400 group-hover:-translate-x-0.5 transition-transform duration-300">⟨/⟩</span>
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            Portfolio
          </span>
        </Link>

        {/* ── DESKTOP NAV ──────── */}
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {navLinks.map((link) => {
            const active = checkActive(link);
            return (
              <Link
                key={link.label}
                href={getHref(link)}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 group cursor-pointer
                  ${active 
                    ? "text-blue-600 dark:text-cyan-400 font-semibold" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
              >
                <span className={`absolute inset-0 rounded-full -z-10 transition-all duration-300
                  ${active 
                    ? "bg-blue-500/10 dark:bg-cyan-500/10 opacity-100 scale-100" 
                    : "bg-slate-100 dark:bg-slate-800/60 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                  }`} 
                />
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <a 
          href="mailto:mahafuzur181163@gmail.com"
          className="hidden md:flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 hover:border-transparent dark:hover:border-transparent transition-all duration-300 hover:-translate-y-0.5"
        >
          <Mail className="w-4 h-4" />
          <span>Get In Touch</span>
        </a>

        {/* ── MOBILE CONTROLS ────────────────────────────── */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="mailto:mahafuzur181163@gmail.com"
            aria-label="Send Email"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/50"
          >
            <Mail className="w-4 h-4" />
          </a>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/50 hover:text-blue-600 dark:hover:text-cyan-400 focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER ───────────────────── */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full border-b transition-all duration-300 ease-in-out backdrop-blur-2xl
          ${mobileMenuOpen 
            ? "opacity-100 translate-y-0 visible shadow-xl" 
            : "opacity-0 -translate-y-4 invisible pointer-events-none"
          }
          ${scrolled 
            ? "bg-white/90 dark:bg-slate-950/90 border-slate-200/50 dark:border-slate-800/50" 
            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800"
          }`}
      >
        <nav className="px-6 py-6 flex flex-col space-y-2">
          {navLinks.map((link) => {
            const active = checkActive(link);
            return (
              <Link
                key={link.label}
                href={getHref(link)}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-base font-medium py-3 px-4 rounded-xl transition-all cursor-pointer
                  ${active 
                    ? "bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 font-semibold" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/60">
            <a 
              href="mailto:mahafuzur181163@gmail.com"
              className="flex items-center gap-3 py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50"
            >
              <Mail className="text-blue-500 dark:text-cyan-400 w-4 h-4" />
              <span className="truncate">mahafuzur181163@gmail.com</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}