"use client";

import { useState } from "react";
import {
  Palette,
  SlidersHorizontal,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";

import { defaultTheme } from "@/lib/default-theme";
import { WidgetTheme } from "@/types/theme";

interface Props {
  theme: WidgetTheme;
  setTheme: React.Dispatch<
    React.SetStateAction<WidgetTheme>
  >;
}

export default function ThemeCustomizer({
  theme,
  setTheme,
}: Props) {
  const [copied, setCopied] = useState(false);

  const updateColor = (
    key: keyof WidgetTheme,
    value: string
  ) => {
    setTheme((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const colorFields = [
    { key: "cardBg", label: "Card Background" },
    { key: "border", label: "Border" },
    { key: "heading", label: "Heading" },
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "pages", label: "Pages" },
    { key: "progressBar", label: "Progress Bar" },
    { key: "progressTrack", label: "Progress Track" },
    { key: "percentage", label: "Percentage" },
  ] as const;

  const copyTheme = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(theme, null, 2)
      );

      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy theme.");
    }
  };

  return (
    <div className="space-y-8">
      {/* COLORS */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/6]">
            <Palette className="h-4 w-4 text-[#00E5FF]" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Colors
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Customize every part of your widget.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {colorFields.map((field) => (
            <div
              key={field.key}
              className="rounded-xl border border-cyan-500/15 bg-[#050816] p-4 transition hover:border-cyan-500/35"
            >
              <label
                htmlFor={`color-${field.key}`}
                className="mb-3 block text-xs font-medium text-slate-300"
              >
                {field.label}
              </label>

              <div className="flex items-center gap-3">
                <input
                  id={`color-${field.key}`}
                  type="color"
                  value={theme[field.key]}
                  onChange={(e) =>
                    updateColor(field.key, e.target.value)
                  }
                  className="h-10 w-11 cursor-pointer rounded-lg border border-slate-700 bg-[#080D1B] p-1"
                />

                <input
                  type="text"
                  value={theme[field.key]}
                  onChange={(e) =>
                    updateColor(field.key, e.target.value)
                  }
                  aria-label={`${field.label} hex color`}
                  spellCheck={false}
                  className="h-10 min-w-0 flex-1 rounded-lg border border-slate-800 bg-[#080D1B] px-3 font-mono text-xs uppercase text-cyan-300 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LAYOUT */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/6">
            <SlidersHorizontal className="h-4 w-4 text-[#00E5FF]" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Layout & Dimensions
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Fine-tune the size and shape of your widget.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SliderField
            label="Width"
            value={theme.cardWidth}
            min={350}
            max={900}
            unit="px"
            onChange={(value) =>
              setTheme((prev) => ({
                ...prev,
                cardWidth: value,
              }))
            }
          />

          <SliderField
            label="Height"
            value={theme.cardHeight}
            min={180}
            max={1200}
            unit="px"
            onChange={(value) =>
              setTheme((prev) => ({
                ...prev,
                cardHeight: value,
              }))
            }
          />

          <SliderField
            label="Border Width"
            value={theme.borderWidth}
            min={0}
            max={10}
            unit="px"
            onChange={(value) =>
              setTheme((prev) => ({
                ...prev,
                borderWidth: value,
              }))
            }
          />

          <SliderField
            label="Corner Radius"
            value={theme.borderRadius}
            min={0}
            max={50}
            unit="px"
            onChange={(value) =>
              setTheme((prev) => ({
                ...prev,
                borderRadius: value,
              }))
            }
          />
        </div>
      </section>

      {/* ACTIONS */}
      <section className="flex flex-wrap items-center gap-3 border-t border-slate-800/80 pt-6">
        <button
          type="button"
          onClick={copyTheme}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/4 px-4 py-2.5 text-sm font-medium text-cyan-300 transition hover:border-cyan-400/60 hover:bg-cyan-500/10"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}

          {copied ? "Copied!" : "Copy Theme JSON"}
        </button>

        <button
          type="button"
          onClick={() => setTheme(defaultTheme)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/25 bg-red-500/4 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-400/50 hover:bg-red-500/10"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Theme
        </button>

        <p className="text-xs text-slate-500">
          Changes apply instantly to the preview.
        </p>
      </section>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-xl border border-cyan-500/15 bg-[#050816] p-4 transition hover:border-cyan-500/35">
      <div className="mb-4 flex items-start justify-between gap-2">
        <label className="text-xs font-medium text-slate-300">
          {label}
        </label>

        <span className="rounded-md border border-cyan-500/20 bg-cyan-500/6 px-2 py-1 font-mono text-xs text-cyan-300">
          {value}
          {unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        aria-label={label}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-[#00E5FF]"
        style={{
          accentColor: "#00E5FF",
        }}
      />

      <div className="mt-2 flex justify-between text-[10px] text-slate-600">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}