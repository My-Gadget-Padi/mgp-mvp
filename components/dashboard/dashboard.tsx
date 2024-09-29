"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import Link from "next/link";
import {
  BellRing,
  MessagesSquare,
  Fullscreen,
  ShieldCheck,
  Wrench,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CircleCheck,
  CalendarClock,
  ArrowUpRight,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { UserNav } from "../user-nav";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function Dashboard() {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id;

  const repairRequests = useQuery(
    api.repairRequests.getRepairRequestsByUserId,
    {
      userId: profileId,
    }
  );

  const [showFirstButton, setShowFirstButton] = useState(true);

  useEffect(() => {
    const toggleButtons = () => {
      setShowFirstButton((prev) => !prev);
    };
    const intervalId = setInterval(toggleButtons, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  const viewFullInfo = async (requestId: Id<"repairRequests">) => {
    router.push(`/dashboard/repairs/${requestId}`);
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex h-screen w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to MyGadgetPadi</p>
              </div>
              <div className="flex ml-auto space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-4 sm:py-0 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Device Repair
                  </CardTitle>
                  <Wrench className="h-8 w-8 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Repair Your</div>
                  <div className="text-2xl font-bold">Device</div>
                </CardContent>
                <CardFooter>
                  <Button asChild size="sm" className="ml-auto">
                    <Link href="/dashboard/request-fix">
                      Request a fix
                      <ArrowUpRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Device Protection
                  </CardTitle>
                  <ShieldCheck className="h-8 w-8 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Protect Your</div>
                  <div className="text-2xl font-bold">Device</div>
                </CardContent>
                <CardFooter>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="ml-auto"
                    disabled
                  >
                    Coming soon
                  </Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Notifications
                  </CardTitle>
                  <BellRing className="h-8 w-8 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">See All</div>
                  <div className="text-2xl font-bold">Notifications</div>
                </CardContent>
                <CardFooter>
                  <Button asChild size="sm" className="ml-auto">
                    <Link href="/dashboard/notifications">
                      View all
                      <ArrowUpRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Contact Us
                  </CardTitle>
                  <MessagesSquare className="h-8 w-8 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">We Are Available</div>
                  <div className="text-2xl font-bold">24/7</div>
                </CardContent>
                <CardFooter>
                  {showFirstButton ? (
                    <Button asChild size="sm" className="ml-auto">
                      <Link href="https://wa.me/+2347076641696">
                        Send a message
                        <ArrowUpRight className="h-4 w-4 ml-1.5" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild size="sm" className="ml-auto">
                      <Link href="https://wa.me/+2347072665255">
                        Send a message
                        <ArrowUpRight className="h-4 w-4 ml-1.5" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
              <div className="sm:mb-8">
                <div className="mb-6 mt-6 space-y-2">
                  <h1 className="text-2xl font-semibold leading-none tracking-tight">
                    Ongoing Repair
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    This device is currently being repaired
                  </p>
                </div>
                <div className="lg:col-span-1 space-y-8">
                  <Card className="rounded-xl overflow-hidden mt-4">
                    <CardContent className="p-0 flex">
                      {repairRequests &&
                      repairRequests
                        .filter(
                          (repairRequest) => repairRequest.status === "in-progress"
                        )
                        .sort(
                          (a, b) =>
                            new Date(b._creationTime).getTime() -
                            new Date(a._creationTime).getTime()
                        )
                        .slice(0, 1).length > 0 ? (
                        repairRequests
                          .filter(
                            (repairRequest) =>
                              repairRequest.status === "in-progress"
                          )
                          .sort(
                            (a, b) =>
                              new Date(b._creationTime).getTime() -
                              new Date(a._creationTime).getTime()
                          )
                          .slice(0, 1)
                          .map((repairRequest) => (
                            <div
                              key={repairRequest._id}
                              className="flex w-full"
                            >
                              <div
                                className={cn(
                                  "relative w-full",
                                  "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
                                  "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
                                  "text-neutral-900 w-[220px]"
                                )}
                              >
                                {repairRequest?.contentType?.startsWith(
                                  "image/"
                                ) ? (
                                  <img
                                    src={
                                      repairRequest?.fileUrl ||
                                      "/images/device-placeholder.jpg"
                                    }
                                    alt={repairRequest?.model || "Device Image"}
                                    width={200}
                                    height={200}
                                    className="object-cover absolute h-full w-full inset-0"
                                  />
                                ) : repairRequest?.contentType?.startsWith(
                                    "video/"
                                  ) ? (
                                  <img
                                    src="/images/device-placeholder.jpg"
                                    alt={repairRequest?.model || "Device Image"}
                                    width={200}
                                    height={200}
                                    className="object-cover absolute h-full w-full inset-0"
                                  />
                                ) : (
                                  <img
                                    src="/images/device-placeholder.jpg"
                                    alt={repairRequest?.model || "Device Image"}
                                    width={200}
                                    height={200}
                                    className="object-cover absolute h-full w-full inset-0"
                                  />
                                )}
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
                                  <p className="text-sm">
                                    Device:
                                    <br />
                                    <span className="font-semibold">
                                      {repairRequest?.model}
                                    </span>
                                  </p>
                                  <p className="mt-4 text-sm">
                                    Damage:
                                    <br />
                                    <span className="font-semibold">
                                      {repairRequest?.damages &&
                                        repairRequest.damages.length > 0 && (
                                          <ul>
                                            <li className="mt-1 font-semibold text-sm capitalize">
                                              <CheckCheck className="w-4 h-4 inline-flex mr-2" />
                                              {repairRequest.damages[0]}
                                            </li>
                                            {repairRequest.damages.length >
                                              1 && (
                                              <li className="mt-1 font-semibold text-sm capitalize">
                                                <CheckCheck className="w-4 h-4 inline-flex mr-2" />
                                                ...
                                              </li>
                                            )}
                                          </ul>
                                        )}
                                      {repairRequest?.comments ? (
                                        <p className="mt-1 font-semibold text-sm">
                                          {repairRequest.comments}
                                        </p>
                                      ) : null}
                                    </span>
                                  </p>
                                </div>
                                <Separator orientation="horizontal" />
                                <div
                                  className="w-full flex items-center p-3 gap-2 cursor-pointer"
                                  onClick={() =>
                                    viewFullInfo(
                                      repairRequest?._id as Id<"repairRequests">
                                    )
                                  }
                                >
                                  <Fullscreen />
                                  <p className="text-sm">
                                    View full information
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="ml-2 flex text-sm justify-center text-center py-4 text-muted-foreground">
                          No ongoing device repairs
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
              <Card
                className="lg:col-span-2 mb-4"
                x-chunk="dashboard-01-chunk-4"
              >
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Device Repairs</CardTitle>
                    <CardDescription>
                      Recent repairs that have been scheduled and completed
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="scheduled">
                    <TabsList className="ml-auto">
                      <TabsTrigger
                        value="scheduled"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        <CalendarClock className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Recently Scheduled
                      </TabsTrigger>
                      <TabsTrigger
                        value="completed"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        <CircleCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Recently Completed
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="scheduled">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {repairRequests &&
                          repairRequests
                            .filter(
                              (repairRequest) =>
                                repairRequest.status === "scheduled"
                            )
                            .sort(
                              (a, b) =>
                                new Date(b._creationTime).getTime() -
                                new Date(a._creationTime).getTime()
                            )
                            .slice(0, 3).length > 0 ? (
                            repairRequests
                              .filter(
                                (repairRequest) =>
                                  repairRequest.status === "scheduled"
                              )
                              .sort(
                                (a, b) =>
                                  new Date(b._creationTime).getTime() -
                                  new Date(a._creationTime).getTime()
                              )
                              .slice(0, 3)
                              .map((repairRequest) => (
                                <TableRow key={repairRequest._id}>
                                  <TableCell>
                                    <div className="font-medium">
                                      {repairRequest?.model}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="font-medium">
                                      {repairRequest?.damages && (
                                        <ul>
                                          {repairRequest.damages.map(
                                            (
                                              damageItem: string,
                                              index: number
                                            ) => (
                                              <li
                                                key={index}
                                                className="mt-1 text-muted-foreground text-sm capitalize"
                                              >
                                                <CheckCheck className="w-4 h-4 inline-flex mr-2" />
                                                {damageItem}
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      )}
                                      {repairRequest?.comments ? (
                                        <p className="mt-1 text-muted-foreground text-sm">
                                          {repairRequest.comments}
                                        </p>
                                      ) : null}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="inline-flex">
                                      {repairRequest?.priority === "high" ? (
                                        <span className="inline-flex">
                                          <ArrowUp className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          High
                                        </span>
                                      ) : repairRequest?.priority ===
                                        "medium" ? (
                                        <span className="inline-flex">
                                          <ArrowRight className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          Medium
                                        </span>
                                      ) : repairRequest?.priority === "low" ? (
                                        <span className="inline-flex">
                                          <ArrowDown className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          Low
                                        </span>
                                      ) : null}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="inline-flex">
                                      <CalendarClock className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <span>Scheduled</span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>
                                            Device has been successfully
                                            scheduled for repairs
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div
                                      onClick={() =>
                                        viewFullInfo(
                                          repairRequest?._id as Id<"repairRequests">
                                        )
                                      }
                                      className="inline-flex"
                                    >
                                      <Fullscreen className="mr-1.5 h-5 text-muted-foreground" />
                                      <p className="text-sm">
                                        View full information
                                      </p>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                          ) : (
                            <tr>
                              <td
                                colSpan={5}
                                className="text-center py-4 text-muted-foreground"
                              >
                                No device repairs have been scheduled
                              </td>
                            </tr>
                          )}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <TabsContent value="completed">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {repairRequests &&
                          repairRequests
                            .filter(
                              (repairRequest) =>
                                repairRequest.status === "completed"
                            )
                            .sort(
                              (a, b) =>
                                new Date(b._creationTime).getTime() -
                                new Date(a._creationTime).getTime()
                            )
                            .slice(0, 3).length > 0 ? (
                            repairRequests
                              .filter(
                                (repairRequest) =>
                                  repairRequest.status === "completed"
                              )
                              .sort(
                                (a, b) =>
                                  new Date(b._creationTime).getTime() -
                                  new Date(a._creationTime).getTime()
                              )
                              .slice(0, 3)
                              .map((repairRequest) => (
                                <TableRow key={repairRequest._id}>
                                  <TableCell>
                                    <div className="font-medium">
                                      {repairRequest?.model}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="font-medium">
                                      {repairRequest?.damages && (
                                        <ul>
                                          {repairRequest.damages.map(
                                            (
                                              damageItem: string,
                                              index: number
                                            ) => (
                                              <li
                                                key={index}
                                                className="mt-1 text-muted-foreground text-sm capitalize"
                                              >
                                                <CheckCheck className="w-4 h-4 inline-flex mr-2" />
                                                {damageItem}
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      )}
                                      {repairRequest?.comments ? (
                                        <p className="mt-1 text-muted-foreground text-sm">
                                          {repairRequest.comments}
                                        </p>
                                      ) : null}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="inline-flex">
                                      {repairRequest?.priority === "high" ? (
                                        <span className="inline-flex">
                                          <ArrowUp className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          High
                                        </span>
                                      ) : repairRequest?.priority ===
                                        "medium" ? (
                                        <span className="inline-flex">
                                          <ArrowRight className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          Medium
                                        </span>
                                      ) : repairRequest?.priority === "low" ? (
                                        <span className="inline-flex">
                                          <ArrowDown className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          Low
                                        </span>
                                      ) : null}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="inline-flex">
                                      <CircleCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <span>Completed</span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>
                                            Device repair has been completed
                                            successfully
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div
                                      onClick={() =>
                                        viewFullInfo(
                                          repairRequest?._id as Id<"repairRequests">
                                        )
                                      }
                                      className="inline-flex"
                                    >
                                      <Fullscreen className="mr-1.5 h-5 text-muted-foreground" />
                                      <p className="text-sm">
                                        View full information
                                      </p>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                          ) : (
                            <tr>
                              <td
                                colSpan={5}
                                className="text-center py-4 text-muted-foreground"
                              >
                                No device repairs have been completed
                              </td>
                            </tr>
                          )}
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