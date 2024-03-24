import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import React from "react";
import { TokenInfo } from "./components/TokenInfo";
import { tokenInfo, trendingTokens } from "./mocks";
import { TokenList } from "./components/TokenList";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable}`}>
        {children}
      </body>
    </html>
  );
}
