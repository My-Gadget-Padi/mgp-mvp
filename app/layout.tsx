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
  title: "MyGadgetPadi | One stop for device protection",
  description: "At My Gadget Padi, we’re all about keeping you connected. Get the latest devices, fast repairs, and affordable insurance in one place. No hassle, No worries – just tech solutions made easy.",
  icons: {
    icon: '/logo/favicon.ico'
  },
  openGraph: {
    title: "MyGadgetPadi | One stop for device protection",
    description: "At My Gadget Padi, we’re all about keeping you connected. Get the latest devices, fast repairs, and affordable insurance in one place. No hassle, No worries – just tech solutions made easy.",
    images: [
      {
        url: 'https://mygadgetpadi.vercel.app/images/home.png',
        alt: 'MyGadgetPadi | One stop for device protection'
      }
    ],
    type: 'website'
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