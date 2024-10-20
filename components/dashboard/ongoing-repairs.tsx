"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { CheckCheck, Clock, Minimize, Maximize } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";

function OngoingRepairCard() {
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

  const formatDateTime = (dateString: number) => {
    const date = new Date(dateString);
    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();

    const timeString = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${
      isToday ? "Submitted today" : date.toLocaleDateString("en-GB")
    } ${timeString}`;
  };

  const [showMore, setShowMore] = useState<{ [key: number]: boolean }>({});

  const toggleShowMore = (index: number) => {
    setShowMore((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Card className="rounded-xl overflow-hidden mt-4">
      <CardContent className="p-0 flex">
        {repairRequests &&
        repairRequests
          .filter((repairRequest) => repairRequest.status === "in-progress")
          .sort(
            (a, b) =>
              new Date(b._creationTime).getTime() -
              new Date(a._creationTime).getTime()
          )
          .slice(0, 1).length > 0
          ? repairRequests
              .filter((repairRequest) => repairRequest.status === "in-progress")
              .sort(
                (a, b) =>
                  new Date(b._creationTime).getTime() -
                  new Date(a._creationTime).getTime()
              )
              .slice(0, 1)
              .map((repairRequest, idx) => (
                <div key={repairRequest._id} className="flex w-full">
                  <div
                    className={cn(
                      "relative w-full",
                      "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
                      "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
                      "text-neutral-900 w-[220px]"
                    )}
                  >
                    {repairRequest?.contentType?.startsWith("image/") ? (
                      <img
                        src={
                          repairRequest?.fileUrl || "/images/placeholder.svg"
                        }
                        alt={repairRequest?.model || "Device Image"}
                        width={200}
                        height={200}
                        className="object-cover absolute h-full w-full inset-0"
                      />
                    ) : repairRequest?.contentType?.startsWith("video/") ? (
                      <img
                        src="/images/placeholder.svg"
                        alt={repairRequest?.model || "Device Image"}
                        width={200}
                        height={200}
                        className="object-cover absolute h-full w-full inset-0"
                      />
                    ) : (
                      <img
                        src="/images/placeholder.svg"
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
                        <div>
                          {repairRequest?.damages && (
                            <ul>
                              {repairRequest.damages
                                .slice(
                                  0,
                                  showMore[idx]
                                    ? repairRequest.damages.length
                                    : 1
                                )
                                .map((damageItem: string, index: number) => (
                                  <li
                                    key={index}
                                    className="mt-1 font-semibold text-sm capitalize"
                                  >
                                    <CheckCheck className="w-4 h-4 inline-flex mr-2" />
                                    {damageItem}
                                  </li>
                                ))}
                            </ul>
                          )}
                          {repairRequest?.damages &&
                            repairRequest.damages.length > 1 && (
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

                          {repairRequest?.comments ? (
                            <p className="mt-1 text-muted-foreground text-sm">
                              {repairRequest.comments}
                            </p>
                          ) : null}
                        </div>
                      </p>
                      <p className="mt-4 text-sm">
                        Requested:
                        <br />
                        <span className="font-semibold">
                          {repairRequest?._creationTime &&
                            repairRequest._creationTime > 0 && (
                              <ul>
                                <p className="mt-1 font-semibold text-sm">
                                  <Clock className="w-4 h-4 inline-flex mr-2" />
                                  {formatDateTime(repairRequest._creationTime)}
                                </p>
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
                    <div className="w-full text-sm flex repairRequests-center p-3 gap-2 cursor-pointer">
                      Repair timeline: 5 -7 days
                    </div>
                  </div>
                </div>
              ))
          : null}
      </CardContent>
    </Card>
  );
};

export default OngoingRepairCard;