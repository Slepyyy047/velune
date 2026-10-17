import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header, Footer } from "@/components/brand-shell";
import { BrandMotion } from "@/components/motion";
import { LanguageProvider, Localized } from "@/components/language";
import { CoffeeBackground } from "@/components/coffee-background";
import "./globals.css";
const serif = localFont({
  src: [
    {
      path: "../public/fonts/instrument-serif.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/instrument-serif-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});
const sans = localFont({
  src: [
    { path: "../public/fonts/manrope.woff2", weight: "400", style: "normal" },
    {
      path: "../public/fonts/manrope-semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  title: {
    default: "velune. — A softer kind of ritual",
    template: "%s — velune.",
  },
  description:
    "An imagined specialty coffee shop in Osaka. Explore thoughtful coffee, quiet spaces, and everyday rituals. VELUNE is a fictional concept.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "velune. — A softer kind of ritual",
    description: "Thoughtfully crafted coffee. Beautifully unhurried moments.",
    images: [{ url: "/images/hero.webp", width: 1536, height: 1024 }],
  },
};
export const viewport: Viewport = { themeColor: "#F8F5EE" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body><LanguageProvider><CoffeeBackground />
        <Localized><a className="skip-link" href="#main">
          Skip to content
        </a></Localized>
        <Header />
        {children}
        <Footer />
        <BrandMotion />
      </LanguageProvider></body>
    </html>
  );
}
