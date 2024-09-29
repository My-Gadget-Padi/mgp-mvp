"use client";
import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { UserNav } from "../user-nav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

interface SelectMessageProps {
  notificationId: Id<"notifications">;
}

const SingleMessage = ({ notificationId }: SelectMessageProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const notification = useQuery(api.notifications.getNotificationById, {
    notificationId,
  });
  const updateNotification = useMutation(api.notifications.updateNotification);

  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendResponse = async () => {
    if (!response) {
      toast({
        title: "Please type in your message",
      });
      return;
    }

    setIsLoading(true);

    try {
      await updateNotification({
        notificationId,
        read: true,
        response,
      });

      setResponse("");

      toast({
        title: "Your response has been received!",
      });
      router.push("/dashboard/notifications");
    } catch (error) {
      console.error("Response could not be sent!", error);
      toast({
        title: "Message response could not be sent!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">
                  <span className="capitalize">
                    {notification?.type === "sms" ? "SMS" : "Email"} Message
                  </span>
                </h1>
              </div>
              <div className="flex ml-auto space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent px-4">
            <Breadcrumb className="">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href="/dashboard/notifications">Notifications</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link href={`/dashboard/notifications/${notificationId}`}>
                      Message
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="grid gap-4 p-4 sm:py-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2 gap-4 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Message: "
                        <span className="font-light">
                          {notification?.message}
                        </span>
                        "
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <Label htmlFor="response">Response:</Label>
                        <Textarea
                          id="response"
                          rows={6}
                          value={response || notification?.response}
                          onChange={(e) => setResponse(e.target.value)}
                          className="w-full p-2 mt-1 border rounded-md"
                          placeholder="Type your response here..."
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="ml-auto flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          onClick={handleSendResponse}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader size={20} className="animate-spin ml-2" />
                          ) : (
                            <>
                              {notification?.response === "" ? "Respond to message" : "Update your response"}
                            </>
                          )}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              <div className="col-span-1">
                <Card className="overflow-hidden">
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold text-base">Details</div>
                      <ul className="grid gap-3 text-sm">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Method:</span>
                          <span>
                            {notification?.type === "sms" ? "SMS" : "Email"}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Contact:
                          </span>
                          <span>
                            {notification?.emailAddress ||
                              notification?.phoneNumber}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span>
                            {notification?.read === false ? (
                              <Badge className="bg-green-200 text-primary">
                                Unread
                              </Badge>
                            ) : (
                              <Badge variant="outline">Seen</Badge>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Sent:</span>
                          <span>
                            {notification?._creationTime
                              ? format(
                                  new Date(notification._creationTime),
                                  "MMMM dd, yyyy | hh:mm a"
                                )
                              : "N/A"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
};

export default SingleMessage;