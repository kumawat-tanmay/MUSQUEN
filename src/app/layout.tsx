import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Musquen Media | Scale, Strategy & Web",
  description:
    "Musquen Media is a premier digital agency specializing in Meta Ads, Social Media Marketing, and High-Performance Web Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-black text-[#f2ede6]"
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
