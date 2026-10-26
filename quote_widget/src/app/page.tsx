"use client";

import { useEffect, useState } from "react";

type Settings = {
  bg: string;
  text: string;
  accent: string;
  border: string;
  width: number;
  height: number;
  radius: number;
  font: "serif" | "sans";
  refreshMinutes: number;
};

const defaults: Settings = {
  bg: "#0f0d0d",
  text: "#FFFFFF",
  accent: "#E6D5A8",
  border: "#302b2b",
  width: 500,
  height: 300,
  radius: 20,
  font: "serif",
  refreshMinutes: 5,
};

// Static preview content. No API calls are made on this page.
const SAMPLE_QUOTE = {
  quote: "Great things are done by a series of small things brought together.",
  author: "Vincent van Gogh",
};

export default function Home() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [copied, setCopied] = useState(false);
  const [inputError, setInputError] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // Only customization settings are included in the SVG URL.
  const params = new URLSearchParams({
    bg: settings.bg,
    text: settings.text,
    accent: settings.accent,
    border: settings.border,
    width: String(settings.width),
    height: String(settings.height),
    radius: String(settings.radius),
    font: settings.font,
    refresh: String(settings.refreshMinutes),
  });

  const svgUrl = `/live?${params.toString()}`;
  const absoluteSvgUrl = origin ? `${origin}${svgUrl}` : svgUrl;

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setInputError("");
  }

  async function copySvgUrl() {
    try {
      await navigator.clipboard.writeText(absoluteSvgUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setInputError(
        "Unable to copy automatically. Please copy the SVG URL displayed below.",
      );
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-white/10 bg-[#0f0d0d] px-3 py-2 text-sm text-white outline-none focus:border-amber-200/70";

  const fontFamily =
    settings.font === "serif"
      ? "Georgia, 'Times New Roman', serif"
      : "Arial, Helvetica, sans-serif";

  return (
    <main className="min-h-screen bg-[#0b0b0d] text-white">
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Quote<span className="text-amber-200">Widget</span>
            </h1>

            <p className="mt-1 text-xs text-neutral-500">
              Create your own embeddable quote card.
            </p>
          </div>

          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-400">
            SVG Builder
          </span>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 p-6 lg:grid-cols-[1fr_340px]">
        {/* Static Customization Preview */}
        <section className="min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-medium">Live Preview</h2>

              <p className="mt-1 text-xs text-neutral-500">
                Customize the appearance without making API requests.
              </p>
            </div>

            <button
              onClick={() => {
                setSettings(defaults);
                setInputError("");
              }}
              className="text-sm text-neutral-400 transition hover:text-white"
            >
              Reset settings
            </button>
          </div>

          <div className="flex min-h-95 items-center justify-center overflow-auto rounded-2xl border border-white/10 bg-[#111113] p-5 sm:p-8">
            <div
              className="box-border flex max-w-full flex-col justify-center overflow-hidden border p-7 sm:p-9"
              style={{
                width: settings.width,
                height: settings.height,
                borderRadius: settings.radius,
                backgroundColor: settings.bg,
                borderColor: settings.border,
                color: settings.text,
                fontFamily,
              }}
            >
              <div
                className="mb-5 h-1 w-12 shrink-0 rounded-full"
                style={{ backgroundColor: settings.accent }}
              />

              <p
                className="overflow-hidden text-base leading-relaxed sm:text-lg"
                style={{
                  color: settings.text,
                  overflowWrap: "anywhere",
                }}
              >
                “{SAMPLE_QUOTE.quote}”
              </p>

              <div
                className="mt-5 flex items-center gap-3 text-xs"
                style={{ color: settings.accent }}
              >
                <span
                  className="h-px w-6 shrink-0"
                  style={{ backgroundColor: settings.accent }}
                />

                <span className="truncate">{SAMPLE_QUOTE.author}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={copySvgUrl}
              className="rounded-xl bg-amber-200 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-100"
            >
              Copy SVG URL
            </button>

            <button
              onClick={() =>
                window.open(absoluteSvgUrl, "_blank", "noopener,noreferrer")
              }
              className="rounded-xl border border-white/10 px-5 py-3 text-sm transition hover:bg-white/5"
            >
              Open Live SVG
            </button>
          </div>

          {inputError && (
            <p role="alert" className="mt-3 text-sm text-red-400">
              {inputError}
            </p>
          )}

          <div className="mt-6 rounded-xl border border-white/10 bg-[#111113] p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
              Generated SVG URL
            </p>

            <code className="block break-all text-xs leading-relaxed text-amber-100/80">
              {absoluteSvgUrl}
            </code>

            <p className="mt-3 text-xs text-neutral-500">
              The URL contains customization settings only. The SVG endpoint
              fetches the live quote and author independently.
            </p>
          </div>
        </section>

        {/* Customization Panel */}
        <aside className="h-fit rounded-2xl border border-white/10 bg-[#111113] p-5">
          <div className="mb-6">
            <h2 className="font-medium">Customize Widget</h2>

            <p className="mt-1 text-xs text-neutral-500">
              Adjust the appearance and SVG refresh interval.
            </p>
          </div>

          <div className="space-y-6">
            {/* Colors */}
            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Colors
              </h3>

              {(
                [
                  ["bg", "Background"],
                  ["text", "Quote text"],
                  ["accent", "Accent"],
                  ["border", "Border"],
                ] as const
              ).map(([key, label]) => (
                <label
                  key={key}
                  className="mb-3 flex items-center justify-between gap-3 text-sm"
                >
                  <span>{label}</span>

                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings[key]}
                      onChange={(event) => update(key, event.target.value)}
                      aria-label={`${label} color`}
                      className="h-9 w-10 cursor-pointer rounded border-0 bg-transparent"
                    />

                    <input
                      value={settings[key]}
                      onChange={(event) => update(key, event.target.value)}
                      aria-label={`${label} hex code`}
                      className="w-24 rounded-md border border-white/10 bg-[#0b0b0d] px-2 py-2 font-mono text-xs uppercase"
                    />
                  </div>
                </label>
              ))}
            </section>

            {/* Refresh Interval */}
            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                SVG Auto Refresh
              </h3>

              <label className="block text-sm">
                <span className="flex justify-between">
                  <span>Refresh interval</span>

                  <span className="text-amber-200">
                    {settings.refreshMinutes} min
                  </span>
                </span>

                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={settings.refreshMinutes}
                  onChange={(event) =>
                    update("refreshMinutes", Number(event.target.value))
                  }
                  className="mt-3 w-full accent-amber-200"
                />

                <span className="mt-1 flex justify-between text-xs text-neutral-500">
                  <span>1 minute</span>
                  <span>30 minutes</span>
                </span>

                <span className="mt-2 block text-xs leading-relaxed text-neutral-500">
                  This setting is passed to the SVG endpoint. The customization
                  preview itself does not fetch or refresh quotes.
                </span>
              </label>
            </section>

            {/* Typography */}
            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Typography
              </h3>

              <label className="block text-sm">
                Font family
                <select
                  value={settings.font}
                  onChange={(event) =>
                    update("font", event.target.value as Settings["font"])
                  }
                  className={inputClass}
                >
                  <option value="serif">Elegant Serif</option>
                  <option value="sans">Modern Sans</option>
                </select>
              </label>
            </section>

            {/* Dimensions */}
            <section>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Dimensions
              </h3>

              {(
                [
                  ["width", "Width", 280, 1200, "px"],
                  ["height", "Height", 180, 800, "px"],
                  ["radius", "Border radius", 0, 60, "px"],
                ] as const
              ).map(([key, label, min, max, unit]) => (
                <label key={key} className="mb-5 block text-sm">
                  <span className="flex justify-between">
                    <span>{label}</span>

                    <span className="text-neutral-400">
                      {settings[key]} {unit}
                    </span>
                  </span>

                  <input
                    type="range"
                    min={min}
                    max={max}
                    value={settings[key]}
                    onChange={(event) =>
                      update(key, Number(event.target.value))
                    }
                    className="mt-3 w-full accent-amber-200"
                  />
                </label>
              ))}
            </section>

            <button
              onClick={copySvgUrl}
              className="w-full rounded-xl bg-amber-200 px-4 py-3 text-sm font-semibold text-black transition hover:bg-amber-100"
            >
              {copied ? "SVG URL Copied!" : "Export SVG URL"}
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
