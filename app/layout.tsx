import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/context/theme-provider'
import { Plus_Jakarta_Sans } from 'next/font/google'
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://mygadgetpadi.com`
  : process.env.NODE_ENV === 'development'
  ? `http://localhost:3000`
  : `https://mygadgetpadi.vercel.app`;

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "MyGadgetPadi",
  description: "One stop for device protection",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body className={jakarta.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ConvexClerkProvider>
  );
};