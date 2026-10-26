import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Quote Widget",
  description: "A simple quote widget built with Next.js and TypeScript",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
