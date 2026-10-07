"use client";

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
    { key: "cardBg", label: "Card" },
    { key: "border", label: "Border" },
    { key: "heading", label: "Heading" },
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "pages", label: "Pages" },
    { key: "progressBar", label: "Bar" },
    { key: "progressTrack", label: "Track" },
    { key: "percentage", label: "%" },
  ];

  return (
    <div className="space-y-6">
      {/* Colors */}

      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">
          Colors
        </h3>

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            gap-3
          "
        >
          {colorFields.map((field) => (
            <div
              key={field.key}
              className="
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900
                p-3
              "
            >
              <p className="mb-2 text-xs text-zinc-400">
                {field.label}
              </p>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={
                    theme[
                      field.key as keyof WidgetTheme
                    ] as string
                  }
                  onChange={(e) =>
                    updateColor(
                      field.key as keyof WidgetTheme,
                      e.target.value
                    )
                  }
                  className="h-10 w-10 cursor-pointer"
                />

                <span className="text-xs text-zinc-500">
                  {
                    theme[
                      field.key as keyof WidgetTheme
                    ] as string
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout */}

      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">
          Layout
        </h3>

        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-4
          "
        >
          <SliderField
            label="Width"
            value={theme.cardWidth}
            min={350}
            max={900}
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
            onChange={(value) =>
              setTheme((prev) => ({
                ...prev,
                cardHeight: value,
              }))
            }
          />

          <SliderField
            label="Border"
            value={theme.borderWidth}
            min={0}
            max={10}
            onChange={(value) =>
              setTheme((prev) => ({
                ...prev,
                borderWidth: value,
              }))
            }
          />

          <SliderField
            label="Radius"
            value={theme.borderRadius}
            min={0}
            max={50}
            onChange={(value) =>
              setTheme((prev) => ({
                ...prev,
                borderRadius: value,
              }))
            }
          />
        </div>
      </div>

      {/* Actions */}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() =>
            navigator.clipboard.writeText(
              JSON.stringify(theme, null, 2)
            )
          }
          className="
            rounded-xl
            border
            border-zinc-700
            px-5
            py-2
            text-sm
            text-zinc-300
            hover:bg-zinc-900
          "
        >
          Copy Theme
        </button>

        <button
          onClick={() =>
            setTheme(defaultTheme)
          }
          className="
            rounded-xl
            border
            border-red-500/30
            px-5
            py-2
            text-sm
            text-red-400
            hover:bg-red-500/10
          "
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900
        p-4
      "
    >
      <div className="mb-2 flex justify-between">
        <span className="text-sm text-zinc-300">
          {label}
        </span>

        <span className="text-sm text-zinc-500">
          {value}
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
        className="w-full"
      />
    </div>
  );
}