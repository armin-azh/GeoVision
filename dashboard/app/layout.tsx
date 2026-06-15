import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

import { TooltipProvider } from "@/components/ui/tooltip"

// Components
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GeoVision",
  description: "Real-time IoT GIS Monitoring Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased bg-background dark",
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-full">
        <TooltipProvider>
          <Navbar/>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}