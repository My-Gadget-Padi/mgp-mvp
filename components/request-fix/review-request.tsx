"use client";
import * as React from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CalendarClock,
  CheckCheck,
  Bike,
  Package,
  Copy,
  Truck,
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
import { ScrollArea } from "../ui/scroll-area";
import { UserNav } from "../user-nav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { format } from "date-fns";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface SelectDeviceProps {
  requestId: Id<"repairRequests">;
}

const ReviewRequest = ({ requestId }: SelectDeviceProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const repairRequest = useQuery(api.repairRequests.getRepairRequestById, {
    requestId,
  });

  const cancelRequest = useMutation(api.repairRequests.deleteRepairRequest);

  const handleLaunchWhatsApp = async () => {
    const details = encodeURIComponent(
      `
      Device:
      ${repairRequest?.model}

      Damage(s):
      ${repairRequest?.damages?.length 
        ? repairRequest.damages.map(damage => `- ${damage}`).join('\n') 
        : 'No damages specified'}

      Priority:
      ${repairRequest?.priority}

      Delivery Method:
      ${repairRequest?.deliveryType} - [${repairRequest?.address || repairRequest?.dropOffLocation || ""}]

      View damage image/video:
      ${repairRequest?.fileUrl}
      `
    );

    const currentHour = new Date().getHours();

    const phoneNumber = currentHour % 2 === 0 ? "+2347076641696" : "+2347072665255";

    window.open(`https://wa.me/${phoneNumber}?text=${details}`, "_blank");
  };

  const handleCancel = async (requestId: Id<"repairRequests">) => {
    try {
      await cancelRequest({
        requestId,
      });

      toast({ title: "Repair request cancelled successfully!" });
      router.push("/dashboard/request-fix");
    } catch (error) {
      toast({ title: "Failed to cancel repair request!" });
    }
  };

  const trackRepair = async (requestId: Id<"repairRequests">) => {
    router.push(`/dashboard/repairs/${requestId}`);
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">
                  Fix your{" "}
                  <span className="capitalize">{repairRequest?.device}</span>
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
                <BreadcrumbItem
                  onClick={() =>
                    handleCancel(repairRequest?._id as Id<"repairRequests">)
                  }
                >
                  Request a Fix
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link href={`/dashboard/request-fix/${requestId}`}>
                    Select Device
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link href={`/dashboard/request-fix/damage/${requestId}`}>
                    Damage Details
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link href={`/dashboard/request-fix/delivery/${requestId}`}>
                      Delivery Details
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link href={`/dashboard/request-fix/review/${requestId}`}>
                      Review Request
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="grid gap-4 p-4 sm:py-0">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4">
                <div className="items-center gap-2 ml-auto flex">
                  <Button onClick={handleLaunchWhatsApp}>Yes, request fix</Button>
                </div>
              </div>
              <div className="col-span-1">
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-05-chunk-4"
                >
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        Request ID: {repairRequest?._id.slice(0, 8)}...
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Copy className="h-3 w-3" />
                          <span className="sr-only">Copy Order ID</span>
                        </Button>
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
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1"
                        onClick={() =>
                          trackRepair(
                            repairRequest?._id as Id<"repairRequests">
                          )
                        }
                      >
                        <Truck className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                          Track Repair
                        </span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Repair Details</div>
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Device</span>
                          <span>{repairRequest?.model}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Damage(s)
                          </span>
                          <div className="ml-auto">
                            {repairRequest?.damages && (
                              <ul>
                                {repairRequest.damages.map(
                                  (damageItem: string, index: number) => (
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
                          </div>
                        </li>
                      </ul>
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Priority
                          </span>
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
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Status</span>

                          {repairRequest?.status === "scheduled" ? (
                            <span className="inline-flex">
                              <CalendarClock className="h-5 w-4 mr-1.5 text-muted-foreground" />
                              Scheduled
                            </span>
                          ) : null}
                        </li>
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid auto-rows-max gap-3">
                        <div className="font-semibold">Delivery Method</div>
                        {repairRequest?.deliveryType === "pick-up" ? (
                          <div className="text-muted-foreground inline-flex">
                            <Bike className="mb-3 h-5 w-4 mr-1.5" />
                            Pick Up
                          </div>
                        ) : repairRequest?.deliveryType === "drop-off" ? (
                          <div className="text-muted-foreground inline-flex">
                            <Package className="mb-3 h-5 w-4 mr-1.5" />
                            Drop Off
                          </div>
                        ) : null}
                      </div>
                      <div className="grid gap-3 ml-auto">
                        <div className="font-semibold">Address</div>
                        {repairRequest?.address ? (
                          <address className="grid gap-0.5 not-italic text-muted-foreground capitalize">
                            <span>{repairRequest?.address}</span>
                          </address>
                        ) : repairRequest?.dropOffLocation ? (
                          <address className="grid gap-0.5 not-italic text-muted-foreground capitalize">
                            <span>
                              {repairRequest?.dropOffLocation}
                            </span>
                          </address>
                        ) : null}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t px-6 py-3">
                    <Image
                      className="rounded-md object-cover"
                      height="100"
                      width="200"
                      src={
                        (repairRequest?.fileUrl as string) ||
                        "/images/device-placeholder.jpg"
                      }
                      alt={
                        (repairRequest?.brandName as string) ||
                        "Device placeholder"
                      }
                    />
                  </CardFooter>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ReviewRequest;