"use client";

import * as React from "react";
import { useState } from "react";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCheck, Minimize, Maximize, Bike, Package } from "lucide-react";

const PriorityBadge = ({ priority }: any) => {
  let color = "bg-gray-100 text-[#0C4414]";
  if (priority === "high") color = "bg-red-100 text-red-600";
  if (priority === "medium") color = "bg-[#FFBA430D] text-[#FFBA43]";
  if (priority === "low") color = "bg-gray-100 text-[#0C4414]";

  return (
    <span
      className={`px-4 py-1 text-sm capitalize font-medium rounded-full ${color}`}
    >
      {priority ? `${priority} priority` : "no priority"}
    </span>
  );
};

const RepairStatus = ({ status }: any) => {
  let statusColor = "text-muted-foreground";
  if (status === "scheduled") statusColor = "text-muted-foreground";
  if (status === "received") statusColor = "text-muted-foreground";
  if (status === "assigned") statusColor = "text-muted-foreground";
  if (status === "in-progress") statusColor = "text-muted-foreground";
  if (status === "completed") statusColor = "text-[#38C793]";
  if (status === "shipped") statusColor = "text-muted-foreground";
  if (status === "delivered") statusColor = "text-muted-foreground";
  if (status === "cancelled") statusColor = "text-red-500";

  return (
    <span className={`text-sm font-medium capitalize ${statusColor}`}>
      {status}
    </span>
  );
};

export function History() {
  const { user } = useUser();
  const userId = user?.id;

  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id;

  const allRequests = useQuery(api.repairRequests.getRepairRequestsByUserId, {
    userId: profileId,
  });

  const repairRequests = allRequests ? [...allRequests].reverse() : [];

  const [filter, setFilter] = useState("all");

  const filteredRequests = repairRequests.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const [showMore, setShowMore] = useState<{ [key: number]: boolean }>({});

  const toggleShowMore = (index: number) => {
    setShowMore((prev) => ({ ...prev, [index]: !prev[index] }));
  };

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

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <div className="ml-auto mt-6 sm:mt-0">
        <Select value={filter} onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <span>{filter === "all" ? `Filter status` : filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="received">Received</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="in-progress">In-progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((item, idx) => (
            <Card key={idx} className="border rounded-2xl shadow-sm">
              <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center py-4">
                <div>
                  <p className="text-base mb-2 font-medium">{item.model}</p>
                  <div>
                    {item?.damages && (
                      <ul>
                        {item.damages
                          .slice(0, showMore[idx] ? item.damages.length : 1)
                          .map((damageItem: string, index: number) => (
                            <li
                              key={index}
                              className="mt-1 text-muted-foreground text-sm capitalize"
                            >
                              <CheckCheck className="w-4 h-4 inline-flex mr-2" />
                              {damageItem}
                            </li>
                          ))}
                      </ul>
                    )}
                    {item?.damages && item.damages.length > 1 && (
                      <button
                        type="button"
                        className="text-primary mt-4 text-sm"
                        onClick={() => toggleShowMore(idx)}
                      >
                        {showMore[idx] ? (
                          <span className="inline-flex text-[#6445E8]">
                            <Minimize className="mr-1 mt-1 h-3.5 w-4" />
                            Show less
                          </span>
                        ) : (
                          <span className="inline-flex text-[#6445E8]">
                            <Maximize className="mr-1 mt-1 h-3.5 w-4" />
                            Show more
                          </span>
                        )}
                      </button>
                    )}

                    {item?.comments ? (
                      <p className="mt-1 text-muted-foreground text-sm">
                        {item.comments}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm capitalize text-muted-foreground">
                    {item?.deliveryType === "pick-up" ? (
                      <div className="text-muted-foreground inline-flex">
                        <Bike className="mb-2 h-5 w-4 mr-1.5 text-[#6445E8]" />
                        Pick Up
                      </div>
                    ) : item?.deliveryType === "drop-off" ? (
                      <div className="text-muted-foreground inline-flex">
                        <Package className="mb-2 h-5 w-4 mr-1.5 text-[#6445E8]" />
                        Drop Off
                      </div>
                    ) : null}
                  </p>
                  <p className="text-sm capitalize text-muted-foreground">
                    <span className="font-semibold">Location:</span>{" "}
                    <span className="capitalize">
                      {item.address || item.dropOffLocation}
                    </span>
                  </p>
                </div>

                <div className="hidden sm:flex items-center justify-center">
                  <PriorityBadge priority={item.priority} />
                </div>

                <div className="flex flex-col items-end text-right">
                  <span className="text-sm mb-4 text-primary">
                    {formatDateTime(item._creationTime)}
                  </span>
                  <RepairStatus status={item.status} />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            You have no {filter === "all" ? "repair" : filter} history.
          </p>
        )}
      </div>
    </main>
  );
};