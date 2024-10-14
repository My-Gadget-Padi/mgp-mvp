"use client";
import * as React from "react";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
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
  Route,
  Loader,
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useUser } from "@clerk/nextjs";

interface SelectDeviceProps {
  requestId: Id<"repairRequests">;
}

const SelectDelivery = ({ requestId }: SelectDeviceProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ownLoading, setOwnLoading] = useState<boolean>(false);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country] = useState("Nigeria");
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("pick-up");

  const repairRequest = useQuery(api.repairRequests.getRepairRequestById, {
    requestId,
  });

  const updateRequest = useMutation(api.repairRequests.updateRepairRequest);

  const cancelRequest = useMutation(api.repairRequests.deleteRepairRequest);

  const handleAddressChange = () => {
    const formattedAddress = `${address} ${
      address2 ? `${address2}, ` : ""
    }${city}, ${state}, ${zipCode}, ${country}`;
    setPickUpAddress(formattedAddress);
  };

  const handleDropOffChange = (value: string) => {
    setDropOffLocation(value);
  };

  const handleUpdate = async () => {
    if (!deliveryMethod) {
      toast({
        title: "Please select a delivery method",
      });
      return;
    }

    if (deliveryMethod === "pick-up" && !pickUpAddress.trim()) {
      toast({
        title: "Please enter your address to schedule a device pick up",
      });
      return;
    }

    if (deliveryMethod === "drop-off" && !dropOffLocation.trim()) {
      toast({
        title: "Please select a drop off location closest to you",
      });
      return;
    }

    setIsLoading(true);

    try {
      await updateRequest({
        requestId,
        deliveryType: deliveryMethod,
        address: pickUpAddress || "",
        dropOffLocation: dropOffLocation || "",
        status: "scheduled",
      });

      setPickUpAddress("");
      setDropOffLocation("");

      toast({
        title: "Device delivery method has been selected!",
      });
      router.push(`/dashboard/request-fix/review/${requestId}`);
    } catch (error) {
      console.error("Repair request updated", error);
      toast({
        title: "Repair request is unsuccessful",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      router.push("/dashboard/request-fix");
    } catch (error) {
      toast({ title: "Failed to cancel repair request!" });
    }
  };

  const trackRepair = async (requestId: Id<"repairRequests">) => {
    router.push(`/dashboard/repairs/${requestId}`);
  };

  const handleCompleteWithProfileAddress = async () => {
    if (!deliveryMethod) {
      toast({
        title: "Please select a delivery method",
      });
      return;
    }

    setOwnLoading(true);

    try {
      await updateRequest({
        requestId,
        deliveryType: deliveryMethod,
        address: userProfile?.address,
        status: "scheduled",
      });

      setPickUpAddress("");
      setDropOffLocation("");

      toast({
        title: "Device delivery method has been selected!",
      });
      router.push(`/dashboard/request-fix/review/${requestId}`);
    } catch (error) {
      console.error("Repair request updated", error);
      toast({
        title: "Repair request is unsuccessful",
        variant: "destructive",
      });
    } finally {
      setOwnLoading(false);
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
                  <BreadcrumbPage>
                    <Link href={`/dashboard/request-fix/delivery/${requestId}`}>
                      Delivery Details
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
                      <CardTitle>How do we receive it?</CardTitle>
                      <CardDescription>
                        Select how you would like us to receive your device.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <RadioGroup
                        defaultValue="pick-up"
                        onValueChange={setDeliveryMethod}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div>
                          <RadioGroupItem
                            value="pick-up"
                            id="pick-up"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="pick-up"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Bike className="mb-3 h-6 w-6" />
                            Request pick up
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="drop-off"
                            id="drop-off"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="drop-off"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Package className="mb-3 h-6 w-6" />
                            Bring it to us
                          </Label>
                        </div>
                      </RadioGroup>
                      {deliveryMethod === "pick-up" ? (
                        <>
                          {userProfile?.address === "" ? null : (
                            <div className="">
                              <div className="text-sm text-muted-foreground">
                                Saved address <Link href="/dashboard/settings/account" target="_blank" className="hover:underline">(on your account)</Link>: <span className="font-semibold">{userProfile?.address}</span>
                              </div>
                              <Button
                                onClick={handleCompleteWithProfileAddress}
                                disabled={ownLoading}
                                className="mt-1.5"
                                size="sm"
                                variant="outline"
                              >
                                {ownLoading ? (
                                  <Loader size={20} className="animate-spin ml-2" />
                                ) : (
                                  "Use address"
                                )}
                              </Button>
                              <Separator className="my-2" />
                            </div>
                          )}
                          <div className="grid gap-6">
                            <div className="grid gap-2">
                              <Label htmlFor="address">Address</Label>
                              <Input
                                id="address"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                  handleAddressChange();
                                }}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="address-2">
                                Address 2 / Apt. Number
                              </Label>
                              <Input
                                id="address-2"
                                placeholder="Apt #"
                                value={address2}
                                onChange={(e) => {
                                  setAddress2(e.target.value);
                                  handleAddressChange();
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                  id="city"
                                  placeholder="City"
                                  value={city}
                                  onChange={(e) => {
                                    setCity(e.target.value);
                                    handleAddressChange();
                                  }}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="state">State / Region</Label>
                                <Input
                                  id="state"
                                  placeholder="State"
                                  value={state}
                                  onChange={(e) => {
                                    setState(e.target.value);
                                    handleAddressChange();
                                  }}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="zipCode">
                                  ZipCode/Postal Code
                                </Label>
                                <Input
                                  id="zipCode"
                                  placeholder="ZipCode"
                                  value={zipCode}
                                  onChange={(e) => {
                                    setZipCode(e.target.value);
                                    handleAddressChange();
                                  }}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                  id="country"
                                  placeholder="Nigeria"
                                  disabled
                                  value={country}
                                />
                              </div>
                            </div>
                          </div>
                          <Button
                            className="w-full"
                            onClick={handleUpdate}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader size={20} className="animate-spin ml-2" />
                            ) : (
                              "Complete"
                            )}
                          </Button>
                        </>
                      ) : (
                        <>
                          <div>
                            <Label htmlFor="dropOffLocations">
                              MyGadgetPadi Drop-off Points
                            </Label>
                            <Select
                              onValueChange={handleDropOffChange}
                              value={dropOffLocation}
                            >
                              <SelectTrigger id="dropOffLocation">
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ikeja, lagos">Ikeja, Lagos</SelectItem>
                                <SelectItem value="mokola, ibadan">
                                  Mokola, Ibadan
                                </SelectItem>
                                <SelectItem value="futa, akure">FUTA, Akure</SelectItem>
                                <SelectItem value="alagbaka, akure">Alagbaka, Akure</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            className="w-full"
                            onClick={handleUpdate}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader size={20} className="animate-spin ml-2" />
                            ) : (
                              "Complete"
                            )}
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
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
                        Request ID: {repairRequest?._id.slice(0, 8)}***
                        <CopyToClipboard text={requestId}>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <Copy
                              className="h-3 w-3"
                              onClick={() =>
                                toast({
                                  title: "Request ID copied to clipboard!",
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
                    {/**
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
                        <Route className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                          Track Repair
                        </span>
                      </Button>
                    </div>
                    */}
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
                        src={
                          repairRequest?.fileUrl ||
                          "/images/device-placeholder.jpg"
                        }
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
                        poster="/images/device-placeholder.jpg"
                        height={100}
                        width={250}
                      >
                        <source
                          src={repairRequest?.fileUrl}
                          type={repairRequest?.contentType}
                        />
                        <source
                          src={repairRequest?.fileUrl}
                          type="video/webm"
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        className="rounded-md object-cover"
                        height={100}
                        width={250}
                        src="/images/device-placeholder.jpg"
                        alt="Device placeholder"
                        quality={100}
                        unoptimized
                      />
                    )}
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

export default SelectDelivery;