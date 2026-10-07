import WidgetPreview from "@/components/widget-preview";

import {
  getCurrentlyReading,
  transformBook,
} from "@/services/Hardcover";

export default async function Home() {
  const data =
    await getCurrentlyReading();

  const book =
    transformBook(data);

  if (!book) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#09090B]
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950
            px-8
            py-6
            text-center
          "
        >
          <h1
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            No Book Found
          </h1>

          <p
            className="
              mt-2
              text-zinc-400
            "
          >
            No book is currently marked as
            reading in your Hardcover account.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#09090B]
      "
    >
      <WidgetPreview
        book={book}
      />
    </main>
  );
}