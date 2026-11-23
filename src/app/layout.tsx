import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Lumen Digestive Care — Design Concept",
    template: "%s · Lumen Digestive Care",
  },
  description:
    "A next-generation website concept for a gastroenterology & liver clinic. Demo content only.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${serif.variable} antialiased`}>
      <body className="min-h-full">
        <div className="overflow-x-clip">
          {/* Demo ribbon so nobody mistakes this for a live site */}
          <div className="fixed inset-x-0 top-0 z-[60] flex h-8 items-center justify-center bg-coral px-4 text-center text-xs font-medium text-ink print:hidden">
            <span className="sm:hidden">Design concept · Placeholder content</span>
            <span className="hidden sm:inline">
              Design concept preview · All names, figures &amp; reviews are placeholders
            </span>
          </div>
          <Nav />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          <RevealObserver />
        </div>
      </body>
    </html>
  );
}
