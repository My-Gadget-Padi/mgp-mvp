"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

export function Protection() {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const receiveNotifications = () => {
    toast({
      title: "Action required",
      description: "Toggle the button to receive marketing notifications",
    });

    router.push("/dashboard/settings/notifications");

    setTimeout(() => {
      const marketingToggle = document.getElementById("marketing-toggle");
      if (marketingToggle) {
        marketingToggle.scrollIntoView({ behavior: "smooth", block: "center" });

        marketingToggle.classList.add("ring-4", "ring-yellow-400", "bg-yellow-100", "animate-pulse");

        setTimeout(() => {
          marketingToggle.classList.remove("ring-4", "ring-yellow-400", "bg-yellow-100", "animate-pulse");
        }, 10000);
      }
    }, 500);
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex h-screen w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">Protections</h1>
                <p className="text-muted-foreground">
                  View all device protections on your account.
                </p>
              </div>
              <div className="flex ml-auto space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div className="flex h-screen flex-col justify-center items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  Coming soon
                </h3>
                <p className="text-sm text-muted-foreground">
                  Device protections are in development.
                </p>
                <p className="text-sm text-muted-foreground">
                  To receive a notification when we launch, please click the
                  button below.
                </p>
                {userProfile?.marketing_updates === true ? (
                  <p className="text-sm text-muted-foreground mt-2 inline-flex">
                    <Checkbox checked className="mr-2 h-5 w-5" />
                    You have opted in to receive notifications.
                  </p>
                ) : (
                  <Button onClick={receiveNotifications} className="mt-4">
                    Receive Notifications
                  </Button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
};