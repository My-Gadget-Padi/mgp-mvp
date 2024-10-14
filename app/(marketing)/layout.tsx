"use client";

import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import ScrollToTop from "@/components/landing-page/ScrollToTop";
import { Plus_Jakarta_Sans } from 'next/font/google'
import "../../styles/index.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={jakarta.className}>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </main>
  );
};