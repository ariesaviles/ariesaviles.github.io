import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aries Aviles — Senior Software Engineer",
  description:
    "Full-stack and mobile engineer building fast, thoughtful digital products.",
  openGraph: {
    title: "Aries Aviles — Senior Software Engineer",
    description:
      "Full-stack and mobile engineer building fast, thoughtful digital products.",
    url: "https://ariesaviles.com",
    siteName: "Aries Aviles",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aries Aviles — Senior Software Engineer",
    description:
      "Full-stack and mobile engineer building fast, thoughtful digital products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-stone-50 text-stone-900 antialiased">{children}</body>
    </html>
  );
}
