import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random", {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch quote",
        },
        { status: 502 },
      );
    }

    const quote = await response.json();

    return NextResponse.json({
      success: true,
      data: {
        id: quote.id,
        quote: quote.quote,
        author: quote.author,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve a quote. Please try again.",
      },
      { status: 500 },
    );
  }
}
