"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GeneralDetails } from "./general-details";
import Sessions from "./sessions";
import { Notifications } from "./notifications";
import ChangePassword from "./change-password";

export function Settings() {
  return (
    <main className="flex flex-1 mt-6 sm:mt-2 flex-col gap-2 p-2.5 sm:p-4 lg:gap-6 lg:p-6">
      <Separator className="my-2" />
      <Tabs defaultValue="general" className="mt-0 sm:mt-2">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 border-b bg-transparent">
          <TabsTrigger
            value="general"
            className="relative pb-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=active]:text-black data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-1 data-[state=active]:after:w-full data-[state=active]:after:bg-[#6445E8]"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="relative pb-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=active]:text-black data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-1 data-[state=active]:after:w-full data-[state=active]:after:bg-[#6445E8]"
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="sessions"
            className="relative pb-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=active]:text-black data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-1 data-[state=active]:after:w-full data-[state=active]:after:bg-[#6445E8]"
          >
            Sessions
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="relative pb-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=active]:text-black data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-1 data-[state=active]:after:w-full data-[state=active]:after:bg-[#6445E8]"
          >
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralDetails />
        </TabsContent>
        <TabsContent value="password">
          <ChangePassword />
        </TabsContent>
        <TabsContent value="sessions">
          <Sessions />
        </TabsContent>
        <TabsContent value="notifications">
          <Notifications />
        </TabsContent>
      </Tabs>
    </main>
  );
};