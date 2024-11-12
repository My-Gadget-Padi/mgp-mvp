"use client";

import { useState } from "react";
import PageLoader from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import {
  phoneBrands,
  tabletBrands,
  laptopBrands,
  desktopBrands,
  models,
} from "@/types/deviceTypes";
import { useQuery, useMutation } from "convex/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const serialNumberPatterns = {
  iphone: /^[A-Z0-9]{8,12}$/,
  samsung: /^[A-Z0-9]{11,17}$/i,
  google: /^[A-Z0-9]{7,15}$/,
  lg: /^[A-Z0-9]{7,15}$/,
  ipad: /^[A-Z0-9]{8,12}$/,
  samsungTablet: /^[A-Z0-9]{11,17}$/,
  amazonTablet: /^[A-Z0-9]{9,15}$/,
  asusTablet: /^[A-Z0-9]{9,15}$/,
  lenovoTablet: /^[A-Z0-9]{7,15}$/,
  lgTablet: /^[A-Z0-9]{7,15}$/,
  dellLaptop: /^[A-Z0-9]{7,15}$/,
  hpLaptop: /^[A-Z0-9]{7,15}$/,
  macbook: /^[A-Z0-9]{8,12}$/,
  imac: /^[A-Z0-9]{8,12}$/,
  dellDesktop: /^[A-Z0-9]{7,15}$/,
  hpDesktop: /^[A-Z0-9]{7,15}$/,
  microsoftTablet: /^[A-Z0-9]{12}$/,
};

type DeviceType = "phone" | "tablet" | "laptop" | "desktop";

type DeviceBrandId = keyof typeof serialNumberPatterns;

