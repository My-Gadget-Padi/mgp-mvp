"use client";

import * as React from "react";
import { useState } from "react";
import { CheckCheck, Minimize, Maximize } from "lucide-react";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";

const PreviousRepairs = () => {
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
      // Today
      return `Today ${timeString}`;
    } else if (daysDifference === 1) {
      // Yesterday
      return `Yesterday ${timeString}`;
    } else if (daysDifference < 7) {
      // Within the last week, show the day of the week
      const dayOfWeek = date.toLocaleDateString("en-GB", { weekday: "long" });
      return `${dayOfWeek} ${timeString}`;
    } else if (daysDifference < 14) {
      // Last week, specify the day of the week
      const dayOfWeek = date.toLocaleDateString("en-GB", { weekday: "long" });
      return `Last week ${dayOfWeek} ${timeString}`;
    } else if (today.getFullYear() === date.getFullYear()) {
      // Same year, show month and day
      const monthDayString = date.toLocaleDateString("en-GB", {
        month: "long",
        day: "numeric",
      });
      return `${monthDayString} ${timeString}`;
    } else {
      // Different year, show full date
      const fullDateString = date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return `${fullDateString} ${timeString}`;
    }
  };

  const [showMore, setShowMore] = useState<{ [key: number]: boolean }>({});

  const toggleShowMore = (index: number) => {
    setShowMore((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-4">
      {repairRequests &&
      repairRequests
        .filter((repairRequest) => repairRequest.status === "completed")
        .sort(
          (a, b) =>
            new Date(b._creationTime).getTime() -
            new Date(a._creationTime).getTime()
        )
        .slice(0, 3).length > 0 ? (
        repairRequests
          .filter((repairRequest) => repairRequest.status === "completed")
          .sort(
            (a, b) =>
              new Date(b._creationTime).getTime() -
              new Date(a._creationTime).getTime()
          )
          .slice(0, 3)
          .map((repairRequest, idx) => (
            <Card
              key={repairRequest._id}
              className="p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium mb-3">{repairRequest?.model}</p>
                <div>
                  {repairRequest?.damages && (
                    <ul>
                      {repairRequest.damages
                        .slice(
                          0,
                          showMore[idx] ? repairRequest.damages.length : 1
                        )
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
              </div>
              <div>
                <p className="text-sm mb-3 text-muted-foreground">
                  {" "}
                  {formatDateTime(repairRequest._creationTime)}
                </p>

                <p className="text-green-500 text-sm capitalize">
                  {repairRequest.status}
                </p>
              </div>
            </Card>
          ))
      ) : (
        <span className="text-muted-foreground">
          You have no previous repairs.
        </span>
      )}
    </div>
  );
};

export default PreviousRepairs;