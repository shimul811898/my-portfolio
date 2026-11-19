"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { MapPin, Mail, ArrowUp } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const Footer = () => {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const dark = theme === "dark";

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!mounted) {
        return (
            <footer className="max-w-7xl mx-auto rounded-t-3xl sm:rounded-t-[40px] lg:rounded-t-[48px] border-t min-h-[320px] transition-colors" />
        );
    }

    return (
        <footer
            className={`max-w-7xl mx-auto relative overflow-hidden rounded-t-3xl sm:rounded-t-[40px] lg:rounded-t-[48px] border-t transition-colors duration-500 ${
                dark
                    ? "border-white/10 bg-gradient-to-b from-[#090d16] to-[#030712] text-slate-300"
                    : "border-slate-200/80 bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800"
            }`}
        >
            <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 md:left-1/3 md:translate-x-0 w-64 sm:w-80 md:w-[350px] h-64 sm:h-80 md:h-[350px] blur-[100px] md:blur-[120px] rounded-full pointer-events-none transition-opacity duration-500 ${
                    dark ? "bg-cyan-500/10" : "bg-cyan-300/25"
                }`}
            />

            <div className="relative px-5 sm:px-8 md:px-12 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                    <div className="space-y-4 sm:space-y-5">
                        <Link href="/" className="inline-block">
                            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
                                Shimul<span className="text-cyan-500">.dev</span>
                            </h2>
                        </Link>
                        <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
                            MERN Stack Developer building scalable, modern, and user-centric web applications.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Available for new projects
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className={`text-sm font-semibold tracking-wider uppercase ${dark ? "text-white" : "text-slate-900"}`}>
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {[
                                { name: "Home", href: "/" },
                                { name: "About", href: "/#about" },
                                { name: "Projects", href: "/#project" },
                                { name: "Certifications", href: "/#certifications" },
                                { name: "GitHub", href: "/#github" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`inline-block transition-colors duration-200 ${
                                            dark
                                                ? "text-slate-400 hover:text-cyan-400"
                                                : "text-slate-600 hover:text-cyan-600"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className={`text-sm font-semibold tracking-wider uppercase ${dark ? "text-white" : "text-slate-900"}`}>
                            Services
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {[
                                "Frontend Development",
                                "Next.js Full Stack",
                                "Responsive UI/UX",
                                "REST & API Integration",
                                "MERN Stack Solutions",
                            ].map((s) => (
                                <li
                                    key={s}
                                    className={`transition-colors ${
                                        dark ? "text-slate-400" : "text-slate-600"
                                    }`}
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Socials */}
                    <div className="space-y-4">
                        <h3 className={`text-sm font-semibold tracking-wider uppercase ${dark ? "text-white" : "text-slate-900"}`}>
                            Contact
                        </h3>
                        <div className="space-y-2.5 text-sm">
                            <div className={`flex items-center gap-2.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                                <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                                <span>Gazipur, Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                                <a
                                    href="mailto:mahafuzur181163@gmail.com"
                                    className={`break-all transition-colors duration-200 ${
                                        dark
                                            ? "text-slate-400 hover:text-cyan-400"
                                            : "text-slate-600 hover:text-cyan-600"
                                    }`}
                                >
                                    mahafuzur181163@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="pt-2">
                            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${dark ? "text-slate-300" : "text-slate-700"}`}>
                                Social Links
                            </h4>
                            <div className="flex flex-wrap gap-2.5">
                                {[
                                    { icon: <FaGithub className="w-4 h-4" />, href: "https://github.com/shimul811898", label: "GitHub" },
                                    { icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn" },
                                    { icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com", label: "Instagram" },
                                    { icon: <FaFacebookF className="w-4 h-4" />, href: "https://www.facebook.com/shimul.islam.02", label: "Facebook" },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all duration-300 shadow-sm ${
                                            dark
                                                ? "border-white/10 bg-white/5 text-slate-400 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 hover:-translate-y-0.5"
                                                : "border-slate-200 bg-white text-slate-600 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 hover:-translate-y-0.5"
                                        }`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright & Back to Top */}
            <div className="px-5 sm:px-8 md:px-12 lg:px-16 pb-8 pt-2">
                <div
                    className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
                        dark ? "border-white/10 text-slate-400" : "border-slate-200 text-slate-500"
                    }`}
                >
                    <p className="text-center sm:text-left">
                        © 2026 <span className="font-semibold text-cyan-500">Shimul.dev</span> — All rights reserved.
                    </p>

                    <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center sm:justify-end">
                        <Link
                            href="/#about"
                            className={`transition-colors duration-200 ${
                                dark ? "hover:text-slate-200" : "hover:text-slate-800"
                            }`}
                        >
                            About
                        </Link>
                        <Link
                            href="/#project"
                            className={`transition-colors duration-200 ${
                                dark ? "hover:text-slate-200" : "hover:text-slate-800"
                            }`}
                        >
                            Projects
                        </Link>
                        <button
                            onClick={scrollToTop}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer ${
                                dark
                                    ? "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                                    : "bg-slate-200/60 hover:bg-slate-200 text-slate-700 hover:text-slate-900"
                            }`}
                            aria-label="Back to top"
                        >
                            <span>Back to top</span>
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
