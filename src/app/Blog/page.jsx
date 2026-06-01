"use client";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Tag, Search } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { usePathname } from "next/navigation";

const BLOG_POSTS = [
    {
        id: 1,
        title: "Building Scalable Web Apps with Next.js 15 & Server Components",
        excerpt: "Explore best practices for optimizing hydration, leveraging streaming rendering, and structuring production-ready Next.js architecture.",
        category: "Development",
        date: "May 28, 2026",
        readTime: "5 min read",
        slug: "scalable-web-apps-nextjs",
    },
    {
        id: 2,
        title: "The Art of Micro-interactions in Clean UI Design",
        excerpt: "How tiny interactive animations can scale user retention and create a high-fidelity digital product experience.",
        category: "Design",
        date: "May 15, 2026",
        readTime: "4 min read",
        slug: "micro-interactions-ui-design",
    },
    {
        id: 3,
        title: "Mastering Tailwind CSS v4: Elite Layout Techniques",
        excerpt: "Deep dive into container queries, fluid typography, and dynamic dark mode configurations without code bloat.",
        category: "CSS",
        date: "April 30, 2026",
        readTime: "7 min read",
        slug: "mastering-tailwind-v4",
    },
];

const CATEGORIES = ["All", "Development", "Design", "CSS"];

export function BlogPage() {
    const pathname = usePathname();
    const isStandalone = pathname === "/Blog";
    const { theme } = useTheme();
    const dark = theme === "dark";

    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = BLOG_POSTS.filter((post) => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div>
            {isStandalone && (
                <>
                    <Header />
                    <ThemeToggle />
                </>
            )}
            <div className={`transition-colors duration-500 overflow-x-hidden font-sans
                ${isStandalone 
                    ? "min-h-screen pt-28 pb-16" 
                    : "py-16 border-t border-slate-200/40 dark:border-slate-800/40"
                }
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

                <main className="relative max-w-6xl mx-auto px-6 z-10">

                    <div className="max-w-2xl mb-16 border-l-4 pl-6 py-2 border-cyan-500 transition-all">
                        <span className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "text-blue-600"}`}>
                            Insights & Articles
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none mt-3">
                            Technical{" "}
                            <span className={`bg-clip-text text-transparent bg-gradient-to-r
                                ${dark ? "from-cyan-400 to-blue-500" : "from-blue-600 to-indigo-600"}`}>
                                Writings
                            </span>
                        </h1>
                        <p className={`text-base md:text-lg mt-4 leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
                            I write about modern frontend workflows, clean UI architectures, and production-ready tech solutions.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200/60 dark:border-slate-800/60 mb-12">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                            {CATEGORIES.map((category) => {
                                const isSelected = activeCategory === category;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 shadow-sm border
                                            ${isSelected
                                                ? dark
                                                    ? "bg-cyan-500 border-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                                                    : "bg-blue-600 border-blue-600 text-white font-bold"
                                                : dark
                                                    ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700"
                                                    : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>

                        <div className={`relative flex items-center w-full md:w-1/2 h-12 rounded-xl border-2 px-3 transition-all shadow-sm
                            ${dark
                                ? "border-slate-800 bg-slate-900 focus-within:border-cyan-500"
                                : "border-slate-200 bg-white focus-within:border-blue-500"
                            }`}
                        >
                            <div className="flex items-center pr-2">
                                <Search className={`w-5 h-5 ${dark ? "text-slate-500" : "text-gray-400"}`} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full h-full bg-transparent pr-8 text-sm font-medium focus:outline-none
                                    ${dark ? "text-slate-800 placeholder-slate-400" : "text-slate-200 placeholder-slate-500"}`}
                            />
                        </div>
                    </div>

                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                            {filteredPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className={`relative group flex flex-col justify-between p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden
                                        ${dark
                                            ? "border-white/10 bg-white/5 backdrop-blur-xl text-white hover:border-cyan-500/40 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
                                            : "border-slate-200 bg-white/80 backdrop-blur-xl text-slate-800 shadow-xl hover:border-blue-400"
                                        }`}
                                >
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                                        ${dark ? "bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" : "bg-gradient-to-br from-blue-100/30 via-transparent to-indigo-100/30"}`}
                                    />

                                    <div className="relative z-10">
                                        <div className={`flex items-center gap-3 text-xs font-semibold mb-4 transition-colors duration-500 ${dark ? "text-slate-400" : "text-slate-500"}`}>
                                            <span className={`flex items-center gap-1 ${dark ? "text-cyan-400" : "text-blue-600"}`}>
                                                <Tag className="w-3.5 h-3.5" />
                                                {post.category}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {post.date}
                                            </span>
                                        </div>

                                        <Link href={`/blog/${post.slug}`} className="block mb-3">
                                            <h2 className={`text-xl font-bold tracking-tight transition-colors duration-300 line-clamp-2
                                                ${dark ? "text-slate-100 group-hover:text-cyan-400" : "text-slate-900 group-hover:text-blue-600"}`}>
                                                {post.title}
                                            </h2>
                                        </Link>

                                        <p className={`text-sm line-clamp-3 leading-relaxed transition-colors duration-500 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <div className={`relative z-10 flex items-center justify-between pt-5 mt-6 border-t text-xs font-semibold transition-colors duration-500
                                        ${dark ? "border-slate-800 text-slate-400" : "border-slate-100 text-slate-500"}`}
                                    >
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {post.readTime}
                                        </span>

                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className={`flex items-center gap-1 transition-colors duration-300
                                                ${dark ? "text-slate-300 group-hover:text-cyan-400" : "text-slate-900 group-hover:text-blue-600"}`}
                                        >
                                            <span>Read Article</span>
                                            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={`text-center py-20 border border-dashed rounded-2xl transition-colors duration-500
                            ${dark ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-400"}`}
                        >
                            <p className="text-sm">No articles found matching your criteria.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default BlogPage;