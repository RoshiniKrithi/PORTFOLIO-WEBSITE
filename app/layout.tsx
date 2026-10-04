import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO } from "@/data/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name} — Full-Stack Developer × AI Engineer`,
  description:
    "Portfolio of A Roshini Krithi, a Computer Science undergraduate focused on Full-Stack Engineering, Artificial Intelligence, and building products that solve meaningful problems.",
  keywords: [
    "A Roshini Krithi",
    "Roshini Krithi",
    "Computer Science Engineer",
    "Full-Stack Developer",
    "AI Engineer",
    "Machine Learning",
    "Portfolio",
    "Aura GPT",
    "PyTorch",
    "React",
    "Next.js",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: "https://github.com/roshinikrithi" }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://roshinikrithi.dev",
    title: `${PERSONAL_INFO.name} — Full-Stack Developer × AI Engineer`,
    description:
      "Digital systems engineered at the intersection of software, machine learning, and refined interaction design.",
    siteName: PERSONAL_INFO.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} — Full-Stack Developer × AI Engineer`,
    description:
      "Digital systems engineered at the intersection of software, machine learning, and refined interaction design.",
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-background text-text-primary antialiased selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
