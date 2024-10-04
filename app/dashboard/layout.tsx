"use client";

import { Suspense } from "react";
import PageLoader from "@/components/PageLoader";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

// Define props for MainLayout
type MainLayoutProps = Readonly<{
  children: React.ReactNode;
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
  router: ReturnType<typeof useRouter>;
}>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  return (
    <Suspense fallback={<PageLoader />}>
      <MainLayout isLoaded={isLoaded} isSignedIn={isSignedIn} router={router}>
        {children}
      </MainLayout>
    </Suspense>
  );
}

function MainLayout({
  children,
  isLoaded,
  isSignedIn,
  router,
}: MainLayoutProps) {
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