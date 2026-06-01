"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider";

const Footer = () => {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const dark = theme === "dark";

    useEffect(() => { setMounted(true); }, []);

    // Placeholder maintains exact same structural footprint to prevent hydration mismatch
    if (!mounted) {
        return <footer className="max-w-7xl mx-auto rounded-t-[48px] border-t h-80" />;
    }

    return (
        <footer className={`max-w-7xl mx-auto relative overflow-hidden rounded-t-[48px] border-t transition-colors duration-500
            ${dark
                ? "border-white/10 bg-gradient-to-b from-[#090d16] to-[#030712] text-slate-300"
                : "border-slate-200/60 bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800"
            }`}>
            <div className={`absolute top-0 left-1/3 w-[350px] h-[350px] blur-[120px] rounded-full pointer-events-none ${dark ? "bg-cyan-500/10" : "bg-cyan-300/20"}`} />

            <div className="relative px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <h2 className={`text-3xl font-black ${dark ? "text-white" : "text-slate-900"}`}>
                            Shimul<span className="text-cyan-500">.dev</span>
                        </h2>
                        <p className="text-sm">MERN Stack Developer building scalable web applications.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className={`font-bold mb-6 ${dark ? "text-white" : "text-slate-900"}`}>Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            {["Home", "About", "Projects", "Contact"].map((item) => (
                                <li key={item}><Link href={item === "Home" ? "/" : `#${item.toLowerCase()}`}>{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className={`font-bold mb-6 ${dark ? "text-white" : "text-slate-900"}`}>Services</h3>
                        <ul className="space-y-3 text-sm">
                            {["Frontend", "Next.js", "UI/UX", "API Dev"].map((s) => <li key={s}>{s}</li>)}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4 text-sm">
                        <h3 className={`font-bold ${dark ? "text-white" : "text-slate-900"}`}>Contact</h3>
                        <p>Gazipur, Dhaka, Bangladesh</p>
                        <p>mahafuzur181163@gmail.com</p>
                        <div>
                            <h1 className={`text-base font-bold ${dark ? "text-white" : "text-slate-900"}`}>Social Link</h1>
                            <div className="flex gap-3 pt-2">

                                {[
                                    { icon: <FaGithub />, href: "https://github.com/shimul811898" },
                                    { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
                                    { icon: <FaInstagram />, href: "https://instagram.com" },
                                    { icon: <FaFacebookF />, href: "https://www.facebook.com/shimul.islam.02" },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
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
            <div className="p-7" >
                <div className={` border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs ${dark ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-400"}`}>
                <p className="py-2" >© 2026 Shimul.dev — All rights reserved.</p>

                <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
                    <span className={`cursor-pointer ${dark ? "hover:text-slate-300" : "hover:text-slate-600"}`}>
                        Privacy Policy
                    </span>
                    <span className={`cursor-pointer ${dark ? "hover:text-slate-300" : "hover:text-slate-600"}`}>
                        Terms
                    </span>

                </div>
            </div>
            </div>
        </footer>
    );
};
export default Footer;