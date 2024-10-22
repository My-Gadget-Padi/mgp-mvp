"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bike, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import LoaderSpinner from "../loader/loader-spinner";
import { Stepper } from "./stepper";
import { Checkbox } from "../ui/checkbox";

interface SelectDeviceProps {
  requestId: Id<"repairRequests">;
}

interface Town {
  name: string;
}

interface LGA {
  name: string;
}

interface State {
  name: string;
  state_code: string;
  capital: string;
  lgas: LGA[];
  towns: Town[];
}

const Delivery = ({ requestId }: SelectDeviceProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [zipCode, setZipCode] = useState("");
  const [country] = useState("Nigeria");
  const [address, setAddress] = useState<string>("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("pick-up");

  const [states, setStates] = useState<State[]>([]);
  const [lgas, setLgas] = useState<LGA[]>([]);
  const [towns, setTowns] = useState<Town[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedLga, setSelectedLga] = useState<string>("");
  const [selectedTown, setSelectedTown] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const [saveAddress, setSaveAddress] = useState(false);

  const repairRequest = useQuery(api.repairRequests.getRepairRequestById, {
    requestId,
  });

  const updateRequest = useMutation(api.repairRequests.updateRepairRequest);

  const saveUserAddress = useMutation(api.users.updateUser);

  const cancelRequest = useMutation(api.repairRequests.deleteRepairRequest);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "https://nigeria-states-towns-lgas.onrender.com/api/all"
        );
        const data: State[] = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, [userId]);

  useEffect(() => {
    const fetchDetails = () => {
      const state = states.find((state) => state.state_code === selectedState);
      if (state) {
        if (state.lgas) {
          setLgas(state.lgas);
        } else {
          setLgas([]);
        }

        setCity(state.capital || "");

        if (state.towns) {
          setTowns(state.towns);
        } else {
          setTowns([]);
        }
      } else {
        setLgas([]);
        setCity("");
        setTowns([]);
      }
    };

    fetchDetails();
  }, [selectedState, states]);

  const handleDropOffChange = (value: string) => {
    setDropOffLocation(value);
  };

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleUpdate = async () => {
    if (deliveryMethod === "pick-up" && !selectedState.trim()) {
      toast({
        title: "Please select a state to schedule a device pick up",
      });
      return;
    }

    if (deliveryMethod === "pick-up" && !address.trim()) {
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

    const formattedAddress = [
      address?.trim() || null,
      selectedLga?.trim() || null,
      selectedTown?.trim() || null,
      city?.trim() || null,
      selectedState ? capitalizeFirstLetter(selectedState) : null,
      country?.trim() || null,
      zipCode?.trim() || null,
    ]
      .filter(part => part !== null)
      .join(", ")
      .replace(/(,\s?)+$/g, "");

    const finalAddress =
        formattedAddress === country?.trim()
          ? userProfile?.address
          : formattedAddress;

    if (saveAddress === true) {
      await saveUserAddress({
        userId: userProfile?._id as Id<"users">,
        address: finalAddress,
      });
    }

    setIsLoading(true);

    try {
      await updateRequest({
        requestId,
        deliveryType: deliveryMethod,
        address: finalAddress || "",
        dropOffLocation: dropOffLocation || "",
        status: "scheduled",
      });

      setDropOffLocation("");

      setIsLoading(false);

      toast({
        title: "Device delivery method has been selected!",
      });

      router.push(`/repair/review/${requestId}`);
    } catch (error) {
      toast({
        title: "Repair request is unsuccessful",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //Cancel repair
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

  const handleCompleteWithProfileAddress = async () => {
    setIsLoading(true);

    try {
      await updateRequest({
        requestId,
        deliveryType: deliveryMethod,
        address: userProfile?.address,
        status: "scheduled",
      });

      setDropOffLocation("");

      setIsLoading(false);

      toast({
        title: "Device delivery method has been selected!",
      });
      router.push(`/repair/review/${requestId}`);
    } catch (error) {
      toast({
        title: "Repair request is unsuccessful",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <Stepper currentStep={2} />

      <div>
        <h1 className="text-xl sm:text-2xl font-semibold">
          How do you want to get the gadget to us
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Which category best describes what you want to repair
        </p>
      </div>

      <div>
        <RadioGroup
          value={deliveryMethod}
          onValueChange={setDeliveryMethod}
          className="grid grid-cols-2 gap-6"
        >
          <label
            htmlFor="pick-up"
            className={`relative border rounded-xl p-4 cursor-pointer ${
              deliveryMethod === "pick-up"
                ? "border-[#6445E8]"
                : "border-gray-300"
            }`}
          >
            <Bike
              className={`mb-3 h-6 w-6 ${
                deliveryMethod === "pick-up"
                  ? "text-[#6445E8]"
                  : "text-muted-foreground"
              }`}
            />
            <h2 className="mt-4 text-lg font-medium">Pickup</h2>
            <p className="text-muted-foreground text-xs sm:text-sm">
              I would like someone to pick it up from my location
            </p>
            <span
              className={`absolute top-4 right-4 ${
                deliveryMethod === "pick-up" ? "" : ""
              }`}
            >
              <RadioGroupItem
                value="pick-up"
                id="pick-up"
                className="h-6 w-6"
                innerCircleClassName="text-[#6445E8] h-4 w-4"
                checked={deliveryMethod === "pick-up"}
              />
            </span>

            <Image
              src="/images/delivery/pick-up.png"
              alt="pick-up"
              width={100}
              height={100}
              quality={100}
              unoptimized
              className="hidden sm:flex w-full h-48 object-cover rounded-lg mt-4"
            />
          </label>

          <label
            htmlFor="drop-off"
            className={`relative border rounded-xl p-4 cursor-pointer ${
              deliveryMethod === "drop-off"
                ? "border-[#6445E8]"
                : "border-gray-300"
            }`}
          >
            <Package
              className={`mb-3 h-6 w-6 ${
                deliveryMethod === "drop-off"
                  ? "text-[#6445E8]"
                  : "text-muted-foreground"
              }`}
            />
            <h2 className="mt-4 text-lg font-medium">Drop off</h2>
            <p className="text-muted-foreground text-xs sm:text-sm">
              I will bring the gadget to a drop-off point myself
            </p>
            <span
              className={`absolute top-4 right-4 ${
                deliveryMethod === "pick-up" ? "" : ""
              }`}
            >
              <RadioGroupItem
                value="drop-off"
                id="drop-off"
                className="h-6 w-6"
                innerCircleClassName="text-[#6445E8] h-4 w-4"
                checked={deliveryMethod === "drop-off"}
              />
            </span>

            <Image
              src="/images/delivery/drop-off.png"
              alt="drop-off"
              width={100}
              height={100}
              quality={100}
              unoptimized
              className="hidden sm:flex w-full h-48 object-cover rounded-lg mt-4"
            />
          </label>
        </RadioGroup>
      </div>

      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <div>
          <Card>
            <CardContent className="grid gap-6 mt-4">
              {deliveryMethod === "pick-up" ? (
                <>
                  {userProfile?.address ? (
                    <div className="">
                      <div className="text-sm text-muted-foreground">
                        Saved address{" "}
                        <Link
                          href="/settings"
                          target="_blank"
                          className="hover:underline"
                        >
                          (on your account)
                        </Link>
                        :{" "}
                        <span className="font-semibold text-[#6445E8]">
                          {userProfile?.address}
                        </span>
                      </div>
                      <Button
                        onClick={handleCompleteWithProfileAddress}
                        disabled={isLoading}
                        className="mt-1.5 border-[#6445E8] hover:bg-[#6445E8] hover:text-white"
                        size="sm"
                        variant="outline"
                      >
                        Use address
                      </Button>
                      <Separator className="my-2" />
                    </div>
                  ) : null}
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="address">
                        Address{" "}
                        <span className="text-muted-foreground text-sm italic">
                          (must include apartment number if any)
                        </span>
                      </Label>
                      <Input
                        id="address"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={selectedState}
                          onValueChange={(value) => {
                            setSelectedState(value);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>States</SelectLabel>
                              {states.map((state) => (
                                <SelectItem
                                  key={state.state_code}
                                  value={state.state_code}
                                >
                                  {state.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="city">Capital</Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="City/Capital"
                          value={city}
                          readOnly
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="town">
                          Town{" "}
                          <span className="text-xs text-muted-foreground italic">
                            (optional)
                          </span>
                        </Label>
                        <Select
                          value={selectedTown}
                          onValueChange={setSelectedTown}
                          disabled={!Array.isArray(towns) || towns.length === 0}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                towns.length ? "Select a town" : "Select a town"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Towns</SelectLabel>
                              {towns.map((town) => (
                                <SelectItem key={town.name} value={town.name}>
                                  {town.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="city">
                          LGA{" "}
                          <span className="text-xs text-muted-foreground italic">
                            (optional)
                          </span>
                        </Label>
                        <Select
                          value={selectedLga}
                          onValueChange={setSelectedLga}
                          disabled={!Array.isArray(lgas) || lgas.length === 0}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                lgas.length
                                  ? "Select your lga"
                                  : "Select your lga"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>LGAs</SelectLabel>
                              {lgas.map((lga) => (
                                <SelectItem key={lga.name} value={lga.name}>
                                  {lga.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {/** 
                        <div className="grid gap-2">
                          <Label htmlFor="zipCode">ZipCode/Postal Code</Label>
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
                        */}
                      <div className="grid gap-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          placeholder="Nigeria"
                          disabled
                          value={country}
                        />
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="saveAddress"
                            checked={saveAddress}
                            onCheckedChange={(checked) => {
                              if (typeof checked === "boolean") {
                                setSaveAddress(checked);
                              }
                            }}
                          />
                          <label
                            htmlFor="saveAddress"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Save address for next time
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Button
                      className="w-full bg-[#6445E8] hover:bg-[#3A11E6] py-6 px-10 rounded-lg"
                      onClick={handleUpdate}
                      disabled={isLoading}
                    >
                      Continue
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
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
                        <SelectItem value="ikeja, lagos">
                          Ikeja, Lagos
                        </SelectItem>
                        <SelectItem value="mokola, ibadan">
                          Mokola, Ibadan
                        </SelectItem>
                        <SelectItem value="futa, akure">FUTA, Akure</SelectItem>
                        <SelectItem value="alagbaka, akure">
                          Alagbaka, Akure
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="ml-auto">
                    <Button
                      className="w-full bg-[#6445E8] hover:bg-[#3A11E6] py-6 px-10 rounded-lg"
                      onClick={handleUpdate}
                      disabled={isLoading}
                    >
                      Continue
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
};

export default Delivery;