"use client";

import { useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Expertise", href: "/expertise" },
    { label: "Projects", href: "#" },
    { label: "Blog", href: "#" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-1 text-2xl font-extrabold tracking-tight">
          <span className="text-slate-900 dark:text-white">Best</span>
          <span className="text-primary">kit</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-primary dark:hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact CTA */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium group cursor-pointer text-slate-800 dark:text-slate-200">
          <Mail className="text-primary w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="group-hover:text-primary transition-colors">mahafuzur181163@gmail.com</span>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium group cursor-pointer text-slate-800 dark:text-slate-200">
            <Mail className="text-primary w-5 h-5" />
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-all duration-300">
          <nav className="px-6 py-6 flex flex-col space-y-4 text-base font-semibold text-slate-600 dark:text-slate-400">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-primary dark:hover:text-primary transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200">
              <Mail className="text-primary w-5 h-5" />
              <span>mahafuzur181163@gmail.com</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
