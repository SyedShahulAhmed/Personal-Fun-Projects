import Image from "next/image";
import { WidgetTheme } from "@/types/theme";

interface Props {
  book: any;
  theme: WidgetTheme;
}

export default function ReadingCard({ book, theme }: Props) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,

        width: `${theme.cardWidth}px`,

        height: `${theme.cardHeight}px`,
        borderWidth: `${theme.borderWidth}px`,
        borderRadius: `${theme.borderRadius}px`,
      }}
    >
      <p
        className="mb-4 text-sm font-medium uppercase"
        style={{
          color: theme.heading,
        }}
      >
        Currently Reading
      </p>

      <div className="flex gap-5">
        <Image
          src={book.coverImage}
          alt={book.title}
          width={120}
          height={180}
          className="
            h-[180px]
            w-[120px]
            rounded-lg
            object-cover
            flex-shrink-0
          "
        />

        <div className="flex flex-1 flex-col">
          <h2
            className="line-clamp-3 text-xl font-bold"
            style={{
              color: theme.title,
            }}
          >
            {book.title}
          </h2>

          <p
            className="mt-2 text-sm"
            style={{
              color: theme.author,
            }}
          >
            {book.author}
          </p>

          <div className="mt-auto pt-6">
            <div
              className="h-2 rounded-full"
              style={{
                backgroundColor: theme.progressTrack,
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${book.percentage}%`,
                  backgroundColor: theme.progressBar,
                }}
              />
            </div>

            <div className="mt-3 flex justify-between">
              <span
                style={{
                  color: theme.pages,
                }}
              >
                {book.progress} / {book.totalPages}
              </span>

              <span
                style={{
                  color: theme.percentage,
                }}
              >
                {book.percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
