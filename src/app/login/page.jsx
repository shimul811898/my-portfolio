"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import toast from "@/lib/toast";
import {
  ShieldCheck,
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export default function LoginPage() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();

  const [activeTab, setActiveTab] = useState("client"); // "client" | "admin"
  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    toast.info("Connecting to Google...", "Redirecting to Google secure authentication");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: activeTab === "admin" ? "/admin" : "/",
      });
    } catch (err) {
      const errMsg = err?.message || "Google sign in failed";
      setError(errMsg);
      toast.error("Google sign in failed", errMsg);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (activeTab === "client" && isSignUp) {
        const { error: signUpError } = await authClient.signUp.email({
          email,
          password,
          name,
          callbackURL: "/",
        });

        if (signUpError) {
          const errMsg = signUpError.message || "Failed to create account";
          setError(errMsg);
          toast.error("Sign up failed", errMsg);
        } else {
          const successMsg = "Account created successfully! Redirecting...";
          setMessage(successMsg);
          toast.success("Account Created!", "Welcome to Shimul's Portfolio");
          setTimeout(() => router.push("/"), 1500);
        }
      } else {
        const { error: signInError } = await authClient.signIn.email({
          email,
          password,
          callbackURL: activeTab === "admin" ? "/admin" : "/",
        });

        if (signInError) {
          const errMsg = signInError.message || "Invalid email or password";
          setError(errMsg);
          toast.error("Sign in failed", errMsg);
        } else {
          const successMsg = activeTab === "admin" ? "Admin Access Granted! Redirecting to Dashboard..." : "Logged in successfully! Redirecting...";
          setMessage(successMsg);
          toast.success(activeTab === "admin" ? "Admin Authenticated" : "Welcome back!", successMsg);
          setTimeout(() => {
            router.push(activeTab === "admin" ? "/admin" : "/");
          }, 1000);
        }
      }
    } catch (err) {
      const errMsg = err?.message || "Authentication failed";
      setError(errMsg);
      toast.error("Error", errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    await authClient.signOut();
    toast.info("Logged Out", "You have been logged out successfully");
    setLoading(false);
  };

  return (
    <>
      <Header />
      <ThemeToggle />

      <div
        className={`min-h-screen pt-28 pb-16 flex items-center justify-center px-4 font-sans transition-colors duration-500
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
            <div className="fixed top-20 right-1/4 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-blue-500/5 blur-[120px]" />
            <div className="fixed bottom-20 left-1/4 w-[400px] h-[400px] pointer-events-none z-0 rounded-full bg-cyan-500/5 blur-[120px]" />
          </>
        )}

        <div className="w-full max-w-md relative z-10">
          {session ? (
            <div
              className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 text-center
              ${
                dark
                  ? "border-white/10 bg-white/5 shadow-black/50"
                  : "border-slate-200 bg-white shadow-slate-200/50"
              }`}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg shadow-cyan-500/20">
                {session.user?.name?.[0]?.toUpperCase() || "U"}
              </div>

              <h2 className="text-2xl font-bold mb-1">
                Welcome, {session.user?.name || "User"}!
              </h2>
              <p
                className={`text-sm mb-2 ${
                  dark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {session.user?.email}
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-6 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Role: {session.user?.role || "Client"}
              </div>

              <div className="flex flex-col gap-3">
                {session.user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" /> Go to Admin Dashboard
                  </Link>
                )}

                <Link
                  href="/"
                  className={`w-full py-3 rounded-xl font-semibold text-sm border transition-colors flex items-center justify-center gap-2
                  ${
                    dark
                      ? "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  Return to Portfolio
                </Link>

                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-sm border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl transition-all duration-300
              ${
                dark
                  ? "border-white/10 bg-white/5 shadow-black/50"
                  : "border-slate-200 bg-white shadow-slate-200/50"
              }`}
            >
              {/* Header Switcher */}
              <div className="flex p-1 rounded-2xl bg-slate-200/40 dark:bg-slate-900/60 mb-6 border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("client");
                    setError("");
                    setMessage("");
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300
                  ${
                    activeTab === "client"
                      ? dark
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                        : "bg-white text-blue-600 shadow-sm"
                      : dark
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <User className="w-4 h-4" /> Client Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("admin");
                    setIsSignUp(false);
                    setError("");
                    setMessage("");
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300
                  ${
                    activeTab === "admin"
                      ? dark
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                        : "bg-white text-purple-600 shadow-sm"
                      : dark
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" /> Admin Login
                </button>
              </div>

              <div className="text-center mb-6">
                <h1 className="text-2xl font-black tracking-tight">
                  {activeTab === "admin"
                    ? "Admin Portal"
                    : isSignUp
                    ? "Create Account"
                    : "Client Sign In"}
                </h1>
                <p
                  className={`text-xs mt-1.5 ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {activeTab === "admin"
                    ? "Authorized administrator access to portfolio controls"
                    : isSignUp
                    ? "Sign up to access client features and interact"
                    : "Sign in with Google or your client credentials"}
                </p>
              </div>

              {/* Feedback messages */}
              {error && (
                <div className="mb-5 p-3.5 rounded-xl text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {message && (
                <div className="mb-5 p-3.5 rounded-xl text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-sm border flex items-center justify-center gap-3 transition-all duration-300 mb-6 hover:shadow-lg
                ${
                  dark
                    ? "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-sm"
                }`}
              >
                <GoogleIcon className="w-5 h-5" />
                <span>
                  {activeTab === "admin"
                    ? "Sign in with Admin Google"
                    : "Continue with Google"}
                </span>
              </button>

              <div className="relative flex items-center justify-center mb-6">
                <div
                  className={`w-full border-t ${
                    dark ? "border-white/10" : "border-slate-200"
                  }`}
                />
                <span
                  className={`absolute px-3 text-[11px] font-mono uppercase tracking-wider ${
                    dark
                      ? "bg-[#0c1322] text-slate-400"
                      : "bg-white text-slate-500"
                  }`}
                >
                  Or with email
                </span>
              </div>

              {/* Email / Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === "client" && isSignUp && (
                  <div>
                    <label
                      className={`block text-xs font-semibold mb-1.5 ${
                        dark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all
                        ${
                          dark
                            ? "bg-white/5 border-white/10 text-white focus:border-cyan-400"
                            : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600"
                        }`}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    className={`block text-xs font-semibold mb-1.5 ${
                      dark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={
                        activeTab === "admin"
                          ? "admin@portfolio.com"
                          : "client@example.com"
                      }
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all
                      ${
                        dark
                          ? "bg-white/5 border-white/10 text-white focus:border-cyan-400"
                          : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs font-semibold mb-1.5 ${
                      dark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all
                      ${
                        dark
                          ? "bg-white/5 border-white/10 text-white focus:border-cyan-400"
                          : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600"
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg mt-6
                  ${
                    activeTab === "admin"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-95 shadow-purple-500/20"
                      : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-95 shadow-blue-500/20"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>
                        {activeTab === "admin"
                          ? "Access Admin Portal"
                          : isSignUp
                          ? "Create Client Account"
                          : "Sign In as Client"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {activeTab === "client" && (
                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setError("");
                      setMessage("");
                    }}
                    className={`text-xs font-medium hover:underline transition-colors
                    ${dark ? "text-cyan-400" : "text-blue-600"}`}
                  >
                    {isSignUp
                      ? "Already have an account? Sign In"
                      : "Don't have an account? Create one"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
