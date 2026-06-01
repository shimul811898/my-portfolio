"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { Star, GitFork, ArrowUpRight, Flame, BarChart2, BookOpen, Layers, Users, Award, Code } from "lucide-react";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function GitHubPage() {
  const pathname = usePathname();
  const isStandalone = pathname === "/github";
  const { theme } = useTheme();
  const dark = theme === "dark";
  
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Parallel fetch profile and repos for high performance
    Promise.all([
      fetch("https://api.github.com/users/shimul811898").then((res) => {
        if (!res.ok) throw new Error("Profile fetch failed");
        return res.json();
      }),
      fetch("https://api.github.com/users/shimul811898/repos?per_page=100&sort=updated").then((res) => {
        if (!res.ok) throw new Error("Repos fetch failed");
        return res.json();
      })
    ])
      .then(([profileData, reposData]) => {
        setProfile(profileData);
        setRepos(reposData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Calculate stats from repos data
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
  
  // Calculate language distribution
  const languagesMap = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
    }
  });

  const sortedLanguages = Object.entries(languagesMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // top 5 languages

  const totalLangUsage = sortedLanguages.reduce((acc, curr) => acc + curr[1], 0);

  // Filter top 6 repos for display
  const topRepos = [...repos]
    .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
    .slice(0, 6);

  const stats = [
    {
      label: "GitHub Streak",
      value: "Daily Active",
      icon: Flame,
      color: "text-orange-500 bg-orange-500/10",
      description: "Consistent daily contributions & commits."
    },
    {
      label: "Open Source",
      value: `${profile?.public_repos || "20+"} Repos`,
      icon: BookOpen,
      color: "text-blue-500 bg-blue-500/10",
      description: "Various open-source projects & codebases."
    },
    {
      label: "Productivity",
      value: "Active Coder",
      icon: BarChart2,
      color: "text-emerald-500 bg-emerald-500/10",
      description: "Consistent commits and code updates."
    }
  ];

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
        {/* Ambient Grid */}
        {dark && (
          <>
            <div className="fixed inset-0 pointer-events-none z-0
              bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]
              [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="fixed inset-0 pointer-events-none z-0
              bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),transparent_50%)]" />
          </>
        )}

        <main className="relative max-w-6xl mx-auto px-6 z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs uppercase font-mono font-bold tracking-[0.2em] mb-3
              ${dark ? "text-cyan-400" : "text-blue-600"}`}>
              Activity & Metrics
            </h2>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              GitHub Stats & Contributions
            </h1>
            <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
              Explore my code activity, contribution heatmap, and top public repositories fetched live.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 100 }}
                className={`p-6 rounded-3xl border flex gap-4 transition-all duration-300 hover:shadow-lg
                  ${dark 
                    ? "bg-slate-900/50 border-white/5 hover:border-white/10" 
                    : "bg-white border-slate-200/80 hover:border-slate-300"}`}
              >
                <div className={`p-3 rounded-2xl ${stat.color} h-fit`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${dark ? "text-slate-400" : "text-slate-500"}`}>
                    {stat.label}
                  </span>
                  <h3 className="text-xl font-extrabold mt-0.5">{stat.value}</h3>
                  <p className={`text-xs mt-2 leading-relaxed ${dark ? "text-slate-500" : "text-slate-600"}`}>
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contribution Calendar Heatmap Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`p-6 md:p-8 rounded-3xl border mb-12
              ${dark 
                ? "bg-slate-900/50 border-white/5" 
                : "bg-white border-slate-200/80"}`}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <GithubIcon className="w-5 h-5 text-cyan-400" />
              Contribution Calendar
            </h3>
            
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[800px] flex justify-center">
                <img 
                  src={`https://ghchart.rshah.org/${dark ? "06b6d4" : "2563eb"}/shimul811898`} 
                  alt="Shimul GitHub Contributions Chart"
                  className="w-full max-w-[900px] select-none"
                />
              </div>
            </div>
            
            <div className={`flex justify-between items-center mt-4 text-xs font-mono
              ${dark ? "text-slate-500" : "text-slate-500"}`}>
              <span>Username: shimul811898</span>
              <a 
                href="https://github.com/shimul811898"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 hover:underline ${dark ? "text-cyan-400" : "text-blue-600"}`}
              >
                View Profile <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Streak & Stats Widgets Section (Premium Custom Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Custom GitHub Stats Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`p-6 md:p-8 rounded-3xl border flex flex-col justify-between
                ${dark 
                  ? "bg-slate-900/50 border-white/5" 
                  : "bg-white border-slate-200/80"}`}
            >
              <div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-cyan-400" />
                  GitHub Summary Stats
                </h3>

                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-6 bg-slate-700/20 rounded w-1/2" />
                    <div className="h-6 bg-slate-700/20 rounded w-1/3" />
                    <div className="h-6 bg-slate-700/20 rounded w-2/3" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-2xl border ${dark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"}`}>
                      <span className="text-xs text-slate-400 block font-medium">Total Stars</span>
                      <span className="text-2xl font-black text-yellow-500 mt-1 block">{totalStars} ✨</span>
                    </div>
                    <div className={`p-4 rounded-2xl border ${dark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"}`}>
                      <span className="text-xs text-slate-400 block font-medium">Total Forks</span>
                      <span className="text-2xl font-black text-blue-500 mt-1 block">{totalForks} 🍴</span>
                    </div>
                    <div className={`p-4 rounded-2xl border ${dark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"}`}>
                      <span className="text-xs text-slate-400 block font-medium">Followers</span>
                      <span className="text-2xl font-black text-purple-500 mt-1 block">{profile?.followers || 0} 👥</span>
                    </div>
                    <div className={`p-4 rounded-2xl border ${dark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"}`}>
                      <span className="text-xs text-slate-400 block font-medium">Public Repos</span>
                      <span className="text-2xl font-black text-emerald-500 mt-1 block">{profile?.public_repos || 0} 📂</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bio snippet if loaded */}
              {!loading && profile && (
                <div className={`mt-6 p-4 rounded-2xl border text-xs leading-relaxed ${dark ? "bg-white/5 border-white/5 text-slate-400" : "bg-slate-50 border-slate-100 text-slate-600"}`}>
                  <span className="font-bold text-slate-300 block mb-1">GitHub Bio</span>
                  "{profile.bio || "Full-Stack Web Developer building awesome applications."}"
                </div>
              )}
            </motion.div>

            {/* Top Languages Usage Chart Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`p-6 md:p-8 rounded-3xl border flex flex-col justify-between
                ${dark 
                  ? "bg-slate-900/50 border-white/5" 
                  : "bg-white border-slate-200/80"}`}
            >
              <div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-500" />
                  Most Used Languages
                </h3>

                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    {[...Array(3)].map((_, idx) => (
                      <div key={idx} className="h-4 bg-slate-700/20 rounded w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedLanguages.map(([lang, count]) => {
                      const percentage = Math.round((count / totalLangUsage) * 100);
                      return (
                        <div key={lang}>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span>{lang}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className={`w-full h-2 rounded-full overflow-hidden ${dark ? "bg-slate-800" : "bg-slate-100"}`}>
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-500 font-mono mt-6">
                * Based on public code metrics fetched live from GitHub profile.
              </div>
            </motion.div>
          </div>

          {/* Top Repositories Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Layers className="w-6 h-6 text-cyan-400" />
              Top Active Repositories
            </h3>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`p-6 rounded-3xl border animate-pulse h-48
                    ${dark ? "bg-slate-900/40 border-white/5" : "bg-slate-100/50 border-slate-200"}`}
                  >
                    <div className="h-4 bg-slate-700/30 rounded w-2/3 mb-4" />
                    <div className="h-3 bg-slate-700/20 rounded w-full mb-2" />
                    <div className="h-3 bg-slate-700/20 rounded w-5/6 mb-6" />
                    <div className="h-4 bg-slate-700/30 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 font-mono">Error: {error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topRepos.map((repo, i) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 80 }}
                    className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5
                      ${dark 
                        ? "bg-slate-900/40 border-white/5 hover:bg-slate-900/80 hover:border-white/10" 
                        : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-md"}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border
                          ${dark 
                            ? "bg-white/5 border-white/5 text-cyan-400" 
                            : "bg-slate-50 border-slate-100 text-blue-600"
                          }`}
                        >
                          {repo.language || "Open Source"}
                        </span>
                        
                        <a 
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ArrowUpRight className={`w-4 h-4 ${dark ? "text-cyan-400" : "text-blue-600"}`} />
                        </a>
                      </div>

                      <h4 className="text-lg font-bold mb-2 tracking-tight group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {repo.name}
                      </h4>
                      <p className={`text-xs leading-relaxed mb-6 line-clamp-2 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                        {repo.description || "No description provided. Click the icon to view codebase."}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-4 border-t border-slate-200/20">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-blue-500" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
