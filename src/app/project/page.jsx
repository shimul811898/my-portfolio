"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { ExternalLink, Layers, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

export const ProjectsPage = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filters = ["ALL", "FULLSTACK", "FRONTEND", "UI/UX"];

  const projects = [
    {
      title: "Docappoint - Doctor Appointment Platform",
      description:
        "A full-stack doctor appointment booking platform that allows users to search doctors, view profiles, and book appointments online with a smooth and responsive UI.",
      category: "FULLSTACK",
      tags: ["Next.js", "Express.js", "MongoDB", "Tailwind CSS", "Node.js"],
      liveUrl: "https://docappoint-seven.vercel.app",
      githubUrl: "https://github.com/shimul811898/DocAppoint",
      image: "/assest/DocAppoint.png",
      isEmbedImage: true
    },
    {
      title: "SunCart - Summer Essentials eCommerce",
      description:
        "A modern full-stack eCommerce platform built with Next.js where users can browse summer essentials, view product details, manage cart, and use secure authentication with a smooth responsive UI.",
      category: "FULLSTACK",
      tags: ["Next.js", "Tailwind CSS", "HeroUI", "Better Auth", "React Hot Toast", "Vercel"],
      liveUrl: "https://a8-sun-cart-teal.vercel.app",
      githubUrl: "https://github.com/shimul811898/A8-SunCart",
      image: "/assest/KeenKeeper.png",
      isEmbedImage: true
    },
    {
      title: "AI-Module-Hub",
      description:
        "A modern AI subscription platform that provides access to multiple leading AI models through a single membership. Users can explore, compare, and utilize powerful AI assistants in one centralized interface with a clean and responsive user experience.",
      category: "FRONTEND",
      tags: ["React", "JavaScript", "Tailwind CSS", "DaisyUI", "HTML", "CSS"],
      liveUrl: "https://ai-module-hub.netlify.app",
      githubUrl: "https://github.com/shimul811898/ai-module-hub",
      image: "/assest/Ai-Module.png",
      isEmbedImage: true
    },
    {
      title: "DigiTools - Digital Toolbox Platform",
      description:
        "An all-in-one digital toolkit web platform offering fast, simple, and browser-based utilities such as image tools, text tools, and more for everyday use.",
      category: "UI/UX",
      tags: ["React", "JavaScript", "Tailwind CSS", "DaisyUI", "HTML", "CSS"],
        githubUrl:"https://github.com/shimul811898/B-13-Assinment-no-6",
      liveUrl: "https://b13-a6-digitool.netlify.app",
      image: "/assest/DigiTools.png",
      isEmbedImage: true
    }
  ];

  const filteredProjects = activeFilter === "ALL"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div>
      <Header />
      <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden font-sans pt-24 pb-20
      ${dark ? "bg-[#030712] text-slate-100" : "bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 text-slate-900"}`}
      >
        {dark && (
          <>
            <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:5rem_5rem]" />
            <div className="fixed top-20 right-1/4 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-blue-500/5 blur-[120px]" />
            <div className="fixed bottom-20 left-1/4 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-purple-500/5 blur-[120px]" />
          </>
        )}

        <main className="relative max-w-6xl mx-auto px-6 z-10">
          <section className="mb-14 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded-full mb-4
            ${dark ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-blue-50 text-blue-700 border border-blue-100"}`}>
              <Layers className="w-3.5 h-3.5" /> Showcase
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
              Selected <span className={`bg-clip-text text-transparent bg-gradient-to-r ${dark ? "from-cyan-400 to-blue-500" : "from-blue-600 to-indigo-600"}`}>Projects</span>
            </h1>
            <p className={`text-base md:text-lg leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
              A curated gallery of production deployments, architectural case studies, and open-source contributions.
            </p>
          </section>

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
                  ${dark ? "border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl hover:border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)]" : "border-slate-200 bg-white hover:border-blue-300 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/5"}`}
                >
                  <div className={`relative h-56 w-full overflow-hidden flex items-center justify-center border-b select-none transition-colors duration-500 ${dark ? "border-white/5 bg-white/5" : "border-slate-100 bg-slate-50"}`}>
                    {project.isEmbedImage ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <span className="text-6xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6 drop-shadow-2xl">{project.image}</span>
                    )}
                    <a href={project.liveUrl} className={`absolute top-4 right-4 p-2.5 rounded-full border opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 z-20 ${dark ? "bg-slate-950/80 text-cyan-400 border-white/10" : "bg-white/90 text-blue-600 border-slate-200"}`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className={`text-[10px] tracking-widest font-mono font-bold uppercase ${dark ? "text-cyan-400" : "text-blue-600"}`}>{project.category}</span>
                    <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className={`text-sm leading-relaxed mb-6 flex-grow ${dark ? "text-slate-400" : "text-slate-600"}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`text-[10px] font-mono px-2.5 py-1 rounded-md font-medium border ${dark ? "bg-white/5 text-slate-300 border-white/5" : "bg-slate-50 text-slate-600 border-slate-100"}`}>{tag}</span>
                      ))}
                    </div>
                    <div className={`flex items-center gap-4 pt-4 border-t ${dark ? "border-white/5" : "border-slate-100"}`}>
                      <a href={project.liveUrl} className={`flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase transition-colors ${dark ? "text-slate-200 hover:text-cyan-400" : "text-slate-800 hover:text-blue-600"}`}><ExternalLink className="w-3.5 h-3.5" /> Live Demo</a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;