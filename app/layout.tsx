import React from 'react';
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const noto_sans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: {
    default: "Lasomaa | Africa's Leading B2B Marketplace",
    template: "%s | Lasomaa"
  },
  description: "The most trusted B2B marketplace connecting manufacturers, wholesalers, and suppliers across Africa. Buy and sell quality goods with ease.",
  metadataBase: new URL('https://www.lasomaa.com'),
  keywords: ["B2B Marketplace", "Africa Trade", "Manufacturers", "Suppliers", "Wholesale Africa", "Liberia Business"],
  authors: [{ name: "Lasomaa Team" }],
  creator: "Lasomaa",
  publisher: "Lasomaa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "a9O5LR0zYANpzWu1wQDl--jpJAvRJS8IXAHse4W4sO0",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.lasomaa.com",
    siteName: "Lasomaa",
    title: "Lasomaa | Africa's Leading B2B Marketplace",
    description: "Connect with verified manufacturers and suppliers across Africa. The premier destination for B2B trade.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Lasomaa Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lasomaa | Africa's Leading B2B Marketplace",
    description: "Connect with verified manufacturers and suppliers across Africa.",
    images: ["/logo.png"],
    creator: "@lasomaa",
  },
};

import { MessagingProvider } from "../src/hooks/MessagingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body
        className={`${noto_sans.variable} font-body bg-surface text-on-surface antialiased`}
      >
        <MessagingProvider>
          {children}
        </MessagingProvider>
      </body>
    </html>
  );
}

