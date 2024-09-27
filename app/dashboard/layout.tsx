import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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