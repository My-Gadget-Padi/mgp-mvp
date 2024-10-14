"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import {
  Fullscreen,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CircleX,
  CircleCheck,
  Timer,
  Archive,
  TruckIcon,
  PackageOpen,
  CalendarClock,
  UserCheck,
  GalleryVerticalEnd,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export function Repair() {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id;

  const allRequests = useQuery(
    api.repairRequests.getRepairRequestsByUserId,
    {
      userId: profileId,
    }
  );

  const repairRequests = allRequests ? [...allRequests].reverse() : [];

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
                <h1 className="text-xl font-bold">Repairs</h1>
                <p className="text-muted-foreground">
                  View all repairs on your account
                </p>
              </div>
              <div className="flex ml-auto space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          <main className="flex flex-1 flex-col p-4">
            <div className="flex items-center">
              <Link
                href="/dashboard/request-fix"
                className="items-center ml-auto flex"
              >
                <Button>Request a fix</Button>
              </Link>
            </div>
            <div className="grid mt-2.5 gird-cols-1">
              <Card>
                <CardContent className="mt-4">
                  <Tabs defaultValue="all">
                    <TabsList className="ml-auto">
                      <TabsTrigger value="all" className="text-zinc-600">
                        <GalleryVerticalEnd className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        All
                      </TabsTrigger>
                      <TabsTrigger value="scheduled" className="text-zinc-600">
                        <CalendarClock className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Scheduled
                      </TabsTrigger>
                      <TabsTrigger
                        value="received"
                        className="text-zinc-600 hidden md:inline-flex"
                      >
                        <Archive className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Received
                      </TabsTrigger>
                      <TabsTrigger
                        value="assigned"
                        className="text-zinc-600 hidden md:inline-flex"
                      >
                        <UserCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Assigned
                      </TabsTrigger>
                      <TabsTrigger
                        value="in-progress"
                        className="text-zinc-600"
                      >
                        <Timer className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        In progress
                      </TabsTrigger>
                      <TabsTrigger value="completed" className="text-zinc-600">
                        <CircleCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Completed
                      </TabsTrigger>
                      <TabsTrigger
                        value="shipped"
                        className="text-zinc-600 hidden md:inline-flex"
                      >
                        <TruckIcon className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Shipped
                      </TabsTrigger>
                      <TabsTrigger
                        value="delivered"
                        className="text-zinc-600 hidden md:inline-flex"
                      >
                        <PackageOpen className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Delivered
                      </TabsTrigger>
                      <TabsTrigger
                        value="cancelled"
                        className="text-zinc-600 hidden md:inline-flex"
                      >
                        <CircleX className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Cancelled
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:block"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {repairRequests &&
                            repairRequests.map((repairRequest) => (
                              <TableRow key={repairRequest._id}>
                                <TableCell className="hidden md:block">
                                  {repairRequest?.contentType?.startsWith(
                                    "image/"
                                  ) ? (
                                    <Image
                                      className="aspect-square rounded-md object-cover"
                                      height="64"
                                      width="100"
                                      src={
                                        repairRequest?.fileUrl ||
                                        "/images/device-placeholder.jpg"
                                      }
                                      alt={
                                        repairRequest?.brandName ||
                                        "Device placeholder"
                                      }
                                      quality={100}
                                      unoptimized
                                    />
                                  ) : repairRequest?.contentType?.startsWith(
                                      "video/"
                                    ) ? (
                                    <video
                                      controls
                                      loop
                                      className="rounded-md object-contain"
                                      preload="auto"
                                      playsInline
                                      poster="/images/device-placeholder.jpg"
                                      height="64"
                                      width="100"
                                    >
                                      <source
                                        src={repairRequest?.fileUrl}
                                        type={repairRequest?.contentType}
                                      />
                                      <source
                                        src={repairRequest?.fileUrl}
                                        type="video/webm"
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  ) : (
                                    <Image
                                      className="aspect-square rounded-md object-cover"
                                      height="64"
                                      width="100"
                                      src="/images/device-placeholder.jpg"
                                      alt="Device placeholder"
                                      quality={100}
                                      unoptimized
                                    />
                                  )}
                                </TableCell>
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
                                    ) : repairRequest?.priority === "medium" ? (
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
                                    {repairRequest?.status === "scheduled" ? (
                                      <span className="inline-flex">
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
                                      </span>
                                    ) : repairRequest?.status === "received" ? (
                                      <span className="inline-flex">
                                        <Archive className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <span>Received</span>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>
                                              Device has been received by
                                              MyGadgetPadi for repairs
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </span>
                                    ) : repairRequest?.status === "assigned" ? (
                                      <span className="inline-flex">
                                        <UserCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <span>Assigned</span>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>
                                              Device has been assigned to a
                                              Technician
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </span>
                                    ) : repairRequest?.status ===
                                      "in-progress" ? (
                                      <span className="inline-flex">
                                        <Timer className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <span>In progress</span>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Device repairs have started</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </span>
                                    ) : repairRequest?.status ===
                                      "completed" ? (
                                      <span className="inline-flex">
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
                                      </span>
                                    ) : repairRequest?.status === "shipped" ? (
                                      <span className="inline-flex">
                                        <TruckIcon className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <span>Shipped</span>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>
                                              Device has been shipped for
                                              delivery
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </span>
                                    ) : repairRequest?.status ===
                                      "delivered" ? (
                                      <span className="inline-flex">
                                        <PackageOpen className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <span>Delivered</span>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>
                                              Device has been delivered
                                              successfully
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </span>
                                    ) : repairRequest?.status ===
                                      "cancelled" ? (
                                      <span className="inline-flex">
                                        <CircleX className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <span>Cancelled</span>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>
                                              Device repair has been cancelled
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </span>
                                    ) : null}
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
                            ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="scheduled">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:block"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {repairRequests &&
                            repairRequests.map((repairRequest) =>
                              repairRequest.status === "scheduled" ? (
                                <TableRow key={repairRequest._id}>
                                  <TableCell className="hidden md:block">
                                    {repairRequest?.contentType?.startsWith(
                                      "image/"
                                    ) ? (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src={
                                          repairRequest?.fileUrl ||
                                          "/images/device-placeholder.jpg"
                                        }
                                        alt={
                                          repairRequest?.brandName ||
                                          "Device placeholder"
                                        }
                                        quality={100}
                                        unoptimized
                                      />
                                    ) : repairRequest?.contentType?.startsWith(
                                        "video/"
                                      ) ? (
                                      <video
                                        controls
                                        loop
                                        className="rounded-md object-contain"
                                        preload="auto"
                                        playsInline
                                        poster="/images/device-placeholder.jpg"
                                        height="64"
                                        width="100"
                                      >
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type={repairRequest?.contentType}
                                        />
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type="video/webm"
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    ) : (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src="/images/device-placeholder.jpg"
                                        alt="Device placeholder"
                                        quality={100}
                                        unoptimized
                                      />
                                    )}
                                  </TableCell>
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
                                      {repairRequest?.status === "scheduled" ? (
                                        <span className="inline-flex">
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
                                        </span>
                                      ) : null}
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
                              ) : null
                            )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="received">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:block"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {repairRequests &&
                            repairRequests.map((repairRequest) =>
                              repairRequest.status === "received" ? (
                                <TableRow key={repairRequest._id}>
                                  <TableCell className="hidden md:block">
                                    {repairRequest?.contentType?.startsWith(
                                      "image/"
                                    ) ? (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src={
                                          repairRequest?.fileUrl ||
                                          "/images/device-placeholder.jpg"
                                        }
                                        alt={
                                          repairRequest?.brandName ||
                                          "Device placeholder"
                                        }
                                        quality={100}
                                        unoptimized
                                      />
                                    ) : repairRequest?.contentType?.startsWith(
                                        "video/"
                                      ) ? (
                                      <video
                                        controls
                                        loop
                                        className="rounded-md object-contain"
                                        preload="auto"
                                        playsInline
                                        poster="/images/device-placeholder.jpg"
                                        height="64"
                                        width="100"
                                      >
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type={repairRequest?.contentType}
                                        />
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type="video/webm"
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    ) : (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src="/images/device-placeholder.jpg"
                                        alt="Device placeholder"
                                        quality={100}
                                        unoptimized
                                      />
                                    )}
                                  </TableCell>
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
                                      {repairRequest?.status === "received" ? (
                                        <span className="inline-flex">
                                          <Archive className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <span>Received</span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>
                                                Device has been received by
                                                MyGadgetPadi for repairs
                                              </p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </span>
                                      ) : null}
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
                              ) : null
                            )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="assigned">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:block"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {repairRequests &&
                            repairRequests.map((repairRequest) =>
                              repairRequest.status === "assigned" ? (
                                <TableRow key={repairRequest._id}>
                                  <TableCell className="hidden md:block">
                                    {repairRequest?.contentType?.startsWith(
                                      "image/"
                                    ) ? (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src={
                                          repairRequest?.fileUrl ||
                                          "/images/device-placeholder.jpg"
                                        }
                                        alt={
                                          repairRequest?.brandName ||
                                          "Device placeholder"
                                        }
                                        quality={100}
                                        unoptimized
                                      />
                                    ) : repairRequest?.contentType?.startsWith(
                                        "video/"
                                      ) ? (
                                      <video
                                        controls
                                        loop
                                        className="rounded-md object-contain"
                                        preload="auto"
                                        playsInline
                                        poster="/images/device-placeholder.jpg"
                                        height="64"
                                        width="100"
                                      >
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type={repairRequest?.contentType}
                                        />
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type="video/webm"
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    ) : (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src="/images/device-placeholder.jpg"
                                        alt="Device placeholder"
                                        quality={100}
                                        unoptimized
                                      />
                                    )}
                                  </TableCell>
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
                                      {repairRequest?.status === "assigned" ? (
                                        <span className="inline-flex">
                                          <UserCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <span>Assigned</span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>
                                                Device has been assigned to a
                                                Technician
                                              </p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </span>
                                      ) : null}
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
                              ) : null
                            )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="in-progress">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:block"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {repairRequests &&
                            repairRequests.map((repairRequest) =>
                              repairRequest.status === "in-progress" ? (
                                <TableRow key={repairRequest._id}>
                                  <TableCell className="hidden md:block">
                                    {repairRequest?.contentType?.startsWith(
                                      "image/"
                                    ) ? (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src={
                                          repairRequest?.fileUrl ||
                                          "/images/device-placeholder.jpg"
                                        }
                                        alt={
                                          repairRequest?.brandName ||
                                          "Device placeholder"
                                        }
                                        quality={100}
                                        unoptimized
                                      />
                                    ) : repairRequest?.contentType?.startsWith(
                                        "video/"
                                      ) ? (
                                      <video
                                        controls
                                        loop
                                        className="rounded-md object-contain"
                                        preload="auto"
                                        playsInline
                                        poster="/images/device-placeholder.jpg"
                                        height="64"
                                        width="100"
                                      >
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type={repairRequest?.contentType}
                                        />
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type="video/webm"
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    ) : (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src="/images/device-placeholder.jpg"
                                        alt="Device placeholder"
                                        quality={100}
                                        unoptimized
                                      />
                                    )}
                                  </TableCell>
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
                                      {repairRequest?.status ===
                                      "in-progress" ? (
                                        <span className="inline-flex">
                                          <Timer className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <span>In progress</span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>Device repairs have started</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </span>
                                      ) : null}
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
                              ) : null
                            )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="completed">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:block"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {repairRequests &&
                            repairRequests.map((repairRequest) =>
                              repairRequest.status === "completed" ? (
                                <TableRow key={repairRequest._id}>
                                  <TableCell className="hidden md:block">
                                    {repairRequest?.contentType?.startsWith(
                                      "image/"
                                    ) ? (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src={
                                          repairRequest?.fileUrl ||
                                          "/images/device-placeholder.jpg"
                                        }
                                        alt={
                                          repairRequest?.brandName ||
                                          "Device placeholder"
                                        }
                                        quality={100}
                                        unoptimized
                                      />
                                    ) : repairRequest?.contentType?.startsWith(
                                        "video/"
                                      ) ? (
                                      <video
                                        controls
                                        loop
                                        className="rounded-md object-contain"
                                        preload="auto"
                                        playsInline
                                        poster="/images/device-placeholder.jpg"
                                        height="64"
                                        width="100"
                                      >
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type={repairRequest?.contentType}
                                        />
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type="video/webm"
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    ) : (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src="/images/device-placeholder.jpg"
                                        alt="Device placeholder"
                                        quality={100}
                                        unoptimized
                                      />
                                    )}
                                  </TableCell>
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
                                      {repairRequest?.status === "completed" ? (
                                        <span className="inline-flex">
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
                                        </span>
                                      ) : null}
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
                              ) : null
                            )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="shipped">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:block"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {repairRequests &&
                            repairRequests.map((repairRequest) =>
                              repairRequest.status === "shipped" ? (
                                <TableRow key={repairRequest._id}>
                                  <TableCell className="hidden md:block">
                                    {repairRequest?.contentType?.startsWith(
                                      "image/"
                                    ) ? (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src={
                                          repairRequest?.fileUrl ||
                                          "/images/device-placeholder.jpg"
                                        }
                                        alt={
                                          repairRequest?.brandName ||
                                          "Device placeholder"
                                        }
                                        quality={100}
                                        unoptimized
                                      />
                                    ) : repairRequest?.contentType?.startsWith(
                                        "video/"
                                      ) ? (
                                      <video
                                        controls
                                        loop
                                        className="rounded-md object-contain"
                                        preload="auto"
                                        playsInline
                                        poster="/images/device-placeholder.jpg"
                                        height="64"
                                        width="100"
                                      >
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type={repairRequest?.contentType}
                                        />
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type="video/webm"
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    ) : (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src="/images/device-placeholder.jpg"
                                        alt="Device placeholder"
                                        quality={100}
                                        unoptimized
                                      />
                                    )}
                                  </TableCell>
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
                                      {repairRequest?.status === "shipped" ? (
                                        <span className="inline-flex">
                                          <TruckIcon className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <span>Shipped</span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>
                                                Device has been shipped for
                                                delivery
                                              </p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </span>
                                      ) : null}
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
                              ) : null
                            )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="delivered">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:block"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {repairRequests &&
                            repairRequests.map((repairRequest) =>
                              repairRequest.status === "delivered" ? (
                                <TableRow key={repairRequest._id}>
                                  <TableCell className="hidden md:block">
                                    {repairRequest?.contentType?.startsWith(
                                      "image/"
                                    ) ? (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src={
                                          repairRequest?.fileUrl ||
                                          "/images/device-placeholder.jpg"
                                        }
                                        alt={
                                          repairRequest?.brandName ||
                                          "Device placeholder"
                                        }
                                        quality={100}
                                        unoptimized
                                      />
                                    ) : repairRequest?.contentType?.startsWith(
                                        "video/"
                                      ) ? (
                                      <video
                                        controls
                                        loop
                                        className="rounded-md object-contain"
                                        preload="auto"
                                        playsInline
                                        poster="/images/device-placeholder.jpg"
                                        height="64"
                                        width="100"
                                      >
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type={repairRequest?.contentType}
                                        />
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type="video/webm"
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    ) : (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src="/images/device-placeholder.jpg"
                                        alt="Device placeholder"
                                        quality={100}
                                        unoptimized
                                      />
                                    )}
                                  </TableCell>
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
                                      {repairRequest?.status === "delivered" ? (
                                        <span className="inline-flex">
                                          <PackageOpen className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <span>Delivered</span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>
                                                Device has been delivered
                                                successfully
                                              </p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </span>
                                      ) : null}
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
                              ) : null
                            )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="cancelled">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:block"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {repairRequests &&
                            repairRequests.map((repairRequest) =>
                              repairRequest.status === "cancelled" ? (
                                <TableRow key={repairRequest._id}>
                                  <TableCell className="hidden md:block">
                                    {repairRequest?.contentType?.startsWith(
                                      "image/"
                                    ) ? (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src={
                                          repairRequest?.fileUrl ||
                                          "/images/device-placeholder.jpg"
                                        }
                                        alt={
                                          repairRequest?.brandName ||
                                          "Device placeholder"
                                        }
                                        quality={100}
                                        unoptimized
                                      />
                                    ) : repairRequest?.contentType?.startsWith(
                                        "video/"
                                      ) ? (
                                      <video
                                        controls
                                        loop
                                        className="rounded-md object-contain"
                                        preload="auto"
                                        playsInline
                                        poster="/images/device-placeholder.jpg"
                                        height="64"
                                        width="100"
                                      >
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type={repairRequest?.contentType}
                                        />
                                        <source
                                          src={repairRequest?.fileUrl}
                                          type="video/webm"
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    ) : (
                                      <Image
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="100"
                                        src="/images/device-placeholder.jpg"
                                        alt="Device placeholder"
                                        quality={100}
                                        unoptimized
                                      />
                                    )}
                                  </TableCell>
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
                                      {repairRequest?.status === "cancelled" ? (
                                        <span className="inline-flex">
                                          <CircleX className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <span>Cancelled</span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>
                                                Device repair has been cancelled
                                              </p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </span>
                                      ) : null}
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
                              ) : null
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