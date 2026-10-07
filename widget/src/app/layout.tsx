import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Hardcover Widget",
  description: "A widget for the Hardcover app.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
