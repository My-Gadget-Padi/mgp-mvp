"use client";

import { Suspense } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Authenticated, Unauthenticated } from "convex/react";
import CustomSignIn from "@/components/custom-authentication/sign-in";
import Link from "next/link";
import {
  Bell,
  CircleHelp,
  CreditCard,
  FileClock,
  Home,
  LogOut,
  Menu,
  Settings,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useClerk } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserNav } from "@/components/user-nav";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import UserNotifs from "@/components/user-notifs";
import { useParams } from "next/navigation";

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
  const { signOut } = useClerk();
  const location = usePathname();
  const searchParams = useSearchParams();
  const { requestId } = useParams();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id;

  const notifications = useQuery(api.notifications.getNotificationByUserId, {
    userId: profileId,
  });

  const redirectUrl = searchParams.get("redirect_url") || "/dashboard";

  if (!isLoaded) {
    return <PageLoader />;
  }

  if (!isSignedIn) {
    router.push(
      `/auth/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`
    );
    return null;
  }

  const handleContact = () => {
    const currentHour = new Date().getHours();

    const phoneNumber =
      currentHour % 2 === 0 ? "+2347076641696" : "+2347072665255";

    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const renderContent = () => {
    switch (location) {
      case "/dashboard":
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-semibold capitalize">
              Welcome {userProfile?.firstName} 👋
            </h1>
            <span className="text-muted-foreground text-sm sm:text-base">
              Quick overview of your activities and things you can do now
            </span>
          </>
        );
      case "/repair":
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-semibold">Gadget Repair</h1>
            <span className="text-muted-foreground text-sm sm:text-base">
              Repair your device
            </span>
          </>
        );
      case "/protection":
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-semibold">Protection</h1>
            <span className="text-muted-foreground text-sm sm:text-base">
              VView all device protections on your account
            </span>
          </>
        );
      case "/history":
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-semibold">All History</h1>
            <span className="text-muted-foreground text-sm sm:text-base">
              Quick overview of your activities and things you can do now
            </span>
          </>
        );
      case "/notifications":
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-semibold">Notifications</h1>
            <span className="text-muted-foreground text-sm sm:text-base">
              You have{" "}
              {notifications &&
              notifications?.filter((notification) => !notification.read)
                .length > 0
                ? `${
                    notifications?.filter((notification) => !notification.read)
                      .length
                  } new ${
                    notifications?.filter((notification) => !notification.read)
                      .length === 1
                      ? "notification"
                      : "notifications"
                  }`
                : "no new notifications"}
              .
            </span>
          </>
        );
      case "/settings":
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-semibold">Settings</h1>
            <span className="text-muted-foreground text-sm sm:text-base">
              Manage your profile, sessions and notifications on MyGadgetPadi
            </span>
          </>
        );
      default:
        if (location.startsWith(`/repair/${requestId}`) && requestId) {
          return (
            <>
              <h1 className="text-xl sm:text-2xl font-semibold">Gadget Repair</h1>
              <span className="text-muted-foreground text-sm sm:text-base">
                Setup a delivery option
              </span>
            </>
          );
        }
        if (location.startsWith(`/repair/review/${requestId}`) && requestId) {
          return (
            <>
              <h1 className="text-xl sm:text-2xl font-semibold">Gadget Repair</h1>
              <span className="text-muted-foreground text-sm sm:text-base">
                Review details of your request
              </span>
            </>
          );
        }
        if (location.startsWith(`/repair/complete/${requestId}`) && requestId) {
          return (
            <>
              <h1 className="text-xl sm:text-2xl font-semibold">Gadget Repair</h1>
              <span className="text-muted-foreground text-sm sm:text-base">
                Repair request completed successfully
              </span>
            </>
          );
        }
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-semibold">Welcome</h1>
            <span className="text-muted-foreground text-sm sm:text-base">
              Welcome to MGP
            </span>
          </>
        );
    }
  };

  return (
    <main>
      <Unauthenticated>
        <CustomSignIn />
      </Unauthenticated>
      <Authenticated>
        <Toaster />
        <TooltipProvider delayDuration={0}>
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r md:block">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <Image
                      src="/images/logo.svg"
                      alt="LOGO"
                      sizes="100vw"
                      style={{
                        width: "50%",
                        height: "auto",
                      }}
                      width={0}
                      height={0}
                    />
                  </Link>
                </div>
                <div className="flex-1">
                  <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <Link
                      href="/dashboard"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                        location.includes("/dashboard")
                          ? "bg-white shadow-md text-primary font-semibold"
                          : "text-muted-foreground transition-all hover:text-primary"
                      }`}
                    >
                      <Button
                        size="icon"
                        className={`h-8 w-8 ${
                          location.includes("/dashboard")
                            ? "bg-[#6445E8] hover:bg-[#6445E8] shadow-md"
                            : "bg-white hover:bg-white shadow-md"
                        } rounded-lg`}
                      >
                        <Home
                          className={`h-4 w-4 ${
                            location.includes("/dashboard")
                              ? "stroke-white"
                              : "stroke-[#6445E8]"
                          }`}
                        />
                      </Button>
                      Dashboard
                    </Link>

                    <Link
                      href="/repair"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                        location.includes("/repair")
                          ? "bg-white shadow-md text-primary font-semibold"
                          : "text-muted-foreground transition-all hover:text-primary"
                      }`}
                    >
                      <Button
                        size="icon"
                        className={`h-8 w-8 ${
                          location.includes("/repair")
                            ? "bg-[#6445E8] hover:bg-[#6445E8] shadow-md"
                            : "bg-white hover:bg-white shadow-md"
                        } rounded-lg`}
                      >
                        <Wrench
                          className={`h-4 w-4 ${
                            location.includes("/repair")
                              ? "stroke-white"
                              : "stroke-[#6445E8]"
                          }`}
                        />
                      </Button>
                      Repair
                    </Link>
                    <Link
                      href="#" //= /protection
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                        location.includes("/protection")
                          ? "bg-white shadow-md text-primary font-semibold"
                          : "text-muted-foreground transition-all hover:text-primary"
                      }`}
                    >
                      <Button
                        size="icon"
                        className={`h-8 w-8 ${
                          location.includes("/protection")
                            ? "bg-[#6445E8] hover:bg-[#6445E8] shadow-md"
                            : "bg-white hover:bg-white shadow-md"
                        } rounded-lg`}
                      >
                        <CreditCard
                          className={`h-4 w-4 ${
                            location.includes("/protection")
                              ? "stroke-white"
                              : "stroke-[#6445E8]"
                          }`}
                        />
                      </Button>
                      Protection
                      <Badge className="text-[10px]">Coming soon</Badge>
                    </Link>
                    <Link
                      href="/history"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                        location.includes("/history")
                          ? "bg-white shadow-md text-primary font-semibold"
                          : "text-muted-foreground transition-all hover:text-primary"
                      }`}
                    >
                      <Button
                        size="icon"
                        className={`h-8 w-8 ${
                          location.includes("/history")
                            ? "bg-[#6445E8] hover:bg-[#6445E8] shadow-md"
                            : "bg-white hover:bg-white shadow-md"
                        } rounded-lg`}
                      >
                        <FileClock
                          className={`h-5 w-5 ${
                            location.includes("/history")
                              ? "stroke-white"
                              : "stroke-[#6445E8]"
                          }`}
                        />
                      </Button>
                      History
                    </Link>
                  </nav>
                  <h1 className="ml-5 font-bold text-sm mt-4 mb-4">
                    ACCOUNT PAGES
                  </h1>
                  <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <Link
                      href="/settings"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                        location.includes("/settings")
                          ? "bg-white shadow-md text-primary font-semibold"
                          : "text-muted-foreground transition-all hover:text-primary"
                      }`}
                    >
                      <Button
                        size="icon"
                        className={`h-8 w-8 ${
                          location.includes("/settings")
                            ? "bg-[#6445E8] hover:bg-[#6445E8] shadow-md"
                            : "bg-white hover:bg-white shadow-md"
                        } rounded-lg`}
                      >
                        <Settings
                          className={`h-4 w-4 ${
                            location.includes("/settings")
                              ? "stroke-white"
                              : "stroke-[#6445E8]"
                          }`}
                        />
                      </Button>
                      Settings
                    </Link>
                    <p
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:text-red-500 transition-all hover:text-primary"
                      onClick={() => signOut({ redirectUrl: "/auth/sign-in" })}
                    >
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-white shadow-md rounded-lg hover:bg-current"
                      >
                        <LogOut className="h-4 w-4 stroke-red-500" />
                      </Button>
                      Logout
                    </p>
                  </nav>
                </div>
                <div className="mt-auto p-4">
                  <Card
                    className="bg-[#6445E8] rounded-3xl text-white relative overflow-hidden"
                    style={{
                      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="180" cy="200" r="30" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="60" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="90" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="120" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="150" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="180" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/></svg>')`,
                      backgroundPosition: "right -20px top",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <CardHeader className="relative z-10">
                      <Button
                        size="icon"
                        className="h-12 w-12 mb-2 bg-white rounded-2xl hover:bg-current"
                      >
                        <CircleHelp className="h-8 w-8 fill-[#6445E8]" />
                      </Button>
                      <CardTitle>Need help?</CardTitle>
                      <CardDescription className="text-white text-sm">
                        Reach out to support
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <Button className="w-full py-6 rounded-2xl bg-white text-primary font-black hover:bg-white bg:text-primary">
                        CONTACT MYPADI
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <header className="flex h-14 items-center gap-3 sm:gap-4 px-4 lg:h-[60px] lg:px-6">
                <div className="w-full mt-[50px] sm:mt-6">
                  <div>{renderContent()}</div>
                </div>
                <UserNotifs />
                <UserNav />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 md:hidden"
                    >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-4 text-base font-medium">
                      <Link
                        href="/dashboard"
                        className={`flex items-center gap-2 text-lg font-semibold ${
                          location.includes("/dashboard")
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Image
                          src="/images/logo.svg"
                          alt="LOGO"
                          sizes="100vw"
                          style={{ width: "50%", height: "auto" }}
                          width={0}
                          height={0}
                        />
                      </Link>
                      <Link
                        href="/dashboard"
                        className={`flex items-center gap-4 rounded-xl ${
                          location.includes("/dashboard")
                            ? "bg-white p-2 shadow-md text-primary font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Button
                          size="icon"
                          className={`h-8 w-8 ${
                            location.includes("/dashboard")
                              ? "bg-[#6445E8] hover:bg-[#6445E8] shadow-md"
                              : "bg-white hover:bg-white shadow-md"
                          } rounded-xl`}
                        >
                          <Home
                            className={`h-5 w-5 ${
                              location.includes("/dashboard")
                                ? "stroke-white"
                                : "stroke-[#6445E8]"
                            }`}
                          />
                        </Button>
                        Dashboard
                      </Link>
                      <Link
                        href="/repair"
                        className={`flex items-center gap-4 rounded-xl ${
                          location.includes("/repair")
                            ? "bg-white p-2 shadow-md text-primary font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Button
                          size="icon"
                          className={`h-8 w-8 ${
                            location.includes("/repair")
                              ? "bg-[#6445E8] hover:bg-[#6445E8] shadow-md"
                              : "bg-white hover:bg-white shadow-md"
                          } rounded-xl`}
                        >
                          <Wrench
                            className={`h-5 w-5 ${
                              location.includes("/repair")
                                ? "stroke-white"
                                : "stroke-[#6445E8]"
                            }`}
                          />
                        </Button>
                        Repair
                      </Link>
                      <Link
                        href="#" //= /protection
                        className={`flex items-center gap-4 rounded-xl ${
                          location.includes("/protection")
                            ? "bg-white p-2 shadow-md text-primary font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Button
                          size="icon"
                          className={`h-8 w-8 ${
                            location.includes("/protection")
                              ? "bg-[#6445E8] hover:bg-[#6445E8] shadow-md"
                              : "bg-white hover:bg-white shadow-md"
                          } rounded-xl`}
                        >
                          <CreditCard
                            className={`h-5 w-5 ${
                              location.includes("/protection")
                                ? "stroke-white"
                                : "stroke-[#6445E8]"
                            }`}
                          />
                        </Button>
                        Protection
                        <Badge className="text-[10px]">Coming soon</Badge>
                      </Link>
                      <Link
                        href="/history"
                        className={`flex items-center gap-4 rounded-xl ${
                          location.includes("/history")
                            ? "bg-white p-2 shadow-md text-primary font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Button
                          size="icon"
                          className={`h-8 w-8 ${
                            location.includes("/history")
                              ? "bg-[#6445E8] hover:bg-[#6445E8] shadow-md"
                              : "bg-white hover:bg-white shadow-md"
                          } rounded-xl`}
                        >
                          <FileClock
                            className={`h-5 w-5 ${
                              location.includes("/history")
                                ? "stroke-white"
                                : "stroke-[#6445E8]"
                            }`}
                          />
                        </Button>
                        History
                      </Link>
                    </nav>
                    <h1 className="font-bold text-sm mt-3 mb-3">
                      ACCOUNT PAGES
                    </h1>
                    <nav className="grid gap-4 text-base font-medium">
                      <Link
                        href="/settings"
                        className={`flex items-center gap-4 rounded-xl ${
                          location.includes("/settings")
                            ? "bg-white p-2 shadow-md text-primary font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Button
                          size="icon"
                          className={`h-8 w-8 ${
                            location.includes("/settings")
                              ? "bg-[#6445E8] hover:bg-[#6445E8] shadow-md"
                              : "bg-white hover:bg-white shadow-md"
                          } rounded-xl`}
                        >
                          <Settings
                            className={`h-5 w-5 ${
                              location.includes("/settings")
                                ? "stroke-white"
                                : "stroke-[#6445E8]"
                            }`}
                          />
                        </Button>
                        Settings
                      </Link>
                      <p
                        className="flex items-center gap-4 rounded-xl text-red-500 hover:text-red-500"
                        onClick={() =>
                          signOut({ redirectUrl: "/auth/sign-in" })
                        }
                      >
                        <Button
                          size="icon"
                          className="h-8 w-8 shadow-md bg-white rounded-xl hover:bg-current"
                        >
                          <LogOut className="h-5 w-5 stroke-red-500" />
                        </Button>
                        Logout
                      </p>
                    </nav>

                    <div className="mt-auto">
                      <Card
                        className="bg-[#6445E8] rounded-3xl text-white relative overflow-hidden"
                        style={{
                          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="180" cy="200" r="30" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="60" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="90" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="120" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="150" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="180" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/></svg>')`,
                          backgroundPosition: "right -20px top",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <CardHeader className="relative z-10">
                          <Button
                            size="icon"
                            className="h-12 w-12 mb-2 bg-white rounded-2xl hover:bg-current"
                          >
                            <CircleHelp className="h-8 w-8 fill-[#6445E8]" />
                          </Button>
                          <CardTitle>Need help?</CardTitle>
                          <CardDescription className="text-white text-sm">
                            Reach out to support
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <Button
                            onClick={handleContact}
                            className="w-full py-6 rounded-2xl bg-white text-primary font-black hover:bg-white bg:text-primary"
                          >
                            CONTACT MYPADI
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </SheetContent>
                </Sheet>
              </header>
              <ScrollArea>{children}</ScrollArea>
            </div>
          </div>
        </TooltipProvider>
      </Authenticated>
    </main>
  );
};