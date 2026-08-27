"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Trophy,
  Medal,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Star,
  FileCheck,
  Eye,
  X,
  Maximize2
} from "lucide-react";

export default function CertificationsPage() {
  const pathname = usePathname();
  const isStandalone = pathname === "/certifications";
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalImage, setModalImage] = useState(null);

  const filters = ["All", "Certifications", "Awards", "Competitions"];

  const certificationsAndAwards = [
    {
      id: 1,
      title: "Complete Web Development Course With Programming Hero",
      categoryTag: "FULL STACK DEV",
      type: "Certifications",
      issuedBy: "Programming Hero",
      date: "Aug 2026",
      featured: true,
      credentialId: "WEB13-1552",
      credentialUrl: "https://programming-hero.com",
      image: "/assest/ph-certificate.png",
      description: "Certificate of Completion with Excellence. Demonstrated proficiency in React.js, Next.js, Node.js, Express.js, MongoDB, and AI-powered web development.",
      skills: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "AI Practices"]
    }
  ];

  const stats = [
    { label: "Certifications", count: "3+", icon: FileCheck, color: "text-cyan-500 bg-cyan-500/10" },
    { label: "Awards & Honors", count: "2+", icon: Trophy, color: "text-amber-500 bg-amber-500/10" },
    { label: "Verified Credentials", count: "100%", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Contest Highlights", count: "Top 5", icon: Star, color: "text-purple-500 bg-purple-500/10" }
  ];

  const filteredItems = activeFilter === "All"
    ? certificationsAndAwards
    : certificationsAndAwards.filter(item => item.type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <>
      {isStandalone && (
        <>
          <Header />
          <ThemeToggle />
        </>
      )}
      <div
        className={`transition-colors duration-500 overflow-x-hidden font-sans
        ${isStandalone
            ? "min-h-screen pt-24 pb-20 bg-gradient-to-br"
            : "py-16 border-t border-slate-200/40 dark:border-slate-800/40"
          }
        ${dark ? "bg-[#030712] text-slate-100" : "bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 text-slate-900"}`}
      >
        {dark && (
          <>
            <div className="fixed inset-0 pointer-events-none z-0
              bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:5rem_5rem]" />
            <div className="fixed top-20 left-1/3 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-cyan-500/5 blur-[120px]" />
            <div className="fixed bottom-20 right-1/4 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-blue-500/5 blur-[120px]" />
          </>
        )}

        <main className="relative max-w-6xl mx-auto px-6 z-10 space-y-12">
          {/* ── HEADER SECTION ───────────────────────────── */}
          <section className="max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded-full mb-4
              ${dark ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-blue-50 text-blue-700 border border-blue-200"}`}
            >
              <Award className="w-3.5 h-3.5" /> Recognition & Credentials
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
              Certifications &{" "}
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r
                ${dark ? "from-cyan-400 via-blue-500 to-indigo-400" : "from-blue-600 via-indigo-600 to-cyan-600"}`}
              >
                Awards
              </span>
            </h1>
            <p className={`text-base md:text-lg leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
              Verified professional credentials, academic distinction, and competitive programming achievements.
            </p>
          </section>

          {/* ── STATS CARDS ──────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`border rounded-3xl p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300
                  ${dark
                    ? "bg-white/5 border-white/10 text-white"
                    : "bg-white border-slate-200/80 text-slate-800"}`}
              >
                <div className={`p-2.5 rounded-2xl ${stat.color} mb-3 flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl md:text-3xl font-black tracking-tight">{stat.count}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* ── FILTER TABS ──────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200/40 dark:border-slate-800/40 pb-5">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-mono font-bold tracking-wider uppercase px-4 py-2 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer
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

          {/* ── CERTIFICATIONS CARDS GRID ────────────────── */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className={`group relative rounded-3xl border overflow-hidden flex flex-col justify-between shadow-lg transition-all duration-300
                    ${dark
                      ? "bg-[#0b0f19] border-slate-800/80 hover:border-cyan-500/40 shadow-black/40 hover:shadow-cyan-500/10"
                      : "bg-white border-slate-200/90 hover:border-blue-400 shadow-slate-200/60 hover:shadow-blue-500/10"
                    }`}
                >
                  {/* ── TOP PREVIEW CONTAINER WITH FEATURED BADGE ── */}
                  <div className={`relative p-5 md:p-6 pb-2 ${dark ? "bg-slate-950/80" : "bg-slate-100/70"} border-b ${dark ? "border-slate-800/60" : "border-slate-200/60"}`}>
                    
                    {/* Featured Pill Badge Top Right */}
                    {item.featured && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm backdrop-blur-md">
                          ★ FEATURED
                        </span>
                      </div>
                    )}

                    {/* Image / Graphic Frame */}
                    <div
                      className={`relative rounded-2xl overflow-hidden border shadow-xl group/img cursor-pointer transition-transform duration-300
                        ${dark ? "border-slate-800 bg-slate-900" : "border-slate-300/80 bg-white"}`}
                      onClick={() => item.image && setModalImage({ src: item.image, title: item.title })}
                    >
                      {item.image ? (
                        <div className="relative h-64 md:h-72 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-semibold text-xs">
                            <Eye className="w-5 h-5 text-cyan-400" />
                            <span>Click to view full certificate</span>
                          </div>
                        </div>
                      ) : (
                        <div className={`h-48 w-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden
                          ${dark ? "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100" : "bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 text-slate-800"}`}
                        >
                          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
                          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-3 text-blue-500 dark:text-cyan-400">
                            {item.type === "Competitions" ? <Trophy className="w-8 h-8" /> : item.type === "Awards" ? <Medal className="w-8 h-8" /> : <Award className="w-8 h-8" />}
                          </div>
                          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
                            {item.badgeText || item.issuedBy}
                          </span>
                          <h4 className="text-sm font-bold max-w-xs leading-snug truncate">
                            {item.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── CARD CONTENT AREA ── */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                      {/* Category Tag */}
                      <div className="mb-3">
                        <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider
                          ${dark ? "bg-slate-800/90 text-slate-300 border border-slate-700/50" : "bg-slate-100 text-slate-700 border border-slate-200"}`}
                        >
                          {item.categoryTag}
                        </span>
                      </div>

                      {/* Main Title */}
                      <h3 className={`text-xl md:text-2xl font-bold tracking-tight leading-snug mb-3 transition-colors
                        ${dark ? "text-blue-400 hover:text-cyan-300" : "text-blue-600 hover:text-blue-700"}`}
                      >
                        {item.title}
                      </h3>

                      {/* Issued by & Date line */}
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`italic ${dark ? "text-slate-400" : "text-slate-500"}`}>Issued by</span>
                          <span className={`font-semibold ${dark ? "text-slate-200" : "text-slate-800"}`}>
                            {item.issuedBy}
                          </span>
                        </div>
                        <span className={`font-mono text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>
                          {item.date}
                        </span>
                      </div>

                      {/* Description */}
                      <p className={`text-xs leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
                        {item.description}
                      </p>
                    </div>

                    {/* ── BOTTOM ACTIONS & VERIFY LINK ── */}
                    <div className="pt-4 space-y-4">
                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`text-[10px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1
                              ${dark ? "bg-slate-900 text-slate-300 border border-slate-800" : "bg-slate-50 text-slate-700 border border-slate-200"}`}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>

                      {/* Divider line above verify link */}
                      <div className={`border-t pt-4 ${dark ? "border-slate-800/80" : "border-slate-200"}`}>
                        <div className="flex items-center justify-between">
                          {item.credentialUrl && item.credentialUrl !== "#" ? (
                            <a
                              href={item.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group/link
                                ${dark ? "text-blue-400 hover:text-cyan-300" : "text-blue-600 hover:text-blue-800"}`}
                            >
                              <span>Verify Credential</span>
                              <ExternalLink className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                            </a>
                          ) : (
                            <span className={`text-xs font-mono ${dark ? "text-slate-500" : "text-slate-400"}`}>
                              Credential ID: {item.credentialId}
                            </span>
                          )}

                          {item.image && (
                            <button
                              onClick={() => setModalImage({ src: item.image, title: item.title })}
                              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors
                                ${dark ? "bg-slate-800/80 hover:bg-slate-700 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span>Enlarge</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── IMAGE LIGHTBOX MODAL ───────────────────────── */}
          <AnimatePresence>
            {modalImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalImage(null)}
                className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
                >
                  <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 bg-slate-950/70">
                    <h3 className="text-sm font-bold text-slate-200 truncate pr-4">{modalImage.title}</h3>
                    <button
                      onClick={() => setModalImage(null)}
                      className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-center max-h-[80vh] overflow-auto bg-slate-950">
                    <img
                      src={modalImage.src}
                      alt={modalImage.title}
                      className="max-w-full max-h-[75vh] object-contain rounded-xl"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
