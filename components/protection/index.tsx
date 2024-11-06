"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Protection() {
  return (
    <main className="flex flex-1 mt-6 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Link href="/repair">
          <Card className="border-transparent shadow-md">
            <CardContent className="pb-2 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Purchased plans
                  </span>
                  <h2 className="text-lg mt-2 font-semibold">5</h2>
                </div>
                <Button
                  size="sm"
                  className="h-12 w-12 px-8 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
                >
                  Buy
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/protection">
          <Card className="border-transparent shadow-md">
            <CardContent className="pb-2 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Onboarded devices
                  </span>
                  <h2 className="text-lg mt-2 font-semibold">2</h2>
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

        <Link href="https://wa.me/+2347076641696">
          <Card className="border-transparent shadow-md">
            <CardContent className="pb-2 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">Claim</span>
                  <h2 className="text-lg mt-2 font-semibold">Make a claim</h2>
                </div>
                <Button
                  size="sm"
                  className="h-12 w-12 px-8 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
                >
                  Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <ScrollArea className="w-[350px] sm:w-[725px] md:w-[660px] lg:w-[1200px] whitespace-nowrap">
        <div className="flex w-max space-x-4 mb-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} className="rounded-xl overflow-hidden mt-4">
              <CardContent className="p-0 flex">
                <div className="flex w-full">
                  <div
                    className={cn(
                      "relative w-full",
                      "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
                      "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
                      "text-neutral-900 w-[220px]"
                    )}
                  >
                    <img
                      src="/sample/laptop.webp"
                      alt="Device Image"
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
                      <p className="text-sm">Iphone 16 pro</p>
                      <p className="mt-2 text-sm text-[#6445E8]">Basic Plan</p>
                      <div className="mt-16">
                        <Button className="bg-[#6445E8] text-white">Make a claim</Button>
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

      <div>
        <h2 className="text-2xl font-semibold mb-6">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#6445E8] text-white rounded-lg p-6 h-56 shadow-md flex flex-col">
            <h3 className="text-lg font-semibold">Buy a plan</h3>

            <div className="flex-grow"></div>

            <div className="flex items-center gap-10">
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur. Elit conse quat viverra
                paretra ultricies
              </p>
              <span className="ml-auto text-4xl">🛒</span>
            </div>
          </div>

          <div className="bg-[#FFBA43] text-gray-900 rounded-lg p-6 h-56 shadow-md flex flex-col justify-between">
            <h3 className="text-lg font-semibold">Onboard a device</h3>

            <div className="flex-grow"></div>

            <div className="flex items-center gap-10">
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur. Elit conse quat viverra
                paretra ultricies
              </p>

              <span className="ml-auto text-4xl">📱</span>
            </div>
          </div>

          <div className="bg-[#F6FFE6] text-gray-900 rounded-lg p-6 h-56 shadow-md flex flex-col justify-between">
            <h3 className="text-lg font-semibold">Make your claim</h3>

            <div className="flex-grow"></div>

            <div className="flex items-center gap-10">
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur. Elit conse quat viverra
                paretra ultricies
              </p>

              <span className="ml-auto text-4xl">📞</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};