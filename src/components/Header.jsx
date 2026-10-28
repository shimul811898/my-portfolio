"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Menu,
  X,
  LogIn,
  User,
  ShieldCheck,
  ChevronDown,
  GraduationCap,
  Award,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";

const ADMIN_EMAIL = "shimul181163@gmail.com";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data: session } = useSession();
  const dropdownRef = useRef(null);

  // Check if current user is an authenticated Admin
  const isAdmin =
    session?.user &&
    (session.user.role === "admin" || session.user.email === ADMIN_EMAIL);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isHome) {
        const sections = [
          "home",
          "about",
          "expertise",
          "education",
          "certifications",
          "project",
          "github",
        ];
        let current = "home";

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

        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 60
        ) {
          current = "github";
        }

        setActiveSection(current);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Primary 4 items in navbar
  const primaryLinks = [
    { label: "Home", sectionId: "home", href: "/" },
    { label: "About", sectionId: "about", href: "/about" },
    { label: "Expertise", sectionId: "expertise", href: "/expertise" },
    { label: "Projects", sectionId: "project", href: "/project" },
  ];

  // Remaining items in the "More" dropdown tab
  const dropdownLinks = [
    {
      label: "Education",
      sectionId: "education",
      href: "/education",
      description: "Academic degrees & background",
      icon: GraduationCap,
      color: "from-blue-500/20 to-cyan-500/20 text-blue-500 dark:text-cyan-400 border-blue-500/30",
    },
    {
      label: "Certifications",
      sectionId: "certifications",
      href: "/certifications",
      description: "Professional licenses & courses",
      icon: Award,
      color: "from-purple-500/20 to-pink-500/20 text-purple-500 dark:text-purple-400 border-purple-500/30",
    },
    {
      label: "GitHub",
      sectionId: "github",
      href: "/github",
      description: "Repositories & contribution stats",
      icon: GithubIcon,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-500 dark:text-emerald-400 border-emerald-500/30",
    },
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
    setDropdownOpen(false);
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

  const isDropdownActive = dropdownLinks.some((link) => checkActive(link));

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b
        ${
          scrolled
            ? "bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 h-16 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
            : "bg-transparent border-transparent h-20"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-xl tracking-tight group transition-transform active:scale-95"
        >
          <span className="text-xl font-mono text-blue-600 dark:text-cyan-400 group-hover:-translate-x-0.5 transition-transform duration-300">
            ⟨/⟩
          </span>
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            Portfolio
          </span>
        </Link>

        {/* Desktop Navbar: 5 items (4 primary + 1 dropdown) + DASHBOARD ONLY IF ADMIN */}
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {primaryLinks.map((link) => {
            const active = checkActive(link);
            return (
              <Link
                key={link.label}
                href={getHref(link)}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 group cursor-pointer
                  ${
                    active
                      ? "text-blue-600 dark:text-cyan-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
              >
                <span
                  className={`absolute inset-0 rounded-full -z-10 transition-all duration-300
                  ${
                    active
                      ? "bg-blue-500/10 dark:bg-cyan-500/10 opacity-100 scale-100"
                      : "bg-slate-100 dark:bg-slate-800/60 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                  }`}
                />
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}

          {/* 5th Item: Dropdown Tab */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`relative px-4 py-2 rounded-full transition-all duration-300 group flex items-center gap-1.5 cursor-pointer outline-none
                ${
                  isDropdownActive || dropdownOpen
                    ? "text-blue-600 dark:text-cyan-400 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
            >
              <span
                className={`absolute inset-0 rounded-full -z-10 transition-all duration-300
                ${
                  isDropdownActive || dropdownOpen
                    ? "bg-blue-500/10 dark:bg-cyan-500/10 opacity-100 scale-100"
                    : "bg-slate-100 dark:bg-slate-800/60 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                }`}
              />
              <span className="relative z-10">More</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180 text-blue-600 dark:text-cyan-400" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl shadow-2xl shadow-slate-900/15 dark:shadow-black/70 p-2 z-50"
                >
                  <div className="space-y-1">
                    {dropdownLinks.map((link) => {
                      const active = checkActive(link);
                      const IconComponent = link.icon;
                      return (
                        <Link
                          key={link.label}
                          href={getHref(link)}
                          onClick={(e) => handleNavClick(e, link)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group
                            ${
                              active
                                ? "bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400"
                                : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300"
                            }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${link.color} border flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-bold tracking-tight ${
                                  active
                                    ? "text-blue-600 dark:text-cyan-400"
                                    : "text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400"
                                }`}
                              >
                                {link.label}
                              </span>
                              {active && (
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                              {link.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DASHBOARD TAB - ONLY VISIBLE IF LOGGED IN AS ADMIN */}
          {isAdmin && (
            <Link
              href="/admin"
              className={`relative px-3.5 py-1.5 rounded-full transition-all duration-300 group flex items-center gap-1.5 cursor-pointer ml-2 text-xs font-bold uppercase tracking-wider
                ${
                  pathname === "/admin"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    : "bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20"
                }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Dashboard</span>
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:mahafuzur181163@gmail.com"
            className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 hover:border-transparent dark:hover:border-transparent transition-all duration-300 hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </a>

          {session ? (
            <Link
              href={isAdmin ? "/admin" : "/login"}
              className={`flex items-center gap-2 text-xs font-semibold px-3.5 py-2.5 rounded-xl border transition-all ${
                isAdmin
                  ? "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
                  : "border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
              }`}
            >
              {isAdmin ? (
                <ShieldCheck className="w-4 h-4 text-purple-400" />
              ) : (
                <User className="w-4 h-4" />
              )}
              <span className="max-w-[80px] truncate">
                {isAdmin ? "Admin" : session.user?.name?.split(" ")[0] || "Account"}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-500 dark:hover:border-cyan-400 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>
          )}
        </div>

        <div className="flex md:hidden items-center gap-3">
          <Link
            href={isAdmin ? "/admin" : "/login"}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/50"
            aria-label="Account"
          >
            {isAdmin ? (
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            ) : session ? (
              <User className="w-4 h-4 text-cyan-400" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/50 hover:text-blue-600 dark:hover:text-cyan-400 focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 w-full border-b transition-all duration-300 ease-in-out backdrop-blur-2xl
          ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0 visible shadow-xl"
              : "opacity-0 -translate-y-4 invisible pointer-events-none"
          }
          ${
            scrolled
              ? "bg-white/90 dark:bg-slate-950/90 border-slate-200/50 dark:border-slate-800/50"
              : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800"
          }`}
      >
        <nav className="px-6 py-6 flex flex-col space-y-2">
          {/* DASHBOARD LINK IN MOBILE MENU - ONLY FOR ADMIN */}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 py-3 px-4 rounded-xl text-sm font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-2"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Admin Dashboard</span>
            </Link>
          )}

          {/* Primary mobile links */}
          {primaryLinks.map((link) => {
            const active = checkActive(link);
            return (
              <Link
                key={link.label}
                href={getHref(link)}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-base font-medium py-2.5 px-4 rounded-xl transition-all cursor-pointer
                  ${
                    active
                      ? "bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Dropdown items for mobile */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <span className="px-4 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              More Sections
            </span>
            <div className="mt-1 space-y-1">
              {dropdownLinks.map((link) => {
                const active = checkActive(link);
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={getHref(link)}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`flex items-center gap-3 py-2 px-4 rounded-xl transition-all
                      ${
                        active
                          ? "bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 font-semibold"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
                      }`}
                  >
                    <IconComponent className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/60 flex flex-col gap-2">
            <Link
              href={isAdmin ? "/admin" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold rounded-xl ${
                isAdmin
                  ? "text-purple-300 bg-purple-500/10 border border-purple-500/20"
                  : "text-blue-600 dark:text-cyan-400 bg-blue-500/10 dark:bg-cyan-500/10"
              }`}
            >
              {isAdmin ? (
                <ShieldCheck className="w-4 h-4 text-purple-400" />
              ) : session ? (
                <User className="w-4 h-4" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              <span>
                {isAdmin
                  ? "Admin Panel"
                  : session
                  ? `Logged In (${session.user?.name})`
                  : "Login"}
              </span>
            </Link>

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