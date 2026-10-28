"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import toast from "@/lib/toast";
import {
  ShieldCheck,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  LogOut,
  Loader2,
  CheckCircle,
  AlertCircle,
  FolderGit2,
  Lock,
  Eye,
  EyeOff,
  Sliders,
  Users,
  UserCheck,
  Activity,
  RefreshCw,
  Clock,
  Globe,
  Award,
} from "lucide-react";
import Link from "next/link";

const ADMIN_EMAIL = "shimul181163@gmail.com";

export default function AdminPage() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const isAdmin =
    session?.user &&
    (session.user.role === "admin" || session.user.email === ADMIN_EMAIL);

  // Active Admin View Tab: "projects" | "users" | "visits"
  const [activeAdminTab, setActiveAdminTab] = useState("overview");

  // Analytics state
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // Projects state
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState({ error: "", success: "" });

  // Certifications state
  const [certifications, setCertifications] = useState([]);
  const [loadingCerts, setLoadingCerts] = useState(true);
  const [certFormData, setCertFormData] = useState({
    title: "",
    categoryTag: "FULL STACK DEV",
    type: "Certifications",
    issuedBy: "",
    date: "",
    credentialId: "",
    credentialUrl: "",
    image: "",
    description: "",
    skills: "",
    featured: false,
  });

  // Add Project Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "FULLSTACK",
    tags: "",
    liveUrl: "",
    githubUrlClint: "",
    githubUrlServer: "",
    image: "",
  });

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch("/api/analytics/stats");
      const data = await res.json();
      if (data.success) {
        setAnalytics(data);
      }
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch("/api/projects?all=true");
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleToggleVisibility = async (id, currentVisibility) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isVisible: !currentVisibility }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) => (p._id === id ? { ...p, isVisible: !currentVisibility } : p))
        );
        toast.success(
          !currentVisibility ? "Project Visible on Site" : "Project Hidden from Site",
          !currentVisibility ? "Visitors can now see this project" : "Project will not appear in live showcase"
        );
      } else {
        toast.error("Failed to update visibility", data.error || "Please try again");
      }
    } catch (err) {
      toast.error("Error", err.message);
    }
  };

  const handleSetLimit = async (limit) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bulkAction: "set_limit", limit }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProjects();
        toast.success("Display Limit Updated", `Only the first ${limit} projects will be shown on the live site.`);
      } else {
        toast.error("Failed to set display limit", data.error || "Please try again");
      }
    } catch (err) {
      toast.error("Error", err.message);
    }
  };

  const handleShowAll = async () => {
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bulkAction: "show_all" }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProjects();
        toast.success("Show All Active", "All projects in MongoDB are now visible to visitors.");
      } else {
        toast.error("Failed to show all projects", data.error || "Please try again");
      }
    } catch (err) {
      toast.error("Error", err.message);
    }
  };

  const fetchCertifications = async () => {
    setLoadingCerts(true);
    try {
      const res = await fetch("/api/certifications");
      const data = await res.json();
      if (data.success && Array.isArray(data.certifications)) {
        setCertifications(data.certifications);
      }
    } catch (err) {
      console.error("Failed to load certifications:", err);
    } finally {
      setLoadingCerts(false);
    }
  };

  const handleCertInputChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCertFormData({ ...certFormData, [e.target.name]: value });
  };

  const handleAddCertification = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setFeedback({ error: "", success: "" });

    try {
      const skillsArray = certFormData.skills
        ? certFormData.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      const newCert = {
        title: certFormData.title,
        categoryTag: certFormData.categoryTag,
        type: certFormData.type,
        issuedBy: certFormData.issuedBy,
        date: certFormData.date,
        credentialId: certFormData.credentialId,
        credentialUrl: certFormData.credentialUrl,
        image: certFormData.image || "/assest/ph-certificate.png",
        description: certFormData.description,
        skills: skillsArray,
        featured: certFormData.featured,
      };

      const res = await fetch("/api/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCert),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ success: "Certification added to MongoDB successfully!", error: "" });
        toast.success("Certification Added", `${newCert.title} has been saved to MongoDB.`);
        setCertFormData({
          title: "",
          categoryTag: "FULL STACK DEV",
          type: "Certifications",
          issuedBy: "",
          date: "",
          credentialId: "",
          credentialUrl: "",
          image: "",
          description: "",
          skills: "",
          featured: false,
        });
        fetchCertifications();
      } else {
        const errMsg = data.error || "Failed to add certification";
        setFeedback({ error: errMsg, success: "" });
        toast.error("Failed to add certification", errMsg);
      }
    } catch (err) {
      setFeedback({ error: err.message, success: "" });
      toast.error("Error", err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCertification = async (id) => {
    if (!confirm("Are you sure you want to delete this certification from MongoDB?")) return;
    try {
      const res = await fetch(`/api/certifications?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setCertifications(certifications.filter((c) => c._id !== id));
        toast.success("Certification Deleted", "Removed from MongoDB.");
      } else {
        toast.error("Delete Failed", data.error || "Failed to delete certification");
      }
    } catch (err) {
      toast.error("Error", err.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProjects();
      fetchAnalytics();
      fetchCertifications();
    }
  }, [isAdmin]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setFeedback({ error: "", success: "" });

    try {
      const tagsArray = formData.tags
        ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

      const newProject = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: tagsArray,
        liveUrl: formData.liveUrl,
        githubUrlClint: formData.githubUrlClint,
        githubUrlServer: formData.githubUrlServer,
        image: formData.image || "/assest/Medicare.png",
        isEmbedImage: true,
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ success: "Project successfully added to MongoDB!", error: "" });
        toast.success("Project Added", `${newProject.title} is now saved in MongoDB.`);
        setFormData({
          title: "",
          description: "",
          category: "FULLSTACK",
          tags: "",
          liveUrl: "",
          githubUrlClint: "",
          githubUrlServer: "",
          image: "",
        });
        fetchProjects();
      } else {
        const errMsg = data.error || "Failed to add project";
        setFeedback({ error: errMsg, success: "" });
        toast.error("Failed to add project", errMsg);
      }
    } catch (err) {
      setFeedback({ error: err.message, success: "" });
      toast.error("Error", err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project from MongoDB?")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProjects(projects.filter((p) => p._id !== id));
        toast.success("Project Deleted", "Removed from MongoDB successfully.");
      } else {
        toast.error("Delete Failed", data.error || "Failed to delete project");
      }
    } catch (err) {
      toast.error("Error", err.message);
    }
  };

  const handleSignOut = async () => {
    toast.info("Signing Out", "Ending admin session...");
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <>
      <Header />
      <ThemeToggle />

      <div
        className={`min-h-screen pt-24 pb-20 font-sans transition-colors duration-500
        ${
          dark
            ? "bg-[#030712] text-slate-100"
            : "bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 text-slate-900"
        }`}
      >
        <main className="max-w-6xl mx-auto px-6">
          {sessionLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
              <p className="text-sm font-mono text-slate-400">Verifying admin credentials...</p>
            </div>
          ) : !isAdmin ? (
            <div className="max-w-md mx-auto my-16 text-center">
              <div
                className={`p-8 rounded-3xl border shadow-2xl backdrop-blur-xl ${
                  dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
                }`}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mb-5">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Admin Access Required</h2>
                <p className={`text-xs mb-6 ${dark ? "text-slate-400" : "text-slate-500"}`}>
                  This dashboard is restricted to authorized portfolio administrators (
                  <span className="font-semibold text-purple-400">{ADMIN_EMAIL}</span>).
                </p>
                <Link
                  href="/login"
                  className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                >
                  <ShieldCheck className="w-4 h-4" /> Go to Admin Login
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Admin Top Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200/50 dark:border-slate-800/50 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded-full mb-3 bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin Control Panel
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                    Portfolio & Analytics Dashboard
                  </h1>
                  <p
                    className={`text-sm mt-1 ${
                      dark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Logged in as{" "}
                    <span className="font-semibold text-purple-400">
                      {session.user.email}
                    </span>{" "}
                    (Admin)
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      fetchAnalytics();
                      fetchProjects();
                    }}
                    title="Refresh Data"
                    className={`p-2.5 rounded-xl border transition-all ${
                      dark
                        ? "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm"
                    }`}
                  >
                    <RefreshCw className={`w-4 h-4 ${loadingAnalytics ? "animate-spin text-purple-400" : ""}`} />
                  </button>
                  <Link
                    href="/project"
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-2
                    ${
                      dark
                        ? "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-sm"
                    }`}
                  >
                    <Layers className="w-4 h-4" /> Live Site
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>

              {/* 4 Analytics Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Card 1: Total Visits */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    dark
                      ? "border-white/10 bg-white/5 hover:border-cyan-500/30"
                      : "border-slate-200 bg-white shadow-sm hover:border-cyan-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-400">Total Visits</span>
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black tracking-tight">
                    {loadingAnalytics ? "..." : analytics?.stats?.totalVisits ?? 0}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>+{analytics?.stats?.todayVisits ?? 0} today</span>
                  </div>
                </div>

                {/* Card 2: Unique Visitors */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    dark
                      ? "border-white/10 bg-white/5 hover:border-blue-500/30"
                      : "border-slate-200 bg-white shadow-sm hover:border-blue-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-400">Unique Visitors</span>
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black tracking-tight">
                    {loadingAnalytics ? "..." : analytics?.stats?.uniqueVisitors ?? 0}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Distinct visitors tracked
                  </div>
                </div>

                {/* Card 3: Total Registered Users */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    dark
                      ? "border-white/10 bg-white/5 hover:border-purple-500/30"
                      : "border-slate-200 bg-white shadow-sm hover:border-purple-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-400">Registered Users</span>
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black tracking-tight">
                    {loadingAnalytics ? "..." : analytics?.stats?.totalUsers ?? 0}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Accounts in MongoDB
                  </div>
                </div>

                {/* Card 4: Logged-in Active Sessions */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    dark
                      ? "border-white/10 bg-white/5 hover:border-emerald-500/30"
                      : "border-slate-200 bg-white shadow-sm hover:border-emerald-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-400">Active Logins</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black tracking-tight text-emerald-500">
                    {loadingAnalytics ? "..." : analytics?.stats?.activeSessions ?? 0}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live sessions</span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs for Admin */}
              <div className="flex border-b border-slate-200/50 dark:border-slate-800/50 mb-8 gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setActiveAdminTab("overview")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300
                  ${
                    activeAdminTab === "overview"
                      ? dark
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : "bg-purple-600 text-white shadow"
                      : dark
                      ? "text-slate-400 hover:text-white hover:bg-white/5"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <FolderGit2 className="w-4 h-4" /> Projects Management ({projects.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveAdminTab("certifications")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300
                  ${
                    activeAdminTab === "certifications"
                      ? dark
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : "bg-purple-600 text-white shadow"
                      : dark
                      ? "text-slate-400 hover:text-white hover:bg-white/5"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Award className="w-4 h-4" /> Certifications & Awards ({certifications.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveAdminTab("users")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300
                  ${
                    activeAdminTab === "users"
                      ? dark
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : "bg-purple-600 text-white shadow"
                      : dark
                      ? "text-slate-400 hover:text-white hover:bg-white/5"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Users className="w-4 h-4" /> User Logins & Accounts ({analytics?.users?.length ?? 0})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveAdminTab("visits")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300
                  ${
                    activeAdminTab === "visits"
                      ? dark
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : "bg-purple-600 text-white shadow"
                      : dark
                      ? "text-slate-400 hover:text-white hover:bg-white/5"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Activity className="w-4 h-4" /> Visitor Activity Log
                </button>
              </div>

              {/* TAB 1: Projects Management */}
              {activeAdminTab === "overview" && (
                <>
                  {feedback.error && (
                    <div className="mb-6 p-4 rounded-2xl text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{feedback.error}</span>
                    </div>
                  )}
                  {feedback.success && (
                    <div className="mb-6 p-4 rounded-2xl text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>{feedback.success}</span>
                    </div>
                  )}

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Add Project Form */}
                    <div
                      className={`rounded-3xl border p-6 lg:p-7 shadow-xl h-fit backdrop-blur-xl
                      ${
                        dark
                          ? "border-white/10 bg-white/5"
                          : "border-slate-200 bg-white shadow-slate-200/50"
                      }`}
                    >
                      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-purple-500" /> Add New Project
                      </h2>

                      <form onSubmit={handleAddProject} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Project Title *
                          </label>
                          <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g. MediCare"
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Category *
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-slate-900 border-white/10 text-white"
                                : "bg-slate-50 border-slate-200 text-slate-900"
                            }`}
                          >
                            <option value="FULLSTACK">FULLSTACK</option>
                            <option value="FRONTEND">FRONTEND</option>
                            <option value="UI/UX">UI/UX</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Description *
                          </label>
                          <textarea
                            name="description"
                            rows={3}
                            required
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Short description of the project..."
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Tags (comma separated)
                          </label>
                          <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            placeholder="Next.js, MongoDB, Tailwind CSS"
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Live Demo URL
                          </label>
                          <input
                            type="url"
                            name="liveUrl"
                            value={formData.liveUrl}
                            onChange={handleInputChange}
                            placeholder="https://..."
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            GitHub Client URL
                          </label>
                          <input
                            type="url"
                            name="githubUrlClint"
                            value={formData.githubUrlClint}
                            onChange={handleInputChange}
                            placeholder="https://github.com/..."
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            GitHub Server URL
                          </label>
                          <input
                            type="url"
                            name="githubUrlServer"
                            value={formData.githubUrlServer}
                            onChange={handleInputChange}
                            placeholder="https://github.com/..."
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Image Path or URL
                          </label>
                          <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="/assest/Medicare.png or https://..."
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={actionLoading}
                          className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          {actionLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Plus className="w-4 h-4" /> Save to MongoDB
                            </>
                          )}
                        </button>
                      </form>
                    </div>

                    {/* Existing Projects List */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                        <div>
                          <h2 className="text-lg font-bold flex items-center gap-2">
                            <FolderGit2 className="w-5 h-5 text-purple-500" /> Projects Display Control
                          </h2>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Showing <span className="font-bold text-emerald-400">{projects.filter((p) => p.isVisible !== false).length}</span> of {projects.length} projects live on your website.
                          </p>
                        </div>

                        {/* Quick Presets */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-mono text-slate-400 mr-1 flex items-center gap-1">
                            <Sliders className="w-3 h-3 text-purple-400" /> Presets:
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSetLimit(3)}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-200 dark:border-white/10 hover:border-purple-400 hover:text-purple-400 transition-colors"
                            title="Display top 3 projects on website"
                          >
                            Top 3
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetLimit(4)}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-200 dark:border-white/10 hover:border-purple-400 hover:text-purple-400 transition-colors"
                            title="Display top 4 projects on website"
                          >
                            Top 4
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetLimit(6)}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-200 dark:border-white/10 hover:border-purple-400 hover:text-purple-400 transition-colors"
                            title="Display top 6 projects on website"
                          >
                            Top 6
                          </button>
                          <button
                            type="button"
                            onClick={handleShowAll}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                            title="Show all projects on website"
                          >
                            Show All
                          </button>
                        </div>
                      </div>

                      {loadingProjects ? (
                        <div className="flex items-center justify-center py-20">
                          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                        </div>
                      ) : projects.length === 0 ? (
                        <div
                          className={`p-10 rounded-3xl border text-center ${
                            dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
                          }`}
                        >
                          <p className="text-sm text-slate-400">
                            No projects found in MongoDB. Use the form to add one.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {projects.map((proj) => (
                            <div
                              key={proj._id}
                              className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all
                              ${
                                proj.isVisible === false
                                  ? dark
                                    ? "border-white/5 bg-white/[0.02] opacity-60"
                                    : "border-slate-100 bg-slate-50 opacity-60"
                                  : dark
                                  ? "border-white/10 bg-white/5 hover:border-purple-500/30"
                                  : "border-slate-200 bg-white hover:border-purple-300 shadow-sm"
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    {proj.category}
                                  </span>
                                  <h3 className="font-bold text-sm">{proj.title}</h3>
                                  {proj.isVisible === false && (
                                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-500/10 text-slate-400 border border-slate-500/20">
                                      Hidden
                                    </span>
                                  )}
                                </div>
                                <p
                                  className={`text-xs line-clamp-2 max-w-xl ${
                                    dark ? "text-slate-400" : "text-slate-600"
                                  }`}
                                >
                                  {proj.description}
                                </p>
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {proj.tags &&
                                    proj.tags.map((t) => (
                                      <span
                                        key={t}
                                        className={`text-[9px] px-2 py-0.5 rounded ${
                                          dark
                                            ? "bg-white/5 text-slate-400"
                                            : "bg-slate-100 text-slate-600"
                                        }`}
                                      >
                                        {t}
                                      </span>
                                    ))}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 flex-shrink-0">
                                {/* Toggle Visibility Button */}
                                <button
                                  type="button"
                                  onClick={() => handleToggleVisibility(proj._id, proj.isVisible !== false)}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                                    proj.isVisible !== false
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                                      : "bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20"
                                  }`}
                                  title={proj.isVisible !== false ? "Click to hide from website" : "Click to show on website"}
                                >
                                  {proj.isVisible !== false ? (
                                    <>
                                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                      <span className="text-[11px]">Live</span>
                                    </>
                                  ) : (
                                    <>
                                      <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                                      <span className="text-[11px]">Hidden</span>
                                    </>
                                  )}
                                </button>

                                {proj.liveUrl && (
                                  <a
                                    href={proj.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:text-purple-400 transition-colors"
                                    title="Live Demo"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProject(proj._id)}
                                  className="p-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors"
                                  title="Delete from MongoDB"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: Users & Logins */}
              {activeAdminTab === "users" && (
                <div
                  className={`rounded-3xl border overflow-hidden shadow-xl backdrop-blur-xl ${
                    dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white shadow-slate-200/50"
                  }`}
                >
                  <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-500" /> Registered Users & Login Accounts
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        All users registered via Google OAuth or Email in Better Auth & MongoDB.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Total: {analytics?.users?.length ?? 0}
                    </span>
                  </div>

                  {loadingAnalytics ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    </div>
                  ) : !analytics?.users || analytics.users.length === 0 ? (
                    <div className="p-10 text-center text-slate-400 text-sm">
                      No users registered yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className={`uppercase font-mono text-[11px] border-b ${
                          dark ? "bg-white/5 border-white/5 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}>
                          <tr>
                            <th className="py-3.5 px-6">User / Name</th>
                            <th className="py-3.5 px-6">Email Address</th>
                            <th className="py-3.5 px-6">Role</th>
                            <th className="py-3.5 px-6">Login Status</th>
                            <th className="py-3.5 px-6">Joined Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/40 dark:divide-white/5">
                          {analytics.users.map((u) => (
                            <tr
                              key={u.id}
                              className={`transition-colors ${
                                dark ? "hover:bg-white/5" : "hover:bg-slate-50"
                              }`}
                            >
                              <td className="py-4 px-6 font-semibold flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                                  {u.name?.[0]?.toUpperCase() || "U"}
                                </div>
                                <span>{u.name}</span>
                              </td>
                              <td className="py-4 px-6 text-slate-400 font-mono">
                                {u.email}
                              </td>
                              <td className="py-4 px-6">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border
                                  ${
                                    u.role === "admin"
                                      ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                  }`}
                                >
                                  {u.role}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`w-2 h-2 rounded-full ${
                                      u.isOnline
                                        ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                                        : "bg-slate-500"
                                    }`}
                                  />
                                  <span className={u.isOnline ? "text-emerald-400 font-medium" : "text-slate-400"}>
                                    {u.isOnline ? "Active Session" : "Offline"}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-slate-400 font-mono">
                                {u.createdAt
                                  ? new Date(u.createdAt).toLocaleDateString(undefined, {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : "N/A"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Visitor Activity Log */}
              {activeAdminTab === "visits" && (
                <div
                  className={`rounded-3xl border overflow-hidden shadow-xl backdrop-blur-xl ${
                    dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white shadow-slate-200/50"
                  }`}
                >
                  <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold flex items-center gap-2">
                        <Activity className="w-5 h-5 text-cyan-400" /> Recent Website Visitors Log
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Live traffic logs recorded directly in MongoDB.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Total Hits: {analytics?.stats?.totalVisits ?? 0}
                    </span>
                  </div>

                  {loadingAnalytics ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
                    </div>
                  ) : !analytics?.recentVisits || analytics.recentVisits.length === 0 ? (
                    <div className="p-10 text-center text-slate-400 text-sm">
                      No visits recorded yet. As visitors browse the site, activity will show here in real time.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className={`uppercase font-mono text-[11px] border-b ${
                          dark ? "bg-white/5 border-white/5 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}>
                          <tr>
                            <th className="py-3.5 px-6">Page Visited</th>
                            <th className="py-3.5 px-6">Visitor IP / Location</th>
                            <th className="py-3.5 px-6">Device / User Agent</th>
                            <th className="py-3.5 px-6">Visited Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/40 dark:divide-white/5">
                          {analytics.recentVisits.map((v) => (
                            <tr
                              key={v.id}
                              className={`transition-colors ${
                                dark ? "hover:bg-white/5" : "hover:bg-slate-50"
                              }`}
                            >
                              <td className="py-3.5 px-6 font-mono font-bold text-cyan-400">
                                {v.path || "/"}
                              </td>
                              <td className="py-3.5 px-6 font-mono text-slate-400">
                                {v.ip || "127.0.0.1"}
                              </td>
                              <td className="py-3.5 px-6 text-slate-400 max-w-xs truncate">
                                {v.userAgent}
                              </td>
                              <td className="py-3.5 px-6 font-mono text-slate-400">
                                {v.createdAt
                                  ? new Date(v.createdAt).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                    })
                                  : "Just now"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: Certifications & Awards Management */}
              {activeAdminTab === "certifications" && (
                <>
                  {feedback.error && (
                    <div className="mb-6 p-4 rounded-2xl text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{feedback.error}</span>
                    </div>
                  )}
                  {feedback.success && (
                    <div className="mb-6 p-4 rounded-2xl text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>{feedback.success}</span>
                    </div>
                  )}

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Add Certification Form */}
                    <div
                      className={`rounded-3xl border p-6 lg:p-7 shadow-xl h-fit backdrop-blur-xl
                      ${
                        dark
                          ? "border-white/10 bg-white/5"
                          : "border-slate-200 bg-white shadow-slate-200/50"
                      }`}
                    >
                      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-purple-500" /> Add Certification / Award
                      </h2>

                      <form onSubmit={handleAddCertification} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Title *
                          </label>
                          <input
                            type="text"
                            name="title"
                            required
                            value={certFormData.title}
                            onChange={handleCertInputChange}
                            placeholder="e.g. Complete Web Development"
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold mb-1">
                              Type *
                            </label>
                            <select
                              name="type"
                              value={certFormData.type}
                              onChange={handleCertInputChange}
                              className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                              ${
                                dark
                                  ? "bg-slate-900 border-white/10 text-white"
                                  : "bg-slate-50 border-slate-200 text-slate-900"
                              }`}
                            >
                              <option value="Certifications">Certifications</option>
                              <option value="Awards">Awards</option>
                              <option value="Competitions">Competitions</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold mb-1">
                              Category Tag
                            </label>
                            <input
                              type="text"
                              name="categoryTag"
                              value={certFormData.categoryTag}
                              onChange={handleCertInputChange}
                              placeholder="e.g. FULL STACK DEV"
                              className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                              ${
                                dark
                                  ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                              }`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold mb-1">
                              Issued By *
                            </label>
                            <input
                              type="text"
                              name="issuedBy"
                              required
                              value={certFormData.issuedBy}
                              onChange={handleCertInputChange}
                              placeholder="e.g. Programming Hero"
                              className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                              ${
                                dark
                                  ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold mb-1">
                              Date / Month
                            </label>
                            <input
                              type="text"
                              name="date"
                              value={certFormData.date}
                              onChange={handleCertInputChange}
                              placeholder="e.g. Aug 2026"
                              className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                              ${
                                dark
                                  ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Credential ID
                          </label>
                          <input
                            type="text"
                            name="credentialId"
                            value={certFormData.credentialId}
                            onChange={handleCertInputChange}
                            placeholder="e.g. WEB13-1552"
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Verification / Credential URL
                          </label>
                          <input
                            type="url"
                            name="credentialUrl"
                            value={certFormData.credentialUrl}
                            onChange={handleCertInputChange}
                            placeholder="https://..."
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Image Path or URL
                          </label>
                          <input
                            type="text"
                            name="image"
                            value={certFormData.image}
                            onChange={handleCertInputChange}
                            placeholder="/assest/ph-certificate.png"
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Description
                          </label>
                          <textarea
                            name="description"
                            rows={3}
                            value={certFormData.description}
                            onChange={handleCertInputChange}
                            placeholder="Brief description of the credential..."
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Skills (comma separated)
                          </label>
                          <input
                            type="text"
                            name="skills"
                            value={certFormData.skills}
                            onChange={handleCertInputChange}
                            placeholder="React.js, Next.js, Node.js, MongoDB"
                            className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none
                            ${
                              dark
                                ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
                            }`}
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id="certFeatured"
                            name="featured"
                            checked={certFormData.featured}
                            onChange={handleCertInputChange}
                            className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                          />
                          <label htmlFor="certFeatured" className="text-xs font-medium cursor-pointer">
                            Mark as Featured ★
                          </label>
                        </div>

                        <button
                          type="submit"
                          disabled={actionLoading}
                          className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          {actionLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Plus className="w-4 h-4" /> Save to MongoDB
                            </>
                          )}
                        </button>
                      </form>
                    </div>

                    {/* Existing Certifications List */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                          <Award className="w-5 h-5 text-purple-500" /> Current MongoDB Credentials ({certifications.length})
                        </h2>
                      </div>

                      {loadingCerts ? (
                        <div className="flex items-center justify-center py-20">
                          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                        </div>
                      ) : certifications.length === 0 ? (
                        <div
                          className={`p-10 rounded-3xl border text-center ${
                            dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
                          }`}
                        >
                          <p className="text-sm text-slate-400">
                            No certifications found in MongoDB. Use the form to add one.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {certifications.map((cert) => (
                            <div
                              key={cert._id}
                              className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all
                              ${
                                dark
                                  ? "border-white/10 bg-white/5 hover:border-purple-500/30"
                                  : "border-slate-200 bg-white hover:border-purple-300 shadow-sm"
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    {cert.type}
                                  </span>
                                  {cert.categoryTag && (
                                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                      {cert.categoryTag}
                                    </span>
                                  )}
                                  {cert.featured && (
                                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                      ★ Featured
                                    </span>
                                  )}
                                  <h3 className="font-bold text-sm">{cert.title}</h3>
                                </div>
                                <p
                                  className={`text-xs line-clamp-2 max-w-xl ${
                                    dark ? "text-slate-400" : "text-slate-600"
                                  }`}
                                >
                                  {cert.description}
                                </p>
                                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-3 pt-0.5">
                                  <span>Issued by: {cert.issuedBy}</span>
                                  {cert.date && <span>• {cert.date}</span>}
                                  {cert.credentialId && <span>• ID: {cert.credentialId}</span>}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 flex-shrink-0">
                                {cert.credentialUrl && (
                                  <a
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:text-purple-400 transition-colors"
                                    title="Verify Credential"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCertification(cert._id)}
                                  className="p-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors"
                                  title="Delete from MongoDB"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
