"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
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

type DeviceType = "phone" | "tablet" | "laptop" | "desktop";

export function OnboardDevice() {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const [deviceType, setDeviceType] = useState<DeviceType | "">("");
  const [deviceBrand, setDeviceBrand] = useState<string>("");
  const [deviceModel, setDeviceModel] = useState<string>("");
  const [modelInputVisible, setModelInputVisible] = useState(false);
  const [availableModels, setAvailableModels] = useState<any[]>([]);
  const [condition, setCondition] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<string>("");

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

  return (
    <main className="flex flex-1 mt-6 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:gap-8">
        <Card className="border-transparent shadow-md bg-[#6445E8]/10">
          <CardContent className="pb-8 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg mt-2 mb-0.5 font-semibold">Free plan</h2>
                <span className="text-sm text-[#6445E8]">1 available</span>
              </div>
              <div className="flex items-center justify-center w-5 h-5 bg-red-500/20 rounded-full">
                <span className="text-red-500 text-xs font-bold">!</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-transparent shadow-md bg-[#FFBA43]/10">
          <CardContent className="pb-8 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg mt-2 mb-0.5 font-semibold">
                  Basic plan
                </h2>
                <span className="text-sm text-[#6445E8]">1 available</span>
              </div>
              <div className="flex items-center justify-center w-5 h-5 bg-red-500/20 rounded-full">
                <span className="text-red-500 text-xs font-bold">!</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-transparent shadow-md bg-[#38C793]/10">
          <CardContent className="pb-8 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg mt-2 mb-0.5 font-semibold">Pro plan</h2>
                <span className="text-sm text-[#6445E8]">1 available</span>
              </div>
              <div className="flex items-center justify-center w-5 h-5 bg-red-500/20 rounded-full">
                <span className="text-red-500 text-xs font-bold">!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 mt-4">
        <div className="grid gap-2">
          <Label htmlFor="deviceType">Type</Label>
          <Select
            value={deviceType}
            onValueChange={(value) =>
              handleDeviceSelection(value as DeviceType)
            }
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
          onChange={(e) => setSerialNumber(e.target.value)}
          disabled={!condition}
        />
      </div>

      <div className="flex mt-2 ml-auto">
        <Button
          className="mt-auto mr-4 ml-4 mb-4 inline-flex items-center gap-2 px-20 py-7 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8] hover:text-white"
        >
          Continue
        </Button>
      </div>
    </main>
  );
};