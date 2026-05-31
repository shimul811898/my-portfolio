"use client";
import Header from "@/components/Header";

import { useTheme } from "@/components/ThemeProvider";

export const ExpertisePage = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const categories = [
    {
      title: "FRONTEND SYSTEMS",
      level: "LEVEL 01",
      skills: [
        { icon: "⚡", name: "React.js",     level: "MASTER"       },
        { icon: "🚀", name: "Next.js",      level: "MASTER"       },
        { icon: "🧠", name: "TypeScript",   level: "EXPERT"       },
        { icon: "🎨", name: "Tailwind CSS", level: "EXPERT"       },
      ],
    },
    {
      title: "BACKEND & DATA",
      level: "LEVEL 02",
      skills: [
        { icon: "🔗", name: "Node.js",    level: "EXPERT"        },
        { icon: "🗄️", name: "Express.js", level: "ADVANCED"      },
        { icon: "⚙️", name: "GraphQL",    level: "ADVANCED"      },
        { icon: "⚡", name: "Redis",      level: "INTERMEDIATE"  },
      ],
    },
    {
      title: "INFRASTRUCTURE",
      level: "LEVEL 03",
      skills: [
        { icon: "☁️", name: "AWS",         level: "ADVANCED"      },
        { icon: "🐳", name: "Docker",      level: "EXPERT"        },
        { icon: "🔁", name: "CI/CD",       level: "EXPERT"        },
        { icon: "🛡️", name: "Security Ops",level: "INTERMEDIATE"  },
      ],
    },
  ];

  return (
   <div>
     <Header />
     <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden font-sans
      ${dark ? "bg-[#030712] text-slate-100" : "bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 text-slate-900"}`}
    >
      {dark && (
        <>
          <div className="fixed inset-0 pointer-events-none z-0
            bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]
            [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="fixed inset-0 pointer-events-none z-0
            bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.15),transparent_50%)]" />
        </>
      )}

      <main className="relative max-w-6xl mx-auto px-6 py-16 z-10">

        <section className="mb-16 border-l-4 pl-6 py-2 border-cyan-500 transition-all">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none">
            Technical{" "}
            <span className={`bg-clip-text text-transparent bg-gradient-to-r
              ${dark ? "from-cyan-400 to-blue-500" : "from-blue-600 to-indigo-600"}`}>
              Expertise
            </span>
          </h1>
          <p className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed
            ${dark ? "text-slate-400" : "text-slate-600"}`}>
            A comprehensive inventory of core competencies developed through
            intensive system architecture and full-stack engineering cycles.
          </p>
        </section>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className={`relative rounded-2xl p-6 border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden group
              ${dark
                ? "border-white/10 bg-white/5 backdrop-blur-xl text-white hover:border-cyan-500/40 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
                : "border-slate-200 bg-white/80 backdrop-blur-xl text-slate-800 shadow-xl hover:border-blue-400"
              }`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                ${dark ? "bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20" : "bg-gradient-to-br from-blue-100/50 via-transparent to-indigo-100/50"}`} 
              />

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className={`text-xs tracking-[0.3em] font-bold uppercase
                    ${dark ? "text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "text-blue-600"}`}>
                    {cat.title}
                  </h2>
                  <span className="text-[10px] opacity-40 font-mono tracking-wider">{cat.level}</span>
                </div>

                <div className="space-y-1">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="group/row flex flex-col cursor-pointer">
                      <div className="flex justify-between items-center py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-base group-hover/row:scale-110 transition-transform duration-200">
                            {skill.icon}
                          </span>
                          <span className="text-sm font-medium group-hover/row:translate-x-1 transition-transform duration-200">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[10px] tracking-widest opacity-50 font-mono group-hover/row:opacity-100 transition-opacity">
                          {skill.level}
                        </span>
                      </div>
                      <div className="h-px w-full transition-all duration-300 group-hover/row:opacity-100 opacity-10 bg-current" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className={`md:col-span-2 p-6 rounded-2xl border transition-all duration-300
            ${dark ? "border-white/10 bg-white/5 backdrop-blur-xl text-slate-200" : "border-slate-200 bg-white/80 backdrop-blur-xl text-slate-800 shadow-xl"}`}
          >
            <h3 className={`text-lg font-bold mb-3 tracking-wide
              ${dark ? "text-cyan-400" : "text-blue-600"}`}>
              Development Philosophy
            </h3>
            <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
              Clean UI architecture, reusable components, and performance-first
              frontend development. Focused on creating smooth and scalable user
              experiences that stand up to production-level traffic.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {["SCALABILITY", "TYPE-SAFETY", "CI/CD ENTHUSIAST"].map((tag) => (
                <span key={tag}
                  className={`px-3 py-1 text-[10px] tracking-widest font-bold rounded-md font-mono
                    ${dark ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-blue-50 text-blue-700 border border-blue-100"}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-2xl border flex flex-col justify-center gap-6 transition-all duration-300
            ${dark
              ? "border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 via-slate-900/40 to-purple-950/20 backdrop-blur-xl text-white"
              : "border-blue-200 bg-gradient-to-br from-white to-blue-50/50 text-slate-800 shadow-xl"
            }`}
          >
            <div className="flex items-center justify-between md:flex-col md:items-start">
              <p className={`text-4xl md:text-5xl font-black tracking-tight ${dark ? "text-cyan-400" : "text-blue-600"}`}>
                1+
              </p>
              <p className={`text-xs uppercase font-mono tracking-wider mt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>
                Year Experience
              </p>
            </div>
            
            <div className={`h-px w-full ${dark ? "bg-white/10" : "bg-slate-200"}`} />
            
            <div className="flex items-center justify-between md:flex-col md:items-start">
              <p className={`text-4xl md:text-5xl font-black tracking-tight ${dark ? "text-purple-400" : "text-indigo-600"}`}>
                15+
              </p>
              <p className={`text-xs uppercase font-mono tracking-wider mt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>
                Projects Shipped
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
   </div>
  );
}

export default ExpertisePage ;