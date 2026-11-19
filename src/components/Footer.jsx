"use client";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider";

const emptySubscribe = () => () => {};

const Footer = () => {
    const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
    const { theme } = useTheme();
    const dark = mounted ? theme === "dark" : true;

    return (
        <footer className={`mx-auto relative overflow-hidden rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] border-t transition-colors duration-500
            ${dark
                ? "border-white/10 bg-gradient-to-b from-[#090d16] to-[#030712] text-slate-300"
                : "border-slate-200/60 bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800"
            }`}>
            <div className={`absolute top-0 left-1/3 w-[350px] h-[350px] blur-[120px] rounded-full pointer-events-none ${dark ? "bg-cyan-500/10" : "bg-cyan-300/20"}`} />

            <div className="relative px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                    {/* Brand Info */}
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className={`text-2xl sm:text-3xl font-black ${dark ? "text-white" : "text-slate-900"}`}>
                            Shimul<span className="text-cyan-500">.dev</span>
                        </h2>
                        <p className="text-sm leading-relaxed max-w-sm">MERN Stack Developer building scalable web applications.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className={`font-bold mb-4 sm:mb-6 ${dark ? "text-white" : "text-slate-900"}`}>Quick Links</h3>
                        <ul className="space-y-2.5 sm:space-y-3 text-sm">
                            {["Home", "About", "Projects", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === "Home" ? "/" : `/#${item.toLowerCase()}`}
                                        className="hover:text-cyan-500 transition-colors inline-block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className={`font-bold mb-4 sm:mb-6 ${dark ? "text-white" : "text-slate-900"}`}>Services</h3>
                        <ul className="space-y-2.5 sm:space-y-3 text-sm">
                            {["Frontend", "Next.js", "UI/UX", "API Dev"].map((s) => (
                                <li key={s} className="hover:text-cyan-500 transition-colors cursor-default">
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4 text-sm">
                        <h3 className={`font-bold ${dark ? "text-white" : "text-slate-900"}`}>Contact</h3>
                        <p className="text-slate-400">Gazipur, Dhaka, Bangladesh</p>
                        <p className="break-all">
                            <a href="mailto:mahafuzur181163@gmail.com" className="hover:text-cyan-500 transition-colors">
                                mahafuzur181163@gmail.com
                            </a>
                        </p>
                        <div>
                            <h4 className={`text-base font-bold mb-3 ${dark ? "text-white" : "text-slate-900"}`}>Social Link</h4>
                            <div className="flex flex-wrap gap-3 pt-1">
                                {[
                                    { icon: <FaGithub />, href: "https://github.com/shimul811898", label: "GitHub" },
                                    { icon: <FaLinkedinIn />, href: "https://linkedin.com", label: "LinkedIn" },
                                    { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
                                    { icon: <FaFacebookF />, href: "https://www.facebook.com/shimul.islam.02", label: "Facebook" },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={`w-10 h-10 flex items-center justify-center rounded-xl border hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm
                                            ${dark
                                                ? "border-slate-800 bg-slate-900 text-slate-400"
                                                : "border-slate-200 bg-white text-slate-600"
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

            <div className="px-6 sm:px-10 lg:px-16 pb-8">
                <div className={`pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs ${dark ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-400"}`}>
                    <p className="text-center sm:text-left">© 2026 Shimul.dev — All rights reserved.</p>

                    <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
                        <Link href="/#about" className={`cursor-pointer transition-colors ${dark ? "hover:text-slate-300" : "hover:text-slate-600"}`}>
                            Privacy Policy
                        </Link>
                        <Link href="/#about" className={`cursor-pointer transition-colors ${dark ? "hover:text-slate-300" : "hover:text-slate-600"}`}>
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
