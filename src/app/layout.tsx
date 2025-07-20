import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3001'),
  title: "Voyager Station | Your Next Vacation is in Orbit",
  description: "Book your stay at the world's first luxury space hotel. Experience zero gravity, stunning Earth views, and the ultimate space vacation at Voyager Station.",
  keywords: "space hotel, luxury travel, space tourism, orbital vacation, zero gravity, space station",
  authors: [{ name: "Voyager Station" }],
  creator: "Voyager Station",
  publisher: "Voyager Station",
  robots: "index, follow",
  openGraph: {
    title: "Voyager Station | Your Next Vacation is in Orbit",
    description: "Book your stay at the world's first luxury space hotel.",
    url: "https://voyager-station.com",
    siteName: "Voyager Station",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Voyager Station - Luxury Space Hotel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyager Station | Your Next Vacation is in Orbit",
    description: "Book your stay at the world's first luxury space hotel.",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00d4ff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
