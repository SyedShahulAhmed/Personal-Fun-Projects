"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.replace("/");
        router.refresh();
        return;
      } else {
        setError(data.error || "Invalid username or password.");
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 py-10 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.07] blur-[120px]" />

      <section className="relative w-full max-w-md">
        <div className="rounded-2xl border border-cyan-500/20 bg-[#080D1B]/95 p-7 shadow-[0_0_60px_rgba(0,229,255,0.06)] sm:p-9">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/8 shadow-[0_0_30px_rgba(0,229,255,0.10)]">
              <ShieldCheck
                className="h-8 w-8 text-[#00E5FF]"
                strokeWidth={1.5}
              />
            </div>

            <h1 className="text-2xl font-bold tracking-[0.18em]">
              ADMIN ACCESS
            </h1>

            <p className="mt-2 text-xs font-medium tracking-[0.2em] text-[#00E5FF]">
              HARDCOVER WIDGET
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Sign in to manage your reading widget.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-slate-300"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                className="h-12 w-full rounded-lg border border-slate-700/80 bg-[#050816] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00E5FF]/70 focus:ring-2 focus:ring-[#00E5FF]/10"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="h-12 w-full rounded-lg border border-slate-700/80 bg-[#050816] px-4 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00E5FF]/70 focus:ring-2 focus:ring-[#00E5FF]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-[#00E5FF]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-400"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#00E5FF] font-semibold text-[#050816] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LockKeyhole className="h-4 w-4" />
                  Sign In Securely
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-center gap-2 border-t border-slate-800 pt-5">
            <ShieldCheck className="h-4 w-4 text-slate-500" />

            <p className="text-xs text-slate-500">
              Authorized administrators only
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-600">
          Hardcover Reading Widget · Secure Portal
        </p>
      </section>
    </main>
  );
}