export function OnboardDevice() {
  const [deviceType, setDeviceType] = useState<DeviceType | "">("");
  const [deviceBrand, setDeviceBrand] = useState<string>("");
  const [deviceModel, setDeviceModel] = useState<string>("");
  const [modelInputVisible, setModelInputVisible] = useState(false);
  const [availableModels, setAvailableModels] = useState<any[]>([]);
  const [condition, setCondition] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedProtectionId, setSelectedProtectionId] = useState<
    Id<"deviceProtections"> | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSerialValid, setIsSerialValid] = useState(true);

  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id as Id<"users">;

  const protections = useQuery(
    api.deviceProtections.getDeviceProtectionsByUserId,
    {
      userId: profileId,
    }
  );

  const onboardDevice = useMutation(api.devices.onboardDevice);

  const updateProtection = useMutation(api.deviceProtections.updateDeviceProtection);

  const activateFreePlan = useMutation(api.users.updateUser);

  const freeProtections = protections?.filter(
    (protection) =>
      protection.name === "Free Plan" &&
      protection?.activationDate?.trim() === ""
  );

  const basicProtections = protections?.filter(
    (protection) =>
      protection.name === "Basic Plan" &&
      protection?.activationDate?.trim() === ""
  );

  const proProtections = protections?.filter(
    (protection) =>
      protection.name === "Pro Plan" &&
      protection?.activationDate?.trim() === ""
  );

  const freeCount = freeProtections?.length || 0;
  const basicCount = basicProtections?.length || 0;
  const proCount = proProtections?.length || 0;

  const validateSerialNumber = (
    serialNumber: string,
    deviceBrand: DeviceBrandId
  ) => {
    const pattern = serialNumberPatterns[deviceBrand];
    if (!pattern) return false;
    return pattern.test(serialNumber);
  };

  const handleSerialNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSerialNumber(value);
    if (deviceBrand) {
      setIsSerialValid(
        validateSerialNumber(value, deviceBrand.toLowerCase() as DeviceBrandId)
      );
    }
  };

  const handleCardClick = (protectionList: any, planName: string) => {
    if (protectionList.length > 0) {
      setSelectedPlan(planName);
      setSelectedProtectionId(protectionList[0]._id);
    }
  };

  const getBrandsForDevice = (device: string | undefined) => {
    switch (device) {
      case "phone":
        return phoneBrands;
      case "tablet":
        return tabletBrands;
      case "laptop":
        return laptopBrands;
      case "desktop":
        return desktopBrands;
      default:
        return [];
    }
  };

  const handleDeviceSelection = (deviceType: DeviceType) => {
    setDeviceType(deviceType);
    setDeviceBrand("");
    setDeviceModel("");
    setAvailableModels([]);
  };

  const handleBrandChange = (id: string) => {
    const brand = getBrandsForDevice(deviceType).find(
      (brand) => brand.id === id
    );

    if (brand) {
      setDeviceBrand(brand.label);

      if (brand.id === "other") {
        setAvailableModels([]);
        setModelInputVisible(true);
        setDeviceModel("");
      } else {
        setAvailableModels(models[id] || []);
        setModelInputVisible(false);
        setDeviceModel("");
      }

      setDeviceModel("");
    }
  };

  const handleModelChange = (id: string) => {
    const model = availableModels.find((model) => model.id === id);

    if (model) {
      setDeviceModel(model.label);
    } else {
      setDeviceModel("");
    }
  };

  const handleConditionChange = (value: string) => {
    setCondition(value);
  };

  const handleDeviceOnboard = async () => {
    try {
      setLoading(true);

      const { deviceId, plan } = await onboardDevice({
        protection: selectedProtectionId as Id<"deviceProtections">,
        planName: selectedPlan,
        type: deviceType,
        brand: deviceBrand,
        model: deviceModel,
        condition,
        serialNumber
      });

      if (deviceId && plan) {
        const durationMilliseconds = plan.durationMonths * 30 * 24 * 60 * 60 * 1000
        const currentDate = new Date()
        const expiryDate = new Date(
          currentDate.getMilliseconds() + durationMilliseconds,
        )

        if (selectedPlan === "Free Plan") {
          await activateFreePlan({
            userId: userProfile?._id as Id<"users">,
            hasFreePlan: true, 
            freePlanActivationDate: currentDate.toDateString(),
          });
        }

        await updateProtection({
          protectionId: selectedProtectionId as Id<"deviceProtections">,
          deviceId,
          amountLeft: plan.maxRedemptionAmount,
          claimsAvailable: plan.claimLimit,
          activationDate: currentDate.toDateString(),
          expiryDate: expiryDate.toDateString()
        });

        if (selectedPlan === "Free Plan") {
          toast({
            title: "Success",
            description:
              "Free plan activated, you will be redirected.",
          });
          router.push(`/protection/onboard/success/${deviceId}`);
        } else {
          toast({
            title: "Success",
            description:
              "Device onboarding initiated, you will be redirected to a verification screen.",
          });
          router.push(`/protection/onboard/verification/${deviceId}`);
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Device could not be onboarded.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <main className="flex flex-1 mt-6 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:gap-8">
            {freeCount !== 0 ? (
              <Card
                className={`border-transparent shadow-md ${
                  selectedPlan === "Free Plan"
                    ? "bg-[#6445E8]/10"
                    : "bg-gray-100"
                }`}
                onClick={() => handleCardClick(freeProtections, "Free Plan")}
              >
                <CardContent className="pb-8 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg mt-2 mb-0.5 font-semibold">
                        Free plan
                      </h2>
                      {userProfile?.freePlanActivationDate ? (
                        <span className="text-sm text-muted-foreground">
                          Not available
                        </span>
                      ) : (
                        <span className="text-sm text-[#6445E8]">
                          {freeCount} available
                        </span>
                      )}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-center w-5 h-5 bg-red-500/20 rounded-full">
                            <span className="text-red-500 text-xs font-bold">
                              !
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {userProfile?.freePlanActivationDate ? (
                            <p className="text-muted-foreground">
                              Your free plan is no longer available.
                            </p>
                          ) : (
                            <p className="text-[#6445E8]">
                              Your free plan is available to use.
                            </p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {basicCount !== 0 ? (
              <Card
                className={`border-transparent shadow-md ${
                  selectedPlan === "Basic Plan"
                    ? "bg-[#FFBA43]/10"
                    : "bg-gray-100"
                }`}
                onClick={() => handleCardClick(basicProtections, "Basic Plan")}
              >
                <CardContent className="pb-8 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg mt-2 mb-0.5 font-semibold">
                        Basic plan
                      </h2>
                      <span className="text-sm text-[#6445E8]">
                        {basicCount} available
                      </span>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-center w-5 h-5 bg-red-500/20 rounded-full">
                            <span className="text-red-500 text-xs font-bold">
                              !
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-[#6445E8]">
                            Your basic plan is available to use.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {proCount !== 0 ? (
              <Card
                className={`border-transparent shadow-md ${
                  selectedPlan === "Pro Plan"
                    ? "bg-[#38C793]/10"
                    : "bg-gray-100"
                }`}
                onClick={() => handleCardClick(proProtections, "Pro Plan")}
              >
                <CardContent className="pb-8 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg mt-2 mb-0.5 font-semibold">
                        Pro plan
                      </h2>
                      <span className="text-sm text-[#6445E8]">
                        {proCount} available
                      </span>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-center w-5 h-5 bg-red-500/20 rounded-full">
                            <span className="text-red-500 text-xs font-bold">
                              !
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-[#6445E8]">
                            Your pro plan is available to use.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>

          <div className="grid gap-3 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="deviceType">Type</Label>
              <Select
                value={deviceType}
                onValueChange={(value) =>
                  handleDeviceSelection(value as DeviceType)
                }
                disabled={!selectedProtectionId}
              >
                <SelectTrigger
                  id="deviceType"
                  className="w-full bg-gray-50 border-gray-200"
                >
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mt-2.5 gap-2">
              <Label htmlFor="brand">Brand</Label>
              <Select
                onValueChange={(id: string) => handleBrandChange(id)}
                disabled={!deviceType}
              >
                <SelectTrigger id="brand">
                  <SelectValue placeholder={`Select ${deviceType} brand`} />
                </SelectTrigger>
                <SelectContent>
                  {getBrandsForDevice(deviceType).map((brand) => (
                    <SelectItem
                      key={brand.id}
                      value={brand.id}
                      className="flex items-center"
                    >
                      {brand.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid mt-2.5 gap-2">
              <Label htmlFor="model">
                {deviceBrand
                  ? `Which ${deviceBrand.toLowerCase()} model is it?`
                  : `Model`}
              </Label>
              {modelInputVisible ? (
                <Input
                  type="text"
                  id="model"
                  placeholder="Please type in the name of the device"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                />
              ) : (
                <Select
                  onValueChange={(id: string) => handleModelChange(id)}
                  disabled={!deviceBrand || availableModels.length === 0}
                >
                  <SelectTrigger id="model">
                    <SelectValue
                      placeholder={
                        deviceBrand
                          ? `Select ${deviceBrand.toLocaleLowerCase()} model`
                          : `Select device model`
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map((model) => (
                      <SelectItem
                        key={model.id}
                        value={model.id}
                        className="flex items-center"
                      >
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <div className="grid gap-2 mt-2.5">
            <Label htmlFor="condition">Condition</Label>
            <Select
              onValueChange={handleConditionChange}
              value={condition}
              disabled={!deviceModel}
            >
              <SelectTrigger id="condition">
                <SelectValue placeholder="Select device condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">
                  New - Unopened, unused, in original packaging
                </SelectItem>
                <SelectItem value="fairly-new">
                  Fairly New - Lightly used, no visible wear, works perfectly
                </SelectItem>
                <SelectItem value="good">
                  Good - Fully functional, minor wear like small scratches
                </SelectItem>
                <SelectItem value="acceptable">
                  Acceptable - Functional with noticeable wear, may need minor
                  repairs
                </SelectItem>
                <SelectItem value="poor">
                  Poor - Heavily worn or partially functional, may need repairs
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2 mt-2.5">
            <Label htmlFor="serialNumber">Serial Number</Label>
            <Input
              type="text"
              id="serialNumber"
              placeholder="Enter device serial number"
              value={serialNumber}
              onChange={handleSerialNumberChange}
              className={`${!isSerialValid ? "border-red-500" : ""}`}
              disabled={!condition}
            />
            {!isSerialValid && (
              <p className="text-red-500 text-xs sm:text-sm">
                Invalid serial number format for your {deviceBrand.toLowerCase()} device. Please check to
                confirm.
              </p>
            )}
          </div>

          <div className="flex mt-2 ml-auto">
            <Button
              className="mt-auto mr-4 ml-4 mb-4 inline-flex items-center gap-2 px-20 py-7 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8] hover:text-white"
              onClick={handleDeviceOnboard}
              disabled={!selectedProtectionId || !serialNumber}
            >
              Continue
            </Button>
          </div>
        </main>
      )}
    </>
  );
};