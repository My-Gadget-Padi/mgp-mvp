"use client";

import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import ScrollToTop from "@/components/landing-page/ScrollToTop";
import { Inter } from "next/font/google";
import "../../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </main>
  );
};