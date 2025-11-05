import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyber Portfolio",
  description: "Immersive cyber/cypherpunk portfolio",
  manifest: "/manifest.json",
  appleWebApp: {
    title: "Portfolio",
    statusBarStyle: "black-translucent",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Lang gérée par segment d'URL (/fr, /en). Défaut: fr
  const lang = 'fr'
  return (
    <html lang={lang}>
      <body className={`${geistMono.variable} antialiased bg-black text-zinc-100`}>
        {children}
      </body>
    </html>
  );
}
