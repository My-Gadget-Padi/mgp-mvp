"use client";

import * as React from "react";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { UserNav } from "@/components/user-nav";

export function Device() {
  return (
    <ScrollArea className="h-screen">
      <div className="flex h-screen w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">Devices</h1>
                <p className="text-muted-foreground">
                  View all devices that have been added to your account.
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
                  Device onboarding to MyGadgetPadi
                </p>
                <p className="text-sm text-muted-foreground">
                  To receive a notification when we launch, please click the
                  button below.
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="mt-4">Receive Notifications</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" side="top">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">My Devices</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive a notification to be able to onboard your devices to MyGadgetPadi
                        </p>
                      </div>
                      <form className="grid gap-3">
                        <Input
                          id="emailAddress"
                          placeholder="Enter your email address"
                          className=""
                        />
                        <Button className="flex w-full">I want this</Button>
                      </form>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
};