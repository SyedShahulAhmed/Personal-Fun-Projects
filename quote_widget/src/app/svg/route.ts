function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (char) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&apos;",
    };

    return entities[char];
  });
}

function safeColor(value: string | null, fallback: string): string {
  return value && /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

function safeNumber(
  value: string | null,
  fallback: number,
  min: number,
  max: number,
): number {
  const number = Number(value);

  return Number.isFinite(number)
    ? Math.min(max, Math.max(min, Math.round(number)))
    : fallback;
}

type ApiQuote = {
  id: number;
  quote: string;
  author: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Refresh interval: 1–30 minutes.
  const refreshMinutes = safeNumber(searchParams.get("refresh"), 5, 1, 30);

  let quoteText = "A little wisdom, one quote at a time.";
  let authorText = "Quote Widget";

  try {
    const response = await fetch("https://dummyjson.com/quotes/random", {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`DummyJSON returned HTTP ${response.status}`);
    }

    const data: ApiQuote = await response.json();

    if (typeof data.quote === "string" && typeof data.author === "string") {
      quoteText = data.quote;
      authorText = data.author;
    }
  } catch (error) {
    console.error("Failed to fetch quote:", error);
  }
  const quote = escapeXml(quoteText.slice(0, 500));
  const author = escapeXml(authorText.slice(0, 100));

  // Customization settings.
  const bg = safeColor(searchParams.get("bg"), "#0f0d0d");
  const text = safeColor(searchParams.get("text"), "#FFFFFF");
  const accent = safeColor(searchParams.get("accent"), "#E6D5A8");
  const border = safeColor(searchParams.get("border"), "#302b2b");

  const width = safeNumber(searchParams.get("width"), 500, 280, 1200);
  const height = safeNumber(searchParams.get("height"), 300, 180, 800);
  const radius = safeNumber(searchParams.get("radius"), 20, 0, 60);

  const font =
    searchParams.get("font") === "sans"
      ? "Arial, Helvetica, sans-serif"
      : "Georgia, 'Times New Roman', serif";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="${width}"
         height="${height}"
         viewBox="0 0 ${width} ${height}">

      <rect
        width="100%"
        height="100%"
        rx="${radius}"
        fill="${bg}"
        stroke="${border}"
      />

      <text
        x="32"
        y="48"
        fill="${accent}"
        font-family="${font}"
        font-size="48"
      >“</text>

      <foreignObject
        x="32"
        y="65"
        width="${width - 64}"
        height="${height - 145}"
      >
        <div xmlns="http://www.w3.org/1999/xhtml"
             style="font-family:${font};font-size:24px;line-height:1.4;color:${text};overflow:hidden;overflow-wrap:break-word;">
          ${quote}
        </div>
      </foreignObject>

      <rect
        x="32"
        y="${height - 58}"
        width="28"
        height="2"
        fill="${accent}"
      />

      <text
        x="32"
        y="${height - 34}"
        fill="${accent}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="13"
      >${author}</text>

      <text
        x="${width - 24}"
        y="${height - 24}"
        text-anchor="end"
        fill="${text}"
        opacity="0.4"
        font-family="Arial, Helvetica, sans-serif"
        font-size="10"
      >QUOTE WIDGET</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
      "X-Content-Type-Options": "nosniff",
      "X-Refresh-Interval": String(refreshMinutes * 60),
    },
  });
}
