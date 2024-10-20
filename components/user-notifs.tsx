"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Info,
  Wrench,
  User,
  CreditCard,
  Trophy,
  Lock,
  Tag,
  BellRing,
  Check,
  Bell,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "./ui/scroll-area";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import LoaderSpinner from "./loader/loader-spinner";

type CardProps = React.ComponentProps<typeof Card>;

function UserNotifs({ className, ...props }: CardProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  notifications.sort((a, b) => {
    if (a.read === b.read) {
      return b._creationTime - a._creationTime;
    }
    return a.read ? 1 : -1;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [expandedIds, setExpandedIds] = useState<Id<"notifications">[]>([]);

  const toggleDescription = (id: Id<"notifications">) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const markAsRead = async (notificationId: Id<"notifications">) => {
    const notification = notifications.find(
      (notif) => notif._id === notificationId
    );
    setLoading(true);

    if (notification?.read === false) {
      try {
        await updateNotification({
          notificationId,
          read: true,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    setLoading(true);
    try {
      await Promise.all(
        notifications
          .filter((notif) => !notif.read)
          .map((notif) =>
            updateNotification({
              notificationId: notif._id,
              read: true,
            })
          )
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const hasUnreadNotifications = notifications.some((n) => !n.read);

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();

    const timeString = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const daysDifference = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference === 0) {
      return `Today ${timeString}`;
    } else if (daysDifference === 1) {
      return `Yesterday ${timeString}`;
    } else if (daysDifference < 7) {
      const dayOfWeek = date.toLocaleDateString("en-GB", { weekday: "long" });
      return `${dayOfWeek} ${timeString}`;
    } else if (daysDifference < 14) {
      const dayOfWeek = date.toLocaleDateString("en-GB", { weekday: "long" });
      return `Last week ${dayOfWeek} ${timeString}`;
    } else if (today.getFullYear() === date.getFullYear()) {
      const monthDayString = date.toLocaleDateString("en-GB", {
        month: "long",
        day: "numeric",
      });
      return `${monthDayString} ${timeString}`;
    } else {
      const fullDateString = date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return `${fullDateString} ${timeString}`;
    }
  };

  const mobileBreakpoint = 640;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < mobileBreakpoint && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleClick = () => {
    const mobileBreakpoint = 640;
    if (window.innerWidth < mobileBreakpoint) {
      window.location.href = "/notifications";
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative z-50">
      <Button
        onClick={handleClick}
        variant="default"
        size="icon"
        className="relative bg-[#EFF4FB] border hover:bg-current border-[#64748B] ml-auto h-9 w-9 rounded-full"
      >
        <Bell className="h-4 w-4 stroke-[#64748B]" />
        <span className="sr-only">Show notifications</span>

        {hasUnreadNotifications && (
          <span
            className="absolute top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500"
            aria-hidden="true"
          />
        )}
      </Button>

      {isOpen && (
        <Card
          className={cn(
            "absolute right-0 mt-2 sm:w-[500px] bg-white rounded-xl shadow-lg border border-gray-200 w-[380px]",
            className
          )}
          {...props}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription className="mt-2">
                  You have{" "}
                  {notifications.filter((notification) => !notification.read)
                    .length > 0
                    ? `${
                        notifications.filter(
                          (notification) => !notification.read
                        ).length
                      } new ${
                        notifications.filter(
                          (notification) => !notification.read
                        ).length === 1
                          ? "notification"
                          : "notifications"
                      }`
                    : "no new notifications"}
                  .
                </CardDescription>
              </div>
              <button
                type="button"
                className="mb-6 text-muted-foreground hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/**<div className="flex items-center space-x-4 rounded-md border p-4">
                <BellRing />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Email Updates
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Send notifications to email.
                  </p>
                </div>
                <Switch />
              </div>*/}

            {loading ? (
              <div className="flex h-44 items-center justify-center">
                <LoaderSpinner />
              </div>
            ) : (
              <ScrollArea className="max-h-44 overflow-y-auto">
                {notifications.map((notification) => {
                  const isExpanded = expandedIds.includes(notification._id);

                  return (
                    <li
                      key={notification._id}
                      className={`py-4 border-t border-gray-100 flex items-center space-x-4 ${
                        notification.read === false
                          ? "bg-[#6445E8]/5 p-2 rounded-xl mb-2"
                          : ""
                      }`}
                    >
                      <div>
                        {notification.type === "account" ? (
                          <User className="h-4 w-4 text-[#6445E8]" />
                        ) : notification.type === "repairs" ? (
                          <Wrench className="h-4 w-4 text-[#6445E8]" />
                        ) : notification.type === "protections" ? (
                          <ShieldCheck className="h-4 w-4 text-[#6445E8]" />
                        ) : notification.type === "security" ? (
                          <Lock className="h-4 w-4 text-[#6445E8]" />
                        ) : notification.type === "offers" ? (
                          <Trophy className="h-4 w-4 text-[#6445E8]" />
                        ) : notification.type === "warranty" ? (
                          <Tag className="h-4 w-4 text-[#6445E8]" />
                        ) : notification.type === "payments" ? (
                          <CreditCard className="h-4 w-4 text-[#6445E8]" />
                        ) : (
                          <Info className="h-4 w-4 text-[#6445E8]" />
                        )}
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {notification.title}
                          </p>
                          <p
                            className="text-muted-foreground text-sm max-w-[300px] cursor-pointer"
                            onClick={() => toggleDescription(notification._id)}
                          >
                            {isExpanded
                              ? notification.description ??
                                "No description available."
                              : `${
                                  notification.description?.slice(0, 40) ??
                                  "No description available."
                                }${
                                  notification.description &&
                                  notification.description.length > 40
                                    ? "..."
                                    : ""
                                }`}
                            {!isExpanded &&
                              notification.description &&
                              notification.description.length > 40 && (
                                <span className="text-[#6445E8] text-xs">
                                  {" "}
                                  Show more
                                </span>
                              )}
                            {isExpanded && (
                              <span className="text-[#6445E8] text-xs">
                                {" "}
                                Show less
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(notification._creationTime)}
                          </span>
                          {notification.read === false ? (
                            <p
                              className="text-xs mt-4 text-[#6445E8] cursor-pointer"
                              onClick={() =>
                                markAsRead(
                                  notification._id as Id<"notifications">
                                )
                              }
                            >
                              Mark as read
                            </p>
                          ) : (
                            <p className="text-xs mt-4 text-muted-foreground cursor-pointer">
                              Seen
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ScrollArea>
            )}
            {notifications.length >= 3 ? (
              <div className="flex justify-center">
                <ChevronDown className="h-5 w-5 text-gray-400 animate-bounce" />
              </div>
            ) : null}
          </CardContent>
          <CardFooter>
            <Button
              className={`w-full ${
                hasUnreadNotifications
                  ? "bg-[#6445E8] hover:bg-[#6445E8]/90"
                  : "bg-gray-200 text-primary cursor-not-allowed"
              }`}
              onClick={hasUnreadNotifications ? markAllAsRead : undefined}
              disabled={!hasUnreadNotifications}
            >
              <Check className="mr-2 h-4 w-4" />{" "}
              {hasUnreadNotifications
                ? `Mark all as read`
                : `You’re all caught up!`}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default UserNotifs;