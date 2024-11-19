"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";

const fetchData = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
  return response.json();
};

export function Protection() {
  const [showDialog, setShowDialog] = useState(false);
  const [device, setDevice] = useState<any | null>(null);
  const [plan, setPlan] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { toast } = useToast();
  const { user } = useUser();
  const userId = user?.id;

  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id as Id<"users">;

  const devices = useQuery(api.devices.getDevicesByUserId, {
    userId: profileId,
  });

  const protections = useQuery(
    api.deviceProtections.getDeviceProtectionsByUserId,
    {
      userId: profileId,
    }
  );

  const emails = process.env.NEXT_PUBLIC_EMAILS?.split(",").map((email) => `mailto:${email}`) || [];

  useEffect(() => {
    const toggleEmails = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % emails.length);
    };

    const intervalId = setInterval(toggleEmails, 3600000);
    return () => clearInterval(intervalId);
  }, [emails.length]);

  const filteredDevices = devices?.filter((device) => {
    if (device.planName === "Free Plan") {
      return true;
    }
    if (
      (device.planName === "Basic Plan" || device.planName === "Pro Plan") &&
      device.isVerified
    ) {
      return true;
    }
    return false;
  });

  const handleMakeClaim = async (device: any) => {
    try {
      localStorage.setItem("device", JSON.stringify(device));

      const url = `${
        process.env.NEXT_PUBLIC_CONVEX_HTTP_URL
      }/getPlanByName?name=${encodeURIComponent(device?.planName)}`;
      const planData = await fetchData(url);
      setPlan(planData);
      setDevice(device);

      setTimeout(() => setShowDialog(true), 0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Claim could not be made.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <></>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex flex-cols-1 mt-4">
              <p className="text-xl">Make a claim</p>
              <Badge className="px-4 ml-auto bg-[#FFBA43] text-[#6445E8]">
                {plan?.name || device?.planName}
              </Badge>
            </DialogTitle>
            <DialogDescription className="flex items-start">
              Protect my electronic devices from damage
            </DialogDescription>
          </DialogHeader>
          <div>
            <Link href={`/repair/claim/${device?.protection as Id<"deviceProtections">}`}>
              <Button className="w-full py-6 bg-[#6445E8] text-white font-semibold rounded-lg hover:bg-[#6445E8]">
                Request a repair
              </Button>
            </Link>

            <ul className="mt-6 space-y-2 text-sm text-gray-800 mb-4">
              {plan?.details.benefits.map((benefit: any, idx: any) => (
                <li key={idx} className="flex items-start space-x-1 mb-2">
                  <span className="text-green-500">✓</span>
                  <span>
                    {benefit
                      .split(/(N\d{1,3}(?:,\d{3})*)/)
                      .map((part: any, index: any) =>
                        /^N\d{1,3}(?:,\d{3})*$/.test(part) ? (
                          <span key={index} className="font-semibold">
                            {part}
                          </span>
                        ) : (
                          <span key={index}>{part}</span>
                        )
                      )}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-gray-500 italic">
              {plan?.details.terms}
            </p>
            <Link href={emails[currentIndex]}>
              <Button className="mt-6 w-full py-6 bg-[#F6FFE6] text-gray-700 font-semibold rounded-lg hover:bg-[#F6FFE6]">
                Contact support
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <main className="flex flex-1 mt-6 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:gap-8">
          <Link href="/protection/plans">
            <Card className="border-transparent shadow-md">
              <CardContent className="pb-2 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Your Plans
                    </span>
                    <h2 className="text-lg mt-2 font-semibold">
                      {protections?.length}
                    </h2>
                  </div>
                  <Button
                    size="sm"
                    className="h-12 w-12 px-12 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
                  >
                    Get a plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          {protections?.length === 0 ? (
            <Card className="border-transparent shadow-md opacity-50 cursor-not-allowed">
              <CardContent className="pb-2 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Onboarded devices
                    </span>
                    <h2 className="text-lg mt-2 font-semibold">
                      {filteredDevices?.length}
                    </h2>
                  </div>
                  <Button
                    size="sm"
                    className="h-12 w-12 px-12 bg-[#6445E8] rounded-xl hover:bg-[#6445E8] cursor-not-allowed"
                  >
                    Onboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Link href="/protection/onboard">
              <Card className="border-transparent shadow-md">
                <CardContent className="pb-2 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Onboarded devices
                      </span>
                      <h2 className="text-lg mt-2 font-semibold">
                        {filteredDevices?.length}
                      </h2>
                    </div>
                    <Button
                      size="sm"
                      className="h-12 w-12 px-12 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
                    >
                      Onboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>

        {filteredDevices?.length !== 0 ? (
          <ScrollArea className="w-[350px] sm:w-[725px] md:w-[660px] lg:w-[1200px] whitespace-nowrap">
            <div className="flex w-max space-x-4 mb-4">
              {filteredDevices &&
                filteredDevices.map((device) => (
                  <Card
                    key={device._id}
                    className="rounded-xl overflow-hidden mt-4"
                  >
                    <CardContent className="p-0 flex">
                      <div className="flex w-full">
                        <div
                          className={cn(
                            "relative w-full",
                            "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
                            "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
                            "text-neutral-900 w-[210px]"
                          )}
                        >
                          <img
                            src={device.imageUrl || "/images/placeholder.svg"}
                            alt={device.model || "Onboarded device"}
                            width={200}
                            height={200}
                            className="object-cover absolute h-full w-full inset-0"
                          />
                          <div className="absolute inset-0">
                            <div
                              className={cn(
                                "absolute inset-0",
                                "shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_#fff,0px_0px_0px_4px_rgba(0,0,0,.08)]",
                                "dark:shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_rgba(100,100,100,0.3),0px_0px_0px_4px_rgba(0,0,0,.08)]"
                              )}
                            />
                            <div
                              className={cn(
                                "absolute inset-0",
                                "dark:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15),0px_1px_1px_0px_rgba(0,0,0,0.15)_inset,0px_0px_0px_1px_rgba(0,0,0,0.15)_inset,0px_0px_1px_0px_rgba(0,0,0,0.15)]"
                              )}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="w-full p-3">
                            <p className="text-sm">{device.model}</p>
                            <p className="mt-2 text-sm text-[#6445E8]">
                              {device.planName}
                            </p>
                            <div className="mt-16">
                              <Button
                                onClick={() => handleMakeClaim(device as any)}
                                className="bg-[#6445E8] hover:bg-[#6445E8]/90 text-white"
                              >
                                Make a claim
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <div className="flex-grow"></div>
        )}

        <div>
          <h2 className="text-2xl font-semibold mb-6">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              className="bg-[#6445E8] text-white rounded-lg p-6 h-56 shadow-md flex flex-col"
            >
              <h3 className="text-lg font-semibold">Buy a plan</h3>
              <div className="flex-grow"></div>
              <div className="flex items-center gap-10">
                <p className="text-sm">
                  Choose a plan that fits your needs, and make a secure payment in just a few clicks.
                </p>
                <span className="ml-auto text-4xl">🛒</span>
              </div>
            </div>

            <div
              className="bg-[#FFBA43] text-gray-900 rounded-lg p-6 h-56 shadow-md flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold">Onboard a device</h3>
              <div className="flex-grow"></div>
              <div className="flex items-center gap-10">
                <p className="text-sm">
                  Get your device covered! Easily add your devices to your plan to activate your protection right away.
                </p>
                <span className="ml-auto text-4xl">📱</span>
              </div>
            </div>

            <div className="bg-[#F6FFE6] text-gray-900 rounded-lg p-6 h-56 shadow-md flex flex-col justify-between">
              <h3 className="text-lg font-semibold">Make your claim</h3>
              <div className="flex-grow"></div>
              <div className="flex items-center gap-10">
                <p className="text-sm">
                  Need to file a claim? It’s quick and simple! Just follow the steps to get your device covered.
                </p>
                <span className="ml-auto text-4xl">📞</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};