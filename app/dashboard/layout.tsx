"use client";

import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import PageLoader from "@/components/PageLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect_url") || "/dashboard";

  if (!isLoaded) {
    return <PageLoader />;
  }

  if (!isSignedIn) {
    router.push(`/auth/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
    return null;
  }

  return (
    <main>
      <Toaster />
      <TooltipProvider delayDuration={0}>
        <div className="flex w-full h-screen items-stretch">
          <Sidebar />
          <Separator className="h-screen" orientation="vertical" />
          {children}
        </div>
      </TooltipProvider>
    </main>
  );
};