import WidgetPreview from "@/components/widget-preview";

import {
  getCurrentlyReading,
  transformBook,
} from "@/services/Hardcover";

import { ShieldCheck, LogOut } from "lucide-react";

export default async function Home() {
  const data = await getCurrentlyReading();
  const book = transformBook(data);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/6 blur-[120px]" />

      {/* Header */}
      <header className="relative border-b border-cyan-500/20 bg-[#080D1B]/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/8">
              <ShieldCheck
                className="h-6 w-6 text-[#00E5FF]"
                strokeWidth={1.5}
              />
            </div>

            <div>
              <h1 className="text-sm font-bold tracking-[0.15em] sm:text-base">
                HARDCOVER WIDGET
              </h1>

              <p className="mt-1 text-[10px] tracking-[0.2em] text-[#00E5FF] sm:text-xs">
                ADMIN DASHBOARD
              </p>
            </div>
          </div>

          {/* Logout */}
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/6 px-3 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-400/60 hover:bg-red-500/10 hover:text-red-300 sm:px-4"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </header>

      {/* Dashboard content */}
      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14">
        <div className="mb-8">
          <p className="text-xs font-medium tracking-[0.25em] text-[#00E5FF]">
            CONTROL CENTER
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Reading Widget
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Manage and preview your Hardcover reading widget.
          </p>
        </div>

        {book ? (
          <div className="rounded-2xl border border-cyan-500/20 bg-[#080D1B]/90 p-3 shadow-[0_0_50px_rgba(0,229,255,0.04)] sm:p-6">
            <WidgetPreview book={book} />
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-cyan-500/20 bg-[#080D1B]/90 px-6 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/6">
              <ShieldCheck className="h-7 w-7 text-[#00E5FF]" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              No Book Found
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              No book is currently marked as reading in your Hardcover account.
              Update your reading status to see your widget preview here.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800/80 px-5 py-5 text-center">
        <p className="text-xs text-slate-500">
          <span className="text-[#00E5FF]">●</span>{" "}
          Admin session active
          <span className="mx-2 text-slate-700">|</span>
          Hardcover Reading Widget
        </p>
      </footer>
    </main>
  );
}