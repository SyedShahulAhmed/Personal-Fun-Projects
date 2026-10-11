import Image from "next/image";
import { BookOpen, UserRound } from "lucide-react";
import { WidgetTheme } from "@/types/theme";

interface Props {
  book: any;
  theme: WidgetTheme;
}

export default function ReadingCard({ book, theme }: Props) {
  const percentage = Math.min(
    100,
    Math.max(0, Number(book.percentage) || 0)
  );

  return (
    <div
      className="relative box-border overflow-hidden p-5 text-white shadow-[0_0_35px_rgba(0,229,255,0.04)]"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        borderStyle: "solid",
        width: `${theme.cardWidth}px`,
        height: `${theme.cardHeight}px`,
        borderWidth: `${theme.borderWidth}px`,
        borderRadius: `${theme.borderRadius}px`,
      }}
    >
      {/* Subtle cyan glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full blur-[70px]"
        style={{
          backgroundColor: theme.heading,
          opacity: 0.08,
        }}
      />

      {/* Heading */}
      <div className="relative mb-4 flex items-center gap-2">
        <BookOpen
          className="h-4 w-4 shrink-0"
          style={{ color: theme.heading }}
          strokeWidth={1.7}
        />

        <p
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: theme.heading }}
        >
          Currently Reading
        </p>

        <span
          className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full"
          style={{
            backgroundColor: theme.heading,
            boxShadow: `0 0 8px ${theme.heading}`,
          }}
        />
      </div>

      {/* Book details */}
      <div className="relative flex min-h-0 gap-4">
        {/* Cover */}
        <div className="relative h-45 w-30 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20 shadow-lg">
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={book.title || "Book cover"}
              width={120}
              height={180}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-3 text-center">
              <BookOpen
                className="h-7 w-7"
                style={{ color: theme.heading }}
              />
              <span className="text-[10px] text-slate-500">
                No cover available
              </span>
            </div>
          )}
        </div>

        {/* Information */}
        <div className="flex min-w-0 flex-1 flex-col">
          <h2
            className="line-clamp-3 wrap-break-word text-lg font-bold leading-snug sm:text-xl"
            style={{ color: theme.title }}
            title={book.title}
          >
            {book.title}
          </h2>

          <div className="mt-2 flex min-w-0 items-center gap-1.5">
            <UserRound
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: theme.author }}
            />

            <p
              className="truncate text-sm"
              style={{ color: theme.author }}
              title={book.author}
            >
              {book.author}
            </p>
          </div>

          {/* Reading progress */}
          <div className="mt-auto pt-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span
                className="text-[10px] font-medium uppercase tracking-[0.15em]"
                style={{ color: theme.pages }}
              >
                Reading Progress
              </span>

              <span
                className="shrink-0 font-mono text-xs font-semibold"
                style={{ color: theme.percentage }}
              >
                {percentage}%
              </span>
            </div>

            <div
              className="h-1.5 w-full overflow-hidden rounded-full"
              style={{
                backgroundColor: theme.progressTrack,
              }}
              role="progressbar"
              aria-label="Reading progress"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: theme.progressBar,
                  boxShadow: `0 0 10px ${theme.progressBar}55`,
                }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <span
                className="truncate text-xs"
                style={{ color: theme.pages }}
              >
                {book.progress} / {book.totalPages} pages
              </span>

              <span
                className="shrink-0 text-[10px] uppercase tracking-wider"
                style={{ color: theme.author }}
              >
                {percentage >= 100 ? "Completed" : "In Progress"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}