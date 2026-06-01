"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { ExternalLink, Layers, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function ProjectsPage() {
  const pathname = usePathname();
  const isStandalone = pathname === "/project";
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [activeFilter, setActiveFilter] = useState("ALL");

  // প্রোজেক্ট ফিল্টার করার ক্যাটাগরি
  const filters = ["ALL", "FULLSTACK", "FRONTEND", "UI/UX"];

  // প্রোজেক্ট ডেটাবেস (Real-world structural data from user's portfolio)
  const projects = [
    {
      title: "Docappoint - Doctor Appointment Platform",
      description: "A full-stack doctor appointment booking platform that allows users to search doctors, view profiles, and book appointments online with a smooth and responsive UI.",
      category: "FULLSTACK",
      tags: ["Next.js", "Express.js", "MongoDB", "Tailwind CSS", "Node.js"],
      liveUrl: "https://docappoint-seven.vercel.app",
      githubUrl: "https://github.com/shimul811898/DocAppoint",
      image: "/assest/DocAppoint.png",
      isEmbedImage: true
    },
    {
      title: "SunCart - Summer Essentials eCommerce",
      description: "A modern full-stack eCommerce platform built with Next.js where users can browse summer essentials, view product details, manage cart, and use secure authentication with a smooth responsive UI.",
      category: "FULLSTACK",
      tags: ["Next.js", "Tailwind CSS", "HeroUI", "Better Auth", "React Hot Toast", "Vercel"],
      liveUrl: "https://a8-sun-cart-teal.vercel.app",
      githubUrl: "https://github.com/shimul811898/A8-SunCart",
      image: "/assest/KeenKeeper.png",
      isEmbedImage: true
    },
    {
      title: "AI-Module-Hub",
      description: "A modern AI subscription platform that provides access to multiple leading AI models through a single membership. Users can explore, compare, and utilize powerful AI assistants in one centralized interface with a clean and responsive user experience.",
      category: "FRONTEND",
      tags: ["React", "JavaScript", "Tailwind CSS", "DaisyUI", "HTML", "CSS"],
      liveUrl: "https://ai-module-hub.netlify.app",
      githubUrl: "https://github.com/shimul811898/ai-module-hub",
      image: "/assest/Ai-Module.png",
      isEmbedImage: true
    },
    {
      title: "DigiTools - Digital Toolbox Platform",
      description: "An all-in-one digital toolkit web platform offering fast, simple, and browser-based utilities such as image tools, text tools, and more for everyday use.",
      category: "UI/UX",
      tags: ["React", "JavaScript", "Tailwind CSS", "DaisyUI", "HTML", "CSS"],
      liveUrl: "https://b13-a6-digitool.netlify.app",
      githubUrl: "https://github.com/shimul811898/B-13-Assinment-no-6",
      image: "/assest/DigiTools.png",
      isEmbedImage: true
    }
  ];

  // ফিল্টার অনুযায়ী প্রোজেক্টগুলো আলাদা করার লজিক
  const filteredProjects = activeFilter === "ALL" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      {isStandalone && (
        <>
          <Header />
          <ThemeToggle />
        </>
      )}
      <div className={`transition-colors duration-500 overflow-x-hidden font-sans
        ${isStandalone 
          ? "min-h-screen pt-24 pb-20 bg-gradient-to-br" 
          : "py-16 border-t border-slate-200/40 dark:border-slate-800/40"
        }
        ${dark ? "bg-[#030712] text-slate-100" : "bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 text-slate-900"}`}
      >
      {/* Background Cyberpunk Ambient Glows */}
      {dark && (
        <>
          <div className="fixed inset-0 pointer-events-none z-0
            bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:5rem_5rem]" />
          <div className="fixed top-20 right-1/4 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-blue-500/5 blur-[120px]" />
          <div className="fixed bottom-20 left-1/4 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-purple-500/5 blur-[120px]" />
        </>
      )}

      <main className="relative max-w-6xl mx-auto px-6 z-10">
        
        {/* ── HEADER / TITLE ──────────────────────────────── */}
        <section className="mb-14 max-w-2xl">
          <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded-full mb-4
            ${dark ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-blue-50 text-blue-700 border border-blue-100"}`}>
            <Layers className="w-3.5 h-3.5" /> Showcase
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
            Selected{" "}
            <span className={`bg-clip-text text-transparent bg-gradient-to-r
              ${dark ? "from-cyan-400 to-blue-500" : "from-blue-600 to-indigo-600"}`}>
              Projects
            </span>
          </h1>
          <p className={`text-base md:text-lg leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
            A curated gallery of production deployments, architectural case studies, and open-source contributions.
          </p>
        </section>

        {/* ── FILTER TABS ─────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-slate-200/40 dark:border-slate-800/40 pb-5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs font-mono font-bold tracking-wider uppercase px-4 py-2 rounded-xl transition-all duration-300
                ${activeFilter === filter
                  ? dark 
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]" 
                    : "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : dark
                    ? "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 border border-transparent"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ── PROJECTS GRID ───────────────────────────────── */}
        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8 }}
                className={`group relative rounded-3xl border overflow-hidden flex flex-col h-full transition-all duration-500
                  ${dark
                    ? "border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl hover:border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                    : "border-slate-200 bg-white hover:border-blue-300 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/5"
                  }`}
              >
                {/* Image / Icon Visual Area */}
                <div className={`relative h-56 w-full overflow-hidden flex items-center justify-center border-b text-6xl select-none transition-colors duration-500
                  ${dark ? "border-white/5 bg-white/5" : "border-slate-100 bg-slate-50"}`}
                >
                  {/* Visual Glow Layer */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-b
                    ${dark ? "from-cyan-500/10 via-transparent to-transparent" : "from-blue-500/5 via-transparent to-transparent"}`} 
                  />
                  
                  {/* Image Element */}
                  {project.isEmbedImage ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  ) : (
                    <span className="transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6 drop-shadow-2xl">
                      {project.image}
                    </span>
                  )}

                  {/* Corner Quick Link Arrow */}
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute top-4 right-4 p-2.5 rounded-full border opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 z-20
                      ${dark ? "bg-slate-950/80 text-cyan-400 border-white/10" : "bg-white/90 text-blue-600 border-slate-200"}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Content Details Area */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] tracking-widest font-mono font-bold uppercase
                      ${dark ? "text-cyan-400" : "text-blue-600"}`}>
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed mb-6 flex-grow ${dark ? "text-slate-400" : "text-slate-600"}`}>
                    {project.description}
                  </p>

                  {/* Tags Section */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-md font-medium border
                          ${dark 
                            ? "bg-white/5 text-slate-300 border-white/5" 
                            : "bg-slate-50 text-slate-600 border-slate-100"
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action Buttons */}
                  <div className={`flex items-center gap-4 pt-4 border-t ${dark ? "border-white/5" : "border-slate-100"}`}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase transition-colors
                        ${dark ? "text-slate-200 hover:text-cyan-400" : "text-slate-800 hover:text-blue-600"}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase transition-colors
                        ${dark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" /> Source Code
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Centered GitHub Repositories Link Button */}
        <div className="flex justify-center mt-12 mb-6">
          <a
            href="https://github.com/shimul811898?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]
              ${dark 
                ? "bg-slate-900 hover:bg-slate-850 text-white border border-white/10 hover:border-white/20" 
                : "bg-[#0f172a] hover:bg-[#1e293b] text-white"}`}
          >
            <span>View All Projects on GitHub</span>
            <span className="text-xs">❯</span>
          </a>
        </div>

      </main>
    </div>
    </>
  );
}