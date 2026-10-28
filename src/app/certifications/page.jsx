"use client";

import { useState, useEffect } from "react";
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
  Maximize2,
  Calendar,
  Building,
  CheckCircle2,
} from "lucide-react";

export default function CertificationsPage() {
  const pathname = usePathname();
  const isStandalone = pathname === "/certifications";
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalImage, setModalImage] = useState(null);

  const filters = ["All", "Certifications", "Awards", "Competitions"];

  useEffect(() => {
    async function fetchCertifications() {
      try {
        const res = await fetch("/api/certifications");
        const data = await res.json();
        if (data.success && Array.isArray(data.certifications)) {
          setItems(data.certifications);
        }
      } catch (err) {
        console.error("Failed to load certifications from MongoDB:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCertifications();
  }, []);

  // Compute dynamic stats based on MongoDB data
  const certCount = items.filter(
    (i) => (i.type || "").toLowerCase() === "certifications"
  ).length;
  const awardsCount = items.filter(
    (i) => (i.type || "").toLowerCase() === "awards"
  ).length;
  const compCount = items.filter(
    (i) => (i.type || "").toLowerCase() === "competitions"
  ).length;
  const verifiedCount = items.filter((i) => Boolean(i.credentialId)).length;
  const verifiedPct =
    items.length > 0
      ? `${Math.round((verifiedCount / items.length) * 100)}%`
      : "100%";

  const stats = [
    {
      label: "Certifications",
      count: loading ? "..." : `${certCount}${certCount > 0 ? "+" : ""}`,
      icon: FileCheck,
      color: "text-cyan-500 bg-cyan-500/10",
    },
    {
      label: "Awards & Honors",
      count: loading ? "..." : `${awardsCount}${awardsCount > 0 ? "+" : ""}`,
      icon: Trophy,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      label: "Verified Credentials",
      count: loading ? "..." : verifiedPct,
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      label: "Contest Highlights",
      count: loading ? "..." : `${compCount > 0 ? `Top ${compCount}` : "0"}`,
      icon: Star,
      color: "text-purple-500 bg-purple-500/10",
    },
  ];

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter(
          (item) =>
            (item.type || "").toLowerCase() === activeFilter.toLowerCase()
        );

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
        ${
          isStandalone
            ? "min-h-screen pt-24 pb-20 bg-gradient-to-br"
            : "py-16 border-t border-slate-200/40 dark:border-slate-800/40"
        }
        ${
          dark
            ? "bg-[#030712] text-slate-100"
            : "bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 text-slate-900"
        }`}
      >
        {dark && (
          <>
            <div
              className="fixed inset-0 pointer-events-none z-0
              bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:5rem_5rem]"
            />
            <div className="fixed top-20 left-1/3 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-cyan-500/5 blur-[120px]" />
            <div className="fixed bottom-20 right-1/4 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-blue-500/5 blur-[120px]" />
          </>
        )}

        <main className="relative max-w-6xl mx-auto px-6 z-10 space-y-12">
          {/* HEADER SECTION */}
          <section className="max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded-full mb-4
              ${
                dark
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              <Award className="w-3.5 h-3.5" /> Recognition & Credentials
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
              Certifications &{" "}
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r
                ${
                  dark
                    ? "from-cyan-400 via-blue-500 to-indigo-400"
                    : "from-blue-600 via-indigo-600 to-cyan-600"
                }`}
              >
                Awards
              </span>
            </h1>
            <p
              className={`text-base md:text-lg leading-relaxed ${
                dark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Verified professional credentials, academic distinction, and
              competitive programming achievements loaded dynamically from MongoDB.
            </p>
          </section>

          {/* DYNAMIC STATS CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`border rounded-3xl p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300
                  ${
                    dark
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-white border-slate-200/80 text-slate-800"
                  }`}
              >
                <div
                  className={`p-2.5 rounded-2xl ${stat.color} mb-3 flex items-center justify-center`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl md:text-3xl font-black tracking-tight">
                  {stat.count}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* FILTER TABS */}
          <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200/40 dark:border-slate-800/40 pb-5">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-mono font-bold tracking-wider uppercase px-4 py-2 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer
                  ${
                    activeFilter === filter
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

          {/* SKELETON LOADER */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className={`rounded-3xl border overflow-hidden flex flex-col h-[480px] animate-pulse ${
                    dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
                  }`}
                >
                  <div className={`h-64 w-full ${dark ? "bg-white/5" : "bg-slate-100"}`} />
                  <div className="p-6 space-y-3 flex-grow">
                    <div className={`h-4 w-24 rounded ${dark ? "bg-white/10" : "bg-slate-200"}`} />
                    <div className={`h-6 w-3/4 rounded ${dark ? "bg-white/10" : "bg-slate-200"}`} />
                    <div className={`h-4 w-full rounded ${dark ? "bg-white/5" : "bg-slate-100"}`} />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div
              className={`p-12 rounded-3xl border text-center ${
                dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
              }`}
            >
              <p className="text-slate-400 text-sm">
                No items found for category "{activeFilter}".
              </p>
            </div>
          ) : (
            /* CERTIFICATIONS CARDS GRID */
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    layout
                    key={item._id || item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                    className={`group relative rounded-3xl border overflow-hidden flex flex-col justify-between shadow-lg transition-all duration-300
                      ${
                        dark
                          ? "bg-[#0b0f19] border-slate-800/80 hover:border-cyan-500/40 shadow-black/40 hover:shadow-cyan-500/10"
                          : "bg-white border-slate-200/90 hover:border-blue-400 shadow-slate-200/60 hover:shadow-blue-500/10"
                      }`}
                  >
                    {/* TOP PREVIEW CONTAINER */}
                    <div
                      className={`relative p-5 md:p-6 pb-2 ${
                        dark ? "bg-slate-950/80" : "bg-slate-100/70"
                      } border-b ${
                        dark ? "border-slate-800/60" : "border-slate-200/60"
                      }`}
                    >
                      {/* Featured Badge */}
                      {item.featured && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm backdrop-blur-md">
                            ★ FEATURED
                          </span>
                        </div>
                      )}

                      {/* Image Frame */}
                      <div
                        className={`relative rounded-2xl overflow-hidden border shadow-xl group/img cursor-pointer transition-transform duration-300
                          ${
                            dark
                              ? "border-slate-800 bg-slate-900"
                              : "border-slate-300/80 bg-white"
                          }`}
                        onClick={() =>
                          item.image &&
                          setModalImage({ src: item.image, title: item.title })
                        }
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
                          <div
                            className={`h-48 w-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden
                            ${
                              dark
                                ? "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100"
                                : "bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 text-slate-800"
                            }`}
                          >
                            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-3 text-blue-500 dark:text-cyan-400">
                              {item.type === "Competitions" ? (
                                <Trophy className="w-8 h-8" />
                              ) : item.type === "Awards" ? (
                                <Medal className="w-8 h-8" />
                              ) : (
                                <Award className="w-8 h-8" />
                              )}
                            </div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
                              {item.issuedBy}
                            </span>
                            <h4 className="text-sm font-bold max-w-xs leading-snug truncate">
                              {item.title}
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CARD CONTENT */}
                    <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                      <div>
                        {/* Category Tag */}
                        <div className="mb-3">
                          <span
                            className={`inline-block px-3 py-1 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider
                            ${
                              dark
                                ? "bg-slate-800/90 text-slate-300 border border-slate-700/50"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}
                          >
                            {item.categoryTag || item.type}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className={`text-xl md:text-2xl font-bold tracking-tight leading-snug mb-3 transition-colors
                          ${
                            dark
                              ? "text-blue-400 hover:text-cyan-300"
                              : "text-blue-600 hover:text-blue-700"
                          }`}
                        >
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p
                          className={`text-sm leading-relaxed mb-4 ${
                            dark ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {item.description}
                        </p>

                        {/* Skills badges */}
                        {Array.isArray(item.skills) && item.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {item.skills.map((skill) => (
                              <span
                                key={skill}
                                className={`text-[10px] font-mono px-2.5 py-1 rounded-md font-medium border
                                ${
                                  dark
                                    ? "bg-white/5 text-slate-300 border-white/5"
                                    : "bg-slate-50 text-slate-600 border-slate-100"
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Issuer & Date info */}
                        <div
                          className={`pt-3 border-t text-xs flex flex-wrap items-center justify-between gap-2 ${
                            dark
                              ? "border-slate-800 text-slate-400"
                              : "border-slate-100 text-slate-500"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-blue-500" />
                            <span>{item.issuedBy}</span>
                          </div>
                          {item.date && (
                            <div className="flex items-center gap-1.5 font-mono">
                              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                              <span>{item.date}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Credential Link Button */}
                      {item.credentialUrl && (
                        <div className="pt-3">
                          <a
                            href={item.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border transition-all duration-300
                            ${
                              dark
                                ? "bg-white/5 hover:bg-white/10 border-white/10 text-cyan-400 hover:border-cyan-500/40"
                                : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-blue-600 hover:border-blue-400"
                            }`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Verify Credential</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* FULL IMAGE MODAL */}
          <AnimatePresence>
            {modalImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
                onClick={() => setModalImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setModalImage(null)}
                    className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 text-white border border-white/20 hover:bg-slate-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img
                    src={modalImage.src}
                    alt={modalImage.title}
                    className="w-full h-auto max-h-[85vh] object-contain"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
