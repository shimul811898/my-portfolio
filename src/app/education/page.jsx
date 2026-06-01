"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  School, 
  MapPin, 
  Calendar, 
  Sparkles, 
  BookMarked, 
  Star, 
  Globe 
} from "lucide-react";

export default function EducationPage() {
  const pathname = usePathname();
  const isStandalone = pathname === "/education";
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [eduFilter, setEduFilter] = useState("All");

  // Education / Qualifications Dataset matching image
  const qualifications = [
    {
      title: "Diploma In Computer Science & Technology",
      status: "Current",
      institution: "Kurigram Polytechnic Institute",
      location: "Kurigram, Bangladesh",
      duration: "2023 - Present",
      colorClass: "blue",
      iconType: "graduation",
      tags: ["Programming Contest Finalist", "Open Source Contributor", "Leadership Role"]
    },
    {
      title: "Secondary School Certificate (SSC)",
      status: "Completed",
      institution: "Bagher Bazar High School",
      location: "Bagher Bazar,Gazipur",
      duration: "2023",
      colorClass: "purple",
      iconType: "school",
      tags: ["GPA 4.83", "Best Student Award"]
    },
    {
      title: "MERN Stack Development",
      status: "Certification",
      institution: "Programming Hero",
      location: "Online",
      duration: "2025",
      colorClass: "orange",
      iconType: "award",
      tags: ["Full-Stack Certified", "15+ Projects", "API Integration"]
    },
      {
      title: "Primary School Certificate (PSC)",
      status: "Completed",
      institution: "Sks Noton Kuri Biddapith",
      location: "BharatKhali,Saghata,Gaibandha",
      duration: "2017",
      colorClass: "green",
      iconType: "building",
      tags: ["GPA 5.00"]
    }
  ];

  const stats = [
    { label: "Qualifications", count: "4", icon: BookMarked, color: "text-blue-500 bg-blue-500/10" },
    { label: "Certifications", count: "4+", icon: Award, color: "text-purple-500 bg-purple-500/10" },
    { label: "GPA Average", count: "4.8+", icon: Star, color: "text-yellow-500 bg-yellow-500/10" },
    { label: "Skills", count: "10+", icon: Globe, color: "text-emerald-500 bg-emerald-500/10" }
  ];

  // Qualification status filtering
  const filteredQualifications = eduFilter === "All"
    ? qualifications
    : qualifications.filter(q => q.status.toLowerCase() === eduFilter.toLowerCase());

  // Render proper icon based on string
  const renderCardIcon = (type) => {
    const classStr = "w-5 h-5";
    switch (type) {
      case "graduation":
        return <GraduationCap className={classStr} />;
      case "building":
        return <School className={classStr} />;
      case "school":
        return <BookOpen className={classStr} />;
      case "award":
        return <Award className={classStr} />;
      default:
        return <GraduationCap className={classStr} />;
    }
  };

  // Get accent styles for cards
  const getColorStyles = (color) => {
    switch (color) {
      case "blue":
        return {
          iconBg: "bg-blue-600 dark:bg-blue-500 text-white",
          border: "border-blue-500/20 dark:border-blue-500/30 hover:border-blue-500/50",
          glow: "hover:shadow-blue-500/5",
          tagBg: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300",
          badgeBg: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/20"
        };
      case "pink":
        return {
          iconBg: "bg-pink-600 dark:bg-pink-500 text-white",
          border: "border-pink-500/20 dark:border-pink-500/30 hover:border-pink-500/50",
          glow: "hover:shadow-pink-500/5",
          tagBg: "bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-300",
          badgeBg: "bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 border border-pink-200/50 dark:border-pink-500/20"
        };
      case "green":
        return {
          iconBg: "bg-emerald-600 dark:bg-emerald-500 text-white",
          border: "border-emerald-500/20 dark:border-emerald-500/30 hover:border-emerald-500/50",
          glow: "hover:shadow-emerald-500/5",
          tagBg: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
          badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20"
        };
      case "purple":
        return {
          iconBg: "bg-purple-600 dark:bg-purple-500 text-white",
          border: "border-purple-500/20 dark:border-purple-500/30 hover:border-purple-500/50",
          glow: "hover:shadow-purple-500/5",
          tagBg: "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300",
          badgeBg: "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-500/20"
        };
      case "orange":
        return {
          iconBg: "bg-orange-600 dark:bg-orange-500 text-white",
          border: "border-orange-500/20 dark:border-orange-500/30 hover:border-orange-500/50",
          glow: "hover:shadow-orange-500/5",
          tagBg: "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300",
          badgeBg: "bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-500/20"
        };
      default:
        return {
          iconBg: "bg-blue-600 text-white",
          border: "border-slate-200 dark:border-slate-800",
          glow: "",
          tagBg: "bg-slate-100 text-slate-700",
          badgeBg: "bg-slate-100 text-slate-600"
        };
    }
  };

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

      {dark && (
        <>
          <div className="fixed inset-0 pointer-events-none z-0
            bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:5rem_5rem]" />
          <div className="fixed top-20 right-1/4 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="fixed bottom-20 left-1/4 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-blue-500/5 blur-[120px]" />
        </>
      )}

      <main className="relative max-w-6xl mx-auto px-6 z-10 space-y-12">
        
        {/* ── HEADER INTRO ──────────────────────────────── */}
        <section className="max-w-2xl">
          <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded-full mb-4
            ${dark ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-blue-50 text-blue-700 border border-blue-100"}`}>
            <Sparkles className="w-3.5 h-3.5" /> Academic Journey
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
            Education &{" "}
            <span className={`bg-clip-text text-transparent bg-gradient-to-r
              ${dark ? "from-cyan-400 to-blue-500" : "from-blue-600 to-indigo-600"}`}>
              Qualifications
            </span>
          </h1>
          <p className={`text-base md:text-lg leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
            My academic journey and continuous learning in tech & beyond.
          </p>
        </section>

        {/* ── TABS FILTER ───────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200/40 dark:border-slate-800/40 pb-5">
          {["All", "Current", "Completed", "Certification"].map((tab) => (
            <button
              key={tab}
              onClick={() => setEduFilter(tab)}
              className={`text-xs font-mono font-bold tracking-wider uppercase px-4 py-2 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer
                ${eduFilter === tab
                  ? dark 
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]" 
                    : "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : dark
                    ? "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 border border-transparent"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mx-auto">
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

        {/* ── QUALIFICATIONS CARDS GRID ─────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredQualifications.map((item) => {
            const styles = getColorStyles(item.colorClass);
            return (
              <div
                key={item.title}
                className={`group relative rounded-3xl border p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300
                  ${dark 
                    ? "bg-white/5 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl hover:border-cyan-500/30" 
                    : "bg-white border-slate-200 bg-white/80 hover:border-blue-300 hover:shadow-blue-500/5"} 
                  ${styles.border} ${styles.glow}`}
              >
                <div>
                  {/* Icon + status badge */}
                  <div className="flex justify-between items-start gap-4 mb-5">
                    <div className={`p-3 rounded-2xl ${styles.iconBg} flex items-center justify-center shadow-md`}>
                      {renderCardIcon(item.iconType)}
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${styles.badgeBg}`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Title & info */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>

                    <div className="space-y-1.5 text-xs opacity-75">
                      <p className="flex items-center gap-2 font-medium">
                        <School className="w-3.5 h-3.5 opacity-70" />
                        <span>{item.institution}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 opacity-70" />
                        <span>{item.location}</span>
                      </p>
                      <p className="flex items-center gap-2 font-semibold">
                        <Calendar className="w-3.5 h-3.5 opacity-70" />
                        <span>{item.duration}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subtag pills */}
                <div className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-slate-100 dark:border-white/5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-medium px-2.5 py-1.5 rounded-lg flex items-center gap-1 border border-transparent ${styles.tagBg}`}
                    >
                      <Sparkles className="w-2.5 h-2.5 opacity-70" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
    </>
  );
}
