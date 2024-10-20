"use client";

import * as React from "react";
import { useState } from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CalendarClock,
  CheckCheck,
  Bike,
  Package,
  Copy,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Stepper } from "./stepper";
import LoaderSpinner from "../loader/loader-spinner";

interface SelectDeviceProps {
  requestId: Id<"repairRequests">;
}

const Review = ({ requestId }: SelectDeviceProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<{ [key: number]: boolean }>({});

  const repairRequest = useQuery(api.repairRequests.getRepairRequestById, {
    requestId,
  });

  const cancelRequest = useMutation(api.repairRequests.deleteRepairRequest);

  const handleComplete = async () => {
    setIsLoading(true);
    toast({
      title: "Success",
      description: "Your repair request is now complete!",
    });
    setIsLoading(false);
    router.push(`/repair/complete/${requestId}`);
  };

  const toggleShowMore = (index: number) => {
    setShowMore((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Cancel request
  const handleCancel = async (requestId: Id<"repairRequests">) => {
    try {
      await cancelRequest({
        requestId,
        fileStorageId:
          repairRequest?.fileStorageId !== null
            ? repairRequest?.fileStorageId
            : undefined,
      });

      toast({ title: "Repair request cancelled successfully!" });
      router.push("/repair");
    } catch (error) {
      toast({ title: "Failed to cancel repair request!" });
    }
  };

  return (
    <main className="flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <Stepper currentStep={3} />
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-[#6445E8]/10">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Request ID: {repairRequest?._id.slice(0, 8)}***
                    <CopyToClipboard text={requestId}>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 sm:h-8 sm:w-8 hidden sm:flex"
                      >
                        <Copy
                          className="h-3 w-3 sm:h-4 sm:w-4 text-[#6445E8]"
                          onClick={() =>
                            toast({
                              title: "Success 🎉",
                              description:
                                "Request ID has been copied to clipboard!",
                            })
                          }
                        />
                        <span className="sr-only">Copy Request ID</span>
                      </Button>
                    </CopyToClipboard>
                  </CardTitle>
                  <CardDescription>
                    Date:{" "}
                    {repairRequest?._creationTime
                      ? format(
                          new Date(repairRequest._creationTime),
                          "MMMM dd, yyyy"
                        )
                      : "N/A"}
                  </CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button
                    onClick={handleComplete}
                    className="bg-[#6445E8] hover:bg-[#6445E8]/90"
                  >
                    Complete
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Repair Details</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Device:</span>
                      <span>{repairRequest?.model}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Damage(s):</span>
                      <div className="ml-auto">
                        {repairRequest?.damages && (
                          <ul>
                            {repairRequest.damages
                              .slice(
                                0,
                                showMore[1] ? repairRequest.damages.length : 1
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
                              onClick={() => toggleShowMore(1)}
                            >
                              {showMore[1] ? (
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
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Priority:</span>
                      {repairRequest?.priority === "high" ? (
                        <span className="inline-flex">
                          <ArrowUp className="h-5 w-4 mr-1.5 text-[#6445E8]" />
                          High
                        </span>
                      ) : repairRequest?.priority === "medium" ? (
                        <span className="inline-flex">
                          <ArrowRight className="h-5 w-4 mr-1.5 text-[#6445E8]" />
                          Medium
                        </span>
                      ) : repairRequest?.priority === "low" ? (
                        <span className="inline-flex">
                          <ArrowDown className="h-5 w-4 mr-1.5 text-[#6445E8]" />
                          Low
                        </span>
                      ) : null}
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status:</span>

                      {repairRequest?.status === "scheduled" ? (
                        <span className="inline-flex">
                          <CalendarClock className="h-5 w-4 mr-1.5 text-[#6445E8]" />
                          Scheduled
                        </span>
                      ) : null}
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Delivery Method:</div>
                    {repairRequest?.deliveryType === "pick-up" ? (
                      <div className="text-muted-foreground inline-flex">
                        <Bike className="mb-3 h-5 w-4 mr-1.5 text-[#6445E8]" />
                        Pick Up
                      </div>
                    ) : repairRequest?.deliveryType === "drop-off" ? (
                      <div className="text-muted-foreground inline-flex">
                        <Package className="mb-3 h-5 w-4 mr-1.5 text-[#6445E8]" />
                        Drop Off
                      </div>
                    ) : null}
                  </div>
                  <div className="grid ml-auto">
                    <div className="font-semibold">Address:</div>
                    {repairRequest?.address ? (
                      <address className="grid gap-0.5 not-italic text-muted-foreground capitalize">
                        <span>{repairRequest?.address}</span>
                      </address>
                    ) : repairRequest?.dropOffLocation ? (
                      <address className="grid gap-0.5 not-italic text-muted-foreground capitalize">
                        <span>{repairRequest?.dropOffLocation}</span>
                      </address>
                    ) : null}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t px-6 py-3">
                {repairRequest?.contentType?.startsWith("image/") ? (
                  <Image
                    className="rounded-md object-cover"
                    height={100}
                    width={250}
                    src={repairRequest?.fileUrl || "/images/placeholder.svg"}
                    alt={repairRequest?.brandName || "Device placeholder"}
                    quality={100}
                    unoptimized
                  />
                ) : repairRequest?.contentType?.startsWith("video/") ? (
                  <video
                    controls
                    loop
                    className="rounded-md object-contain"
                    preload="auto"
                    playsInline
                    poster="/images/placeholder.svg"
                    height={100}
                    width={250}
                  >
                    <source
                      src={repairRequest?.fileUrl}
                      type={repairRequest?.contentType}
                    />
                    <source src={repairRequest?.fileUrl} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    className="rounded-md object-cover"
                    height={100}
                    width={250}
                    src="/images/placeholder.svg"
                    alt="Device placeholder"
                    quality={100}
                    unoptimized
                  />
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
};

export default Review;