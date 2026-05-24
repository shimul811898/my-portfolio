"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";

function SkillRow({ icon, name, level }) {
  return (
    <div className="group flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.02]">
      <div className="flex justify-between items-center py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm opacity-70 group-hover:opacity-100 transition">
            {icon}
          </span>

          <span className="text-sm font-medium group-hover:text-white transition">
            {name}
          </span>
        </div>

        <span className="text-[10px] tracking-widest opacity-60">
          {level}
        </span>
      </div>

      <div className="h-px w-full bg-white/10 group-hover:bg-white/30 transition" />
    </div>
  );
}

function CategoryCard({ title, level, skills }) {
  return (
    <div className="relative rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      <div className="relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xs tracking-[0.3em] text-cyan-300 font-semibold">
            {title}
          </h2>

          <span className="text-[10px] opacity-50">{level}</span>
        </div>

        <div className="space-y-2">
          {skills.map((skill) => (
            <SkillRow key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExpertisePage() {
  useEffect(() => {}, []);

  const categories = [
    {
      title: "FRONTEND SYSTEMS",
      level: "LEVEL 01",
      skills: [
        { icon: "⚡", name: "React.js", level: "MASTER" },
        { icon: "🚀", name: "Next.js", level: "MASTER" },
        { icon: "🧠", name: "TypeScript", level: "EXPERT" },
        { icon: "🎨", name: "Tailwind CSS", level: "EXPERT" },
      ],
    },
    {
      title: "BACKEND & DATA",
      level: "LEVEL 02",
      skills: [
        { icon: "🔗", name: "Node.js", level: "EXPERT" },
        { icon: "🗄️", name: "PostgreSQL", level: "ADVANCED" },
        { icon: "⚙️", name: "GraphQL", level: "ADVANCED" },
        { icon: "⚡", name: "Redis", level: "INTERMEDIATE" },
      ],
    },
    {
      title: "INFRASTRUCTURE",
      level: "LEVEL 03",
      skills: [
        { icon: "☁️", name: "AWS", level: "ADVANCED" },
        { icon: "🐳", name: "Docker", level: "EXPERT" },
        { icon: "🔁", name: "CI/CD", level: "EXPERT" },
        { icon: "🛡️", name: "Security Ops", level: "INTERMEDIATE" },
      ],
    },
  ];

  return (
    <div className="min-h-screen text-white bg-[#05070d] overflow-hidden">
      <Header />
      <ThemeToggle />

      {/* background glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#0ff3,transparent_40%)]" />

      <main className="relative max-w-6xl mx-auto px-6 py-16">

        {/* HERO */}
        <section className="mb-14">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Frontend <span className="text-cyan-400 italic">Developer</span>
          </h1>

          <p className="mt-4 text-white/60 max-w-2xl">
            Frontend Web Developer focused on building responsive, user-friendly,
            and high-performance web interfaces.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="md:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-3 text-cyan-300">
              Development Philosophy
            </h3>

            <p className="text-white/60 leading-relaxed">
              Clean UI architecture, reusable components, and performance-first
              frontend development. Focused on creating smooth and scalable user
              experiences.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
            <p className="text-4xl font-bold">1+</p>
            <p className="text-white/60 text-sm">Year Experience</p>

            <div className="mt-6 text-sm text-white/50">
              15+ projects shipped
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}