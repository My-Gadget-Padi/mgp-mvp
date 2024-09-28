"use client";

import * as React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import {
  Smartphone,
  Laptop,
  TabletSmartphone,
  Computer,
  SquareArrowOutUpRight,
  ArrowUpRight
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { UserNav } from "../user-nav";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";

export function RequestFix() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id;

  const repairRequest = useMutation(api.repairRequests.createRepairRequest);

  const launchRepairRequest = async (deviceType: string) => {
    try {
      const id = await repairRequest({
        userId: profileId as Id<"users">,
        device: deviceType,
      });

      toast({
        title: "Repair request initialized",
      });
      router.push(`/dashboard/request-fix/${id}`);
    } catch (error) {
      console.error("Repair request error", error);
      toast({
        title: "Repair request is unsuccessful",
        variant: "destructive",
      });
    }
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">Device Repair</h1>
                <p className="text-muted-foreground">
                  Pick a device category for repair
                </p>
              </div>
              <div className="flex ml-auto space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-4 sm:py-0 md:gap-8">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
              <Card onClick={() => launchRepairRequest("phone")}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    <div className="text-2xl font-bold">
                      <Smartphone className="h-20 w-20 text-muted-foreground" />
                    </div>
                  </CardTitle>
                  <ArrowUpRight className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-base ml-3 font-semibold text-muted-foreground">
                    Phones
                  </div>
                </CardContent>
              </Card>
              <Card onClick={() => launchRepairRequest("tablet")}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    <div className="text-2xl font-bold">
                      <TabletSmartphone className="h-20 w-20 text-muted-foreground" />
                    </div>
                  </CardTitle>
                  <ArrowUpRight className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-base ml-2 font-semibold text-muted-foreground">
                    Tablets
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => launchRepairRequest("laptop")}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    <div className="text-2xl font-bold">
                      <Laptop className="h-20 w-20 text-muted-foreground" />
                    </div>
                  </CardTitle>
                  <ArrowUpRight className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-base ml-1 font-semibold text-muted-foreground">
                    Laptops
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => launchRepairRequest("computer")}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    <div className="text-2xl font-bold">
                      <Computer className="h-20 w-20 text-muted-foreground" />
                    </div>
                  </CardTitle>
                  <ArrowUpRight className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-base font-semibold text-muted-foreground">
                    Computers/Desktops
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="" x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Resources</CardTitle>
                <CardDescription>
                  Click on any of the links below to see:
                </CardDescription>
                <Separator className="my-2" />
              </CardHeader>

              <CardContent>
                <div>
                  <ul>
                    <li className="mt-1 text-muted-foreground hover:underline text-base">
                      <Link
                        href="https://tolugbemiro.medium.com"
                        target="_blank"
                      >
                        Step by Step process on How to Onboard your Device to
                        MyGadgetPadi
                        <SquareArrowOutUpRight className="w-4 h-4 inline-flex ml-2" />
                      </Link>
                    </li>
                    <li className="mt-1 text-muted-foreground hover:underline text-base">
                      <Link
                        href="https://tolugbemiro.medium.com"
                        target="_blank"
                      >
                        Step by Step process on How to Request a Fix
                        <SquareArrowOutUpRight className="w-4 h-4 inline-flex ml-2" />
                      </Link>
                    </li>
                    <li className="mt-1 text-muted-foreground hover:underline text-base">
                      <Link
                        href="https://tolugbemiro.medium.com"
                        target="_blank"
                      >
                        Step by Step process on How to Track your Device Repair
                        on MyGadgetPadi
                        <SquareArrowOutUpRight className="w-4 h-4 inline-flex ml-2" />
                      </Link>
                    </li>
                    <li className="mt-1 text-muted-foreground hover:underline text-base">
                      <Link
                        href="https://tolugbemiro.medium.com"
                        target="_blank"
                      >
                        Step by Step process on How to Buy a Device Protection
                        Plan
                        <SquareArrowOutUpRight className="w-4 h-4 inline-flex ml-2" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
};