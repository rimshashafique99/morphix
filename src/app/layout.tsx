import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Morphix — 3D",
  description: "Character viewer & customizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistSans.variable}`}>
      <body className="min-h-full font-inter antialiased">{children}</body>
    </html>
  );
}
