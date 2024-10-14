"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Mail, MailOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function Notification() {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id;

  const allNotifications = useQuery(api.notifications.getNotificationByUserId, {
    userId: profileId,
  });

  const updateNotification = useMutation(api.notifications.updateNotification);

  const notifications = allNotifications ? [...allNotifications].reverse() : [];

  const openMessage = async (notificationId: Id<"notifications">) => {
    const notification = notifications.find(
      (notif) => notif._id === notificationId
    );

    if (notification?.read === false) {
      try {
        await updateNotification({
          notificationId,
          read: true,
        });

        router.push(`/dashboard/notifications/${notificationId}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      router.push(`/dashboard/notifications/${notificationId}`);
    }
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex h-screen w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">Notifications</h1>
                <p className="text-muted-foreground">
                  View all notifications on your account.
                </p>
              </div>
              <div className="flex ml-auto space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-4 md:gap-8">
            <div className="grid gap-4 md:gap-8 gird-cols-1">
              <Card className="" x-chunk="dashboard-01-chunk-4">
                <CardContent className="mt-4">
                  <Tabs defaultValue="all">
                    <TabsList className="ml-auto">
                      <TabsTrigger
                        value="all"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="unread"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        Unread
                      </TabsTrigger>
                      <TabsTrigger
                        value="seen"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        Seen
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Message</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Contact Details</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {notifications.map((notification) => (
                            <TableRow
                              key={notification._id}
                              onClick={() =>
                                openMessage(
                                  notification?._id as Id<"notifications">
                                )
                              }
                            >
                              <TableCell>
                                <div className="font-normal">
                                  {notification.message.slice(0, 50)}...
                                </div>
                                <div className="hidden text-xs text-muted-foreground md:inline">
                                  {new Date(
                                    notification._creationTime
                                  ).toLocaleDateString("en-GB")}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-muted-foreground">
                                  {notification.type === "sms"
                                    ? "SMS"
                                    : notification.type === "whatsapp"
                                    ? "WhatsApp"
                                    : "Email"
                                  }
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-muted-foreground">
                                  {notification.emailAddress ||
                                    notification.phoneNumber}
                                </div>
                              </TableCell>
                              <TableCell>
                                {notification.read === false ? (
                                  <Badge className="bg-green-200 text-primary">
                                    Unread
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">Seen</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="inline-flex">
                                  <Tooltip>
                                    <TooltipTrigger>
                                      {notification.read === false ? (
                                        <Mail className="mr-1.5 h-5 text-muted-foreground" />
                                      ) : (
                                        <MailOpen className="mr-1.5 h-5 text-muted-foreground" />
                                      )}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>
                                        {notification.read === false
                                          ? "Read message"
                                          : "Message has been read"}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="unread">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Message</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Contact Details</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {notifications
                            .filter((notification) => !notification.read)
                            .map((notification) => (
                              <TableRow
                                key={notification._id}
                                onClick={() =>
                                  openMessage(
                                    notification?._id as Id<"notifications">
                                  )
                                }
                              >
                                <TableCell>
                                  <div className="font-normal">
                                    {notification.message.slice(0, 50)}...
                                  </div>
                                  <div className="hidden text-xs text-muted-foreground md:inline">
                                    {new Date(
                                      notification._creationTime
                                    ).toLocaleDateString("en-GB")}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-muted-foreground">
                                    {notification.type === "sms"
                                    ? "SMS"
                                    : notification.type === "whatsapp"
                                    ? "WhatsApp"
                                    : "Email"
                                    }
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-muted-foreground">
                                    {notification.emailAddress ||
                                      notification.phoneNumber}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className="bg-green-200 text-primary">
                                    Unread
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="inline-flex">
                                    <Tooltip>
                                      <TooltipTrigger>
                                        {notification.read === false ? (
                                          <Mail className="mr-1.5 h-5 text-muted-foreground" />
                                        ) : (
                                          <MailOpen className="mr-1.5 h-5 text-muted-foreground" />
                                        )}
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>
                                          {notification.read === false
                                            ? "Read message"
                                            : "Message has been read"}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="seen">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Message</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Contact Details</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {notifications
                            .filter((notification) => notification.read)
                            .map((notification) => (
                              <TableRow
                                key={notification._id}
                                onClick={() =>
                                  openMessage(
                                    notification?._id as Id<"notifications">
                                  )
                                }
                              >
                                <TableCell>
                                  <div className="font-normal">
                                    {notification.message.slice(0, 50)}...
                                  </div>
                                  <div className="hidden text-xs text-muted-foreground md:inline">
                                    {new Date(
                                      notification._creationTime
                                    ).toLocaleDateString("en-GB")}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-muted-foreground">
                                    {notification.type === "sms"
                                    ? "SMS"
                                    : notification.type === "whatsapp"
                                    ? "WhatsApp"
                                    : "Email"
                                    }
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-muted-foreground">
                                    {notification.emailAddress ||
                                      notification.phoneNumber}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">Seen</Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="inline-flex">
                                    <Tooltip>
                                      <TooltipTrigger>
                                        {notification.read === false ? (
                                          <Mail className="mr-1.5 h-5 text-muted-foreground" />
                                        ) : (
                                          <MailOpen className="mr-1.5 h-5 text-muted-foreground" />
                                        )}
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>
                                          {notification.read === false
                                            ? "Read message"
                                            : "Message has been read"}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
};