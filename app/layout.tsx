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
  title: "Industrial Curator | B2B Marketplace",
  description: "We connect trusted manufacturers with quality-conscious buyers worldwide.",
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

