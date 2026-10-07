"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { defaultTheme } from "@/lib/default-theme";

import ReadingCard from "./reading-card";
import ThemeCustomizer from "./theme-customizer";

export default function WidgetPreview({
  book,
}: {
  book: Record<string, unknown>;
}) {
  const [theme, setTheme] =
    useLocalStorage(
      "reading-widget-theme",
      defaultTheme
    );

  const cardRef =
    useRef<HTMLDivElement>(null);

  const exportPNG = async () => {
    if (!cardRef.current) return;

    const dataUrl = await toPng(
      cardRef.current,
      {
        cacheBust: true,
        pixelRatio: 3,
      }
    );

    const link =
      document.createElement("a");

    link.download =
      "hardcover-widget.png";

    link.href = dataUrl;

    link.click();
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

  return (
    <div className="min-h-screen bg-[#09090B]">
      <div className="mx-auto max-w-7xl p-8">
        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">
            Hardcover Widget Builder
          </h1>

          <p className="mt-2 text-zinc-400">
            Create, customize, export,
            and embed your reading
            widget.
          </p>
        </div>

        {/* THEME SETTINGS */}

        <section
          className="
            mb-10
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-950
            p-6
          "
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Theme Settings
            </h2>

            <p className="text-sm text-zinc-500">
              Customize colors, sizing,
              borders and layout.
            </p>
          </div>

          <ThemeCustomizer
            theme={theme}
            setTheme={setTheme}
          />
        </section>

        {/* LIVE PREVIEW */}

        <section
          className="
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-950
            p-8
          "
        >
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white">
              Live Preview
            </h2>

            <p className="text-sm text-zinc-500">
              This card updates instantly
              as you customize it.
            </p>
          </div>

          {/* ACTIONS */}

          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={exportPNG}
              className="
                rounded-xl
                bg-cyan-500
                px-5
                py-2.5
                font-medium
                text-black
                transition
                hover:opacity-90
              "
            >
              Export PNG
            </button>

            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  fullWidgetUrl
                )
              }
              className="
                rounded-xl
                border
                border-cyan-500/30
                px-5
                py-2.5
                text-cyan-400
                transition
                hover:bg-cyan-500/10
              "
            >
              Copy Widget URL
            </button>

            <a
              href={widgetUrl}
              target="_blank"
              rel="noreferrer"
              className="
                rounded-xl
                border
                border-zinc-700
                px-5
                py-2.5
                text-zinc-300
                transition
                hover:bg-zinc-900
              "
            >
              Open Widget
            </a>
          </div>

          {/* URL PREVIEW */}

          <div
            className="
              mb-10
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              p-4
            "
          >
            <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
              Widget URL
            </p>

            <code
              className="
                block
                break-all
                text-sm
                text-cyan-400
              "
            >
              {fullWidgetUrl}
            </code>
          </div>

          {/* CARD */}

          <div className="flex justify-center">
            <div ref={cardRef}>
              <ReadingCard
                book={book}
                theme={theme}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}