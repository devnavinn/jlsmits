import type { Metadata } from "next";
import { Familjen_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothAnchors } from "@/components/smooth-anchors";

const grotesk = Familjen_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Content is edited in /admin, so pages read the database per request instead of at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "JLSmith Group — Building the Foundations of Tomorrow's Industries",
  description:
    "A diversified global group creating advanced materials, industrial solutions, and innovative businesses that power the future.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <SmoothAnchors />
        {children}
      </body>
    </html>
  );
}
