import { getCurrentlyReading, transformBook } from "@/services/Hardcover";
  import { defaultTheme } from "@/lib/default-theme";


export async function GET(
  request: Request
) {
  const { searchParams } =
    new URL(request.url);


const bg =
  searchParams.get("bg") ??
  defaultTheme.cardBg;

const border =
  searchParams.get("border") ??
  defaultTheme.border;

const heading =
  searchParams.get("heading") ??
  defaultTheme.heading;

const titleColor =
  searchParams.get("title") ??
  defaultTheme.title;

const authorColor =
  searchParams.get("author") ??
  defaultTheme.author;

const pagesColor =
  searchParams.get("pages") ??
  defaultTheme.pages;

const progressBar =
  searchParams.get("bar") ??
  defaultTheme.progressBar;

const progressTrack =
  searchParams.get("track") ??
  defaultTheme.progressTrack;

const percentageColor =
  searchParams.get("percent") ??
  defaultTheme.percentage;

const width =
  Number(
    searchParams.get("width")
  ) ||
  defaultTheme.cardWidth;

const height =
  Number(
    searchParams.get("height")
  ) ||
  defaultTheme.cardHeight;

const borderWidth =
  Number(
    searchParams.get("bw")
  ) ||
  defaultTheme.borderWidth;

const radius =
  Number(
    searchParams.get("radius")
  ) ||
  defaultTheme.borderRadius;
  const data =
    await getCurrentlyReading();

  const book =
    transformBook(data);

  if (!book) {
    return new Response(
      `
<svg
 xmlns="http://www.w3.org/2000/svg"
 width="${width}"
 height="${height}"
>
 <rect
  width="100%"
  height="100%"
  fill="${bg}"
  rx="${radius}"
 />

 <text
  x="50%"
  y="50%"
  text-anchor="middle"
  dominant-baseline="middle"
  fill="${titleColor}"
  font-size="24"
 >
  No book currently reading
 </text>
</svg>
`,
      {
        headers: {
          "Content-Type":
            "image/svg+xml",
        },
      }
    );
  }
let cover = "";

if (book.coverImage) {
  const response = await fetch(
    book.coverImage
  );

  const buffer =
    await response.arrayBuffer();

  const base64 = Buffer.from(
    buffer
  ).toString("base64");

  const contentType =
    response.headers.get(
      "content-type"
    ) || "image/jpeg";

  cover = `data:${contentType};base64,${base64}`;
}
  const padding = Math.max(
  20,
  width * 0.022
);

const coverHeight = Math.min(
  height - padding * 1.2,
  height * 0.88
);

const coverWidth =
  coverHeight * 0.72;

const coverX = padding;

const coverY =
  (height - coverHeight) / 2;

const contentX =
  coverX +
  coverWidth +
  padding * 0.5;

const contentWidth =
  width -
  contentX -
  padding;

const progressWidth =
  contentWidth;

const progressFillWidth =
  (progressWidth *
    book.percentage) /
  100;

const titleLines =
  splitTitle(book.title, 28);

const headingX = contentX;

const headingY =
  coverY + 20;

const titleY =
  headingY + 35;

const authorY =
  titleY +
  titleLines.length * 34 +
  8;

const progressY =
  coverY +
  coverHeight -
  20;

const updateLabelY =
  height - padding;

const updateDateX =
  width - padding;

const updateLabelX =
  updateDateX - 170;

const lastUpdated =
  new Date().toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
const svg = `
<svg
 xmlns="http://www.w3.org/2000/svg"
 width="${width}"
 height="${height}"
 viewBox="0 0 ${width} ${height}"
>

 <defs>
  <clipPath id="coverClip">
   <rect
    x="${coverX}"
    y="${coverY}"
    width="${coverWidth}"
    height="${coverHeight}"
    rx="12"
   />
  </clipPath>
 </defs>

 <rect
  width="${width}"
  height="${height}"
  fill="${bg}"
  rx="${radius}"
  stroke="${border}"
  stroke-width="${borderWidth}"
 />

 <text
  x="${headingX}"
  y="${headingY}"
  fill="${heading}"
  font-size="${Math.max(
    14,
    width * 0.016
  )}"
  font-weight="700"
  font-family="Arial"
 >
  CURRENTLY READING
 </text>

 ${
   cover
     ? `
 <image
  href="${cover}"
  x="${coverX}"
  y="${coverY}"
  width="${coverWidth}"
  height="${coverHeight}"
  clip-path="url(#coverClip)"
  preserveAspectRatio="xMidYMid slice"
 />
 `
     : ""
 }

 ${titleLines
   .map(
     (line, index) => `
 <text
  x="${contentX}"
  y="${titleY + index * 34}"
  fill="${titleColor}"
  font-size="${Math.max(
    18,
    width * 0.02
  )}"
  font-weight="700"
  font-family="Arial"
 >
  ${escapeXml(line).toUpperCase()}
 </text>
 `
   )
   .join("")}

 <text
  x="${contentX}"
  y="${authorY - 20}"
  fill="${authorColor}"
  font-size="10"
  font-family="Inter, sans-serif"
 >
  ${escapeXml(
    book.author
  ).toUpperCase()}
 </text>

 <text
  x="${contentX}"
  y="${progressY - 10}"
  fill="${pagesColor}"
  font-size="14"
  font-weight="600"
  font-family="Inter, sans-serif"
 >
  PAGE ${book.progress} / ${book.totalPages}
 </text>

 <text
  x="${contentX + progressWidth}"
  y="${progressY - 10}"
  text-anchor="end"
  fill="${percentageColor}"
  font-size="14"
  font-weight="700"
  font-family="Inter, sans-serif"
 >
  ${book.percentage}%
 </text>

 <rect
  x="${contentX}"
  y="${progressY + 2}"
  width="${progressWidth}"
  height="12"
  rx="6"
  fill="${progressTrack}"
 />

 <rect
  x="${contentX}"
  y="${progressY + 2}"
  width="${progressFillWidth}"
  height="12"
  rx="6"
  fill="${progressBar}"
 />

</svg>
`;

  return new Response(svg, {
    headers: {
      "Content-Type":
        "image/svg+xml",
      "Cache-Control":
        "public, s-maxage=21600, stale-while-revalidate=86400",
    },
  });
}

function splitTitle(
  title: string,
  maxLength = 28
) {
  const words =
    title.split(" ");

  const lines: string[] = [];

  let current = "";

  for (const word of words) {
    const next =
      current
        ? `${current} ${word}`
        : word;

    if (
      next.length >
      maxLength
    ) {
      if (current) {
        lines.push(current);
      }

      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 3);
}

function escapeXml(
  unsafe: string
) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}