"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FaGithub,
    FaLinkedinIn,
    FaInstagram,
    FaFacebookF,
    FaArrowUp,
} from "react-icons/fa";
import { div } from "framer-motion/m";
import { useTheme } from "@/components/ThemeProvider"; // থিম প্রোভাইডার ইম্পোর্ট

const Footer = () => {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme(); 
    const dark = theme === "dark"; 

    useEffect(() => {
        setMounted(true);
    }, []);

    // স্মুথ স্ক্রোল ফাংশন
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!mounted) {
        return (
            <footer className={`max-w-7xl mx-auto rounded-t-[48px] border-t ${dark ? "bg-slate-950 border-white/10" : "bg-slate-50 border-slate-200/60"}`}>
                <div className="h-40" />
            </footer>
        );
    }

    return (
        <div>
            <footer className={`max-w-7xl mx-auto relative overflow-hidden rounded-t-[48px] border-t transition-colors duration-500
                ${dark 
                    ? "border-white/10 bg-gradient-to-b from-[#090d16] to-[#030712] text-slate-300 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]" 
                    : "border-slate-200/60 bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
                }`}
            >
                <div className="mx-auto justify-end grid" >
                    <button
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="group flex items-center gap-1.5 ml-2 px-4 py-2 rounded border border-transparent bg-gradient-to-r from-blue-600 to-cyan-500
                  text-white font-medium shadow-sm hover:shadow-[0_8px_25px_rgba(34,211,238,0.35)]
                     hover:scale-[1.03] transition-all duration-300"
                    >
                        <span>Back to Top</span>
                        <FaArrowUp className="text-[10px] group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </button>
                </div>

                {/* Blur effects */}
                <div className={`absolute top-0 left-1/3 w-[350px] h-[350px] blur-[120px] rounded-full pointer-events-none ${dark ? "bg-cyan-500/10" : "bg-cyan-300/20"}`} />
                <div className={`absolute bottom-0 right-1/3 w-[350px] h-[350px] blur-[120px] rounded-full pointer-events-none ${dark ? "bg-blue-500/10" : "bg-blue-300/20"}`} />

                <div className="relative px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
                    <div className="space-y-6">
                        <h2 className={`text-3xl font-black tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
                            Shimul
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                                .dev
                            </span>
                        </h2>

                        <p className={`text-sm leading-relaxed max-w-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                            MERN Stack Developer focused on building modern, scalable and responsive web applications <br /> with clean UI and strong architecture.
                        </p>

                        <div className="flex items-center gap-2 py-1">
                            <span className={`text-xs ${dark ? "text-slate-500" : "text-slate-400"}`}>
                                Available for freelance work
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-12">


                        <div>
                            <h3 className={`text-lg font-bold mb-6 ${dark ? "text-white" : "text-slate-900"}`}>
                                Quick Links
                            </h3>

                            <ul className="space-y-3 text-sm">
                                {["Home", "About", "Projects", "Contact"].map((item, i) => (
                                    <li key={i}>
                                        <Link
                                            href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                                            className={`transition-colors ${dark ? "text-slate-400 hover:text-cyan-400" : "text-slate-500 hover:text-cyan-500"}`}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className={`text-lg font-bold mb-6 ${dark ? "text-white" : "text-slate-900"}`}>
                                Services
                            </h3>

                            <ul className="space-y-3 text-sm">
                                {[
                                    "Frontend Development",
                                    "Next.js Applications",
                                    "UI/UX Layout Design",
                                    "MERN Stack APIs",
                                ].map((service, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                        <span className={dark ? "text-slate-400" : "text-slate-500"}>
                                            {service}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                        </div>
                        <div>
                            <h1 className={`text-base font-bold ${dark ? "text-white" : "text-slate-900"}`}>Social Link</h1>
                            <div className="flex gap-3 pt-2">

                                {[
                                    { icon: <FaGithub />, href: "https://github.com/shimul811898" },
                                    { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
                                    { icon: <FaInstagram />, href: "https://instagram.com" },
                                    { icon: <FaFacebookF />, href: "#" },
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
                        <div className={`space-y-3 mb-6 text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                            <h1 className={`text-xl font-bold py-1 ${dark ? "text-white" : "text-black"}`} >Contract</h1>
                            <p>📍Gazipur ,Dhaka, Bangladesh</p>
                            <p>📧 mahafuzur181163@gmail.com</p>
                            <p>📱 Available for freelance</p>
                        </div>

                    </div>


                    <div className={`mt-20 items-center pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs ${dark ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-400"}`}>
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
        </div>
    );
};

export default Footer;