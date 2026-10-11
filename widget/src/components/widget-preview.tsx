"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  Palette,
  Eye,
  Download,
  Copy,
  ExternalLink,
  Check,
  Code2,
} from "lucide-react";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { defaultTheme } from "@/lib/default-theme";

import ReadingCard from "./reading-card";
import ThemeCustomizer from "./theme-customizer";

export default function WidgetPreview({
  book,
}: {
  book: Record<string, unknown>;
}) {
  const [theme, setTheme] = useLocalStorage(
    "reading-widget-theme",
    defaultTheme
  );

  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const exportPNG = async () => {
    if (!cardRef.current || exporting) return;

    try {
      setExporting(true);

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const link = document.createElement("a");
      link.download = "hardcover-widget.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to export widget:", error);
    } finally {
      setExporting(false);
    }
  };

  const widgetUrl =
    `/api/widget?` +
    new URLSearchParams({
      bg: theme.cardBg,
      border: theme.border,
      heading: theme.heading,
      title: theme.title,
      author: theme.author,
      pages: theme.pages,
      bar: theme.progressBar,
      track: theme.progressTrack,
      percent: theme.percentage,
      width: String(theme.cardWidth),
      height: String(theme.cardHeight),
      bw: String(theme.borderWidth),
      radius: String(theme.borderRadius),
    }).toString();

  const fullWidgetUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${widgetUrl}`
      : widgetUrl;

  const copyWidgetUrl = async () => {
    try {
      await navigator.clipboard.writeText(fullWidgetUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy widget URL.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      {/* Ambient cyan glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        {/* PAGE HEADER */}
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/8">
              <Palette
                className="h-6 w-6 text-[#00E5FF]"
                strokeWidth={1.5}
              />
            </div>

            <div>
              <p className="text-[10px] font-medium tracking-[0.25em] text-[#00E5FF] sm:text-xs">
                CONTROL CENTER
              </p>

              <p className="mt-1 text-xs text-slate-500">
                HARDCOVER READING WIDGET
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Widget Builder
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Customize your reading widget, experiment with themes,
            preview changes instantly, and export or embed your design.
          </p>

          <div className="mt-6 h-px bg-linear-to-r from-cyan-400/40 via-cyan-400/10 to-transparent" />
        </header>

        {/* THEME SETTINGS */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#080D1B]/90 shadow-[0_0_40px_rgba(0,229,255,0.025)]">
          <div className="border-b border-slate-800/80 px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/6">
                <Palette className="h-5 w-5 text-[#00E5FF]" />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  Theme Settings
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Colors, dimensions, borders, and appearance.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-7">
            <ThemeCustomizer
              theme={theme}
              setTheme={setTheme}
            />
          </div>
        </section>

        {/* LIVE PREVIEW */}
        <section className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#080D1B]/90 shadow-[0_0_50px_rgba(0,229,255,0.035)]">
          <div className="border-b border-slate-800/80 px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/6">
                <Eye className="h-5 w-5 text-[#00E5FF]" />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  Live Preview
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Your widget updates as you customize the theme.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-7">
            {/* ACTION BUTTONS */}
            <div className="mb-6 flex flex-wrap gap-3">
              <button
                onClick={exportPNG}
                disabled={exporting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00E5FF] px-4 py-2.5 text-sm font-semibold text-[#050816] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Download className="h-4 w-4" />
                {exporting ? "Exporting..." : "Export PNG"}
              </button>

              <button
                onClick={copyWidgetUrl}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/4 px-4 py-2.5 text-sm font-medium text-cyan-300 transition hover:border-cyan-400/60 hover:bg-cyan-500/10"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy Widget URL"}
              </button>

              <a
                href={widgetUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-800"
              >
                <ExternalLink className="h-4 w-4" />
                Open Widget
              </a>
            </div>

            {/* WIDGET URL */}
            <div className="mb-8 rounded-xl border border-cyan-500/15 bg-[#050816] p-4">
              <div className="mb-3 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-[#00E5FF]" />

                <p className="text-[10px] font-medium tracking-[0.2em] text-slate-400">
                  EMBED URL
                </p>
              </div>

              <code className="block break-all text-xs leading-6 text-cyan-300 sm:text-sm">
                {fullWidgetUrl}
              </code>
            </div>

            {/* PREVIEW CANVAS */}
            <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-[#050816] p-4 sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-3">
                <p className="text-[10px] font-medium tracking-[0.2em] text-slate-500">
                  WIDGET CANVAS
                </p>

                <span className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-[10px] text-cyan-300">
                  LIVE
                </span>
              </div>

              <div className="flex min-w-max justify-center">
                <div ref={cardRef}>
                  <ReadingCard
                    book={book}
                    theme={theme}
                  />
                </div>
              </div>
            </div>

            {/* FOOTER NOTE */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]" />

              <p className="text-xs text-slate-500">
                Theme settings are saved locally in your browser.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-8 border-t border-slate-800/80 pt-5 text-center">
          <p className="text-xs text-slate-500">
            <span className="text-[#00E5FF]">✦</span>{" "}
            Hardcover Reading Widget
            <span className="mx-2 text-slate-700">|</span>
            Built for readers.
          </p>
        </footer>
      </div>
    </div>
  );
}