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
  10,
  width * 0.022
);

const coverHeight = Math.min(
  height - padding * 1,
  height * 0.80
);

const coverWidth =
  coverHeight * 0.72;

const coverX = padding;

const coverY =
  (height - coverHeight) / 2;

const contentX =
  coverX +
  coverWidth +
  padding * 1;

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
  headingY + 23;

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
  y="${headingY - 5}  "
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
  y="${titleY + index *22}"
  fill="${titleColor}"
  font-size="${Math.max(
    18,
    width * 0.02
  )}"
  font-weight="700"
  font-family="Arial"
 >
  ${escapeXml(line).toWellFormed()}
 </text>
 `
   )
   .join("")}

 <text
  x="${contentX}"
  y="${authorY - 35}"
  fill="${authorColor}"
  font-weight="400"
  font-size="10"
  font-family="Arial"
 >
  ${escapeXml(
    book.author
  ).toWellFormed()}
 </text>


<!-- Divider line -->
<line
  x1="${contentX}"
  y1="${progressY - 45}"
  x2="${contentX + progressWidth}"
  y2="${progressY - 45}"
  stroke="${border}"
  stroke-width="1"
  opacity="0.6"
/>

 <text
  x="${contentX}"
  y="${progressY - 24}"
  fill="${pagesColor}"
  font-size="13"
  font-weight="500"
  font-family="Arial, sans-serif"
>
  ${book.progress}/${book.totalPages} Pages
 </text>

 <rect
  x="${contentX - 1}"
  y="${progressY - 10}"
  width="${progressWidth}"
  height="8"
  rx="4"
  fill="${progressTrack}"
 />



 <rect
  x="${contentX - 1}"
  y="${progressY - 10}"
  width="${progressFillWidth}"
  height="8"
  rx="4"
  fill="${progressBar}"
 />

 <text
  x="${contentX}"
  y="${progressY + 15}"
  fill="${pagesColor}"
  font-size="12"
  font-weight="500"
  font-family="Inter, Arial, sans-serif"
>
  Progress
 </text>

 <text
  x="${contentX + progressWidth}"
  y="${progressY + 15}"
  text-anchor="end"
  fill="${percentageColor}"
  font-size="12"
  font-weight="700"
  font-family="Inter, Arial, sans-serif"
>
  ${book.percentage}%
 </text>
 


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