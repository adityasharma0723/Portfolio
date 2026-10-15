import type { Metadata, Viewport } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, ThemeScript } from "@/components/ThemeProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EEF1F5" },
    { media: "(prefers-color-scheme: dark)", color: "#080D18" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Aditya Sharma — Full-Stack Engineer & Data Science",
  description:
    "Final-year B.Tech CSE student at LPU. I build full-stack products, data pipelines and AI tools, and I can explain the reasoning behind every decision.",
  keywords: [
    "Aditya Sharma",
    "Full Stack Developer",
    "Data Science",
    "AI ML",
    "MERN Stack",
    "LPU",
    "Portfolio",
  ],
  authors: [{ name: "Aditya Sharma" }],
  openGraph: {
    title: "Aditya Sharma — Full-Stack Engineer & Data Science",
    description:
      "Final-year B.Tech CSE student at LPU. I build full-stack products, data pipelines and AI tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
