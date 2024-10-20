"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  phoneBrands,
  tabletBrands,
  laptopBrands,
  desktopBrands,
  models,
} from "@/types/deviceTypes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Computer,
  Laptop,
  Smartphone,
  TabletSmartphone,
  CheckCheck,
  MessageSquareMore,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import LoaderSpinner from "@/components/loader/loader-spinner";

const LandingRequestFix = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deviceType, setDeviceType] = useState("phone"); //tablet, laptop, computer
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [modelInputVisible, setModelInputVisible] = useState(false);
  const [availableModels, setAvailableModels] = useState<any[]>([]);
  const [selectedDamages, setSelectedDamages] = useState<string[]>([]);
  const [otherDamage, setOtherDamage] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);

  const saveRequest = useMutation(api.repairRequests.createRepairRequest);

  const damages = [
    "Broken Screen",
    "Doesn't Power On",
    "Broken Inner Screen",
    "Water Damage",
    "Broken Outer Screen",
    "Short Battery Life",
    "Won't Charge",
    "Back Camera Doesn't Work",
    "Can't Hear / No Audio",
    "Microphone Doesn't Work",
    "Volume Button Doesn't Work",
    "Power Button Doesn't Work",
    "Vibrator",
    "Back Housing/Cover",
    "Ear Speaker / No Audio",
    "I don't know / Other",
  ];

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

  const handleDeviceFix = async () => {
    setLoading(true);

    try {
      const requestId = await saveRequest({
        user_status: "guest",
        device: deviceType,
        brandName: deviceBrand,
        model: deviceModel,
        damages: selectedDamages,
        comments: otherDamage,
      });

      setLoading(false);

      toast({
        title: "Repair request created",
        description: "You will be redirected to a customer agent on WhatsApp",
      });

      setDeviceType("phone");
      setDeviceBrand("");
      setDeviceModel("");
      setAvailableModels([]);
      setSelectedDamages([]);
      setOtherDamage("");
      setShowTextarea(false);

      if (requestId) {
        const details = encodeURIComponent(
          `
          Device:
          ${deviceModel}

          Damage(s):
          ${
            selectedDamages?.length
              ? selectedDamages.map((damage) => `- ${damage}`).join("\n")
              : "No damages specified"
          }

          ${otherDamage || "I need it fixed urgently, please."}
          `
        );
        const currentHour = new Date().getHours();

        const phoneNumber =
          currentHour % 2 === 0 ? "+2347076641696" : "+2347072665255";

        const whatsAppUrl = `https://wa.me/${phoneNumber}?text=${details}`;

        setTimeout(() => {
          router.push(whatsAppUrl);
        }, 2000); //2 seconds
      }
    } catch (error) {
      console.error("Repair request error", error);
      toast({
        title: "Repair request is unsuccessful",
        variant: "destructive",
      });
    }
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedDamages((prev) => {
      const isAlreadySelected = prev.includes(value);
      const updatedDamages = isAlreadySelected
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      if (value === "I don't know / Other") {
        setShowTextarea(!isAlreadySelected);
        if (isAlreadySelected) {
          setOtherDamage("");
        }
      }
      return updatedDamages;
    });
  };

  const handleShowComment = () => {
    setShowTextarea((prev) => !prev);
  };

  return (
    <section className="pr-4 pl-4 sm:pr-0 sm:pl-0 relative lg:h-screen lg:overflow-y-auto md:h-auto sm:h-auto sm:overflow-none">
      <div className="lg:flex mx-auto">
        <div
          className="lg:w-6/12 sm:w-full hidden lg:flex h-screen sticky top-0"
          style={styles.bgImg}
        >
          <div className="px-5 py-3">
            <button
              type="button"
              className="rounded-lg px-10 py-3 bg-white text-base font-normal text-black"
            >
              <Link href="/auth/sign-up">Create your account</Link>
            </button>
          </div>
          <div className="text-base text-white">
            <div className="carousel-btn absolute left-6 bottom-8">
              <Image
                src="/images/bullet.png"
                alt="logo"
                width={130}
                height={25}
                className="w-full dark:hidden"
              />
            </div>
            <div className="absolute right-5 bottom-8">
              <p>help@mygadgetpadi.com</p>
            </div>
          </div>
        </div>
        <ScrollArea className="lg:w-6/12 sm:w-full bg-white dark:bg-dark sm:p-[50px] lg:overflow-y-auto">
          <div className="hidden sm:flex w-full justify-end  absolute right-6 top-3 py-3 px-5">
            <Link href="/">
              <div>
                <Image
                  src="/images/logo/logo.png"
                  alt="logo"
                  width={130}
                  height={25}
                  className="w-full dark:hidden"
                />
              </div>
            </Link>
          </div>
          <div className="mt-5 lg:w-10/12 sm:w-full mx-auto">
            <h3 className="mb-2 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
              Let’s Repair it Now
            </h3>
            <p className="mb-5 text-center text-sm font-normal text-indigo-700">
              One stop for everything about your gadget
            </p>
            {loading ? (
              <LoaderSpinner />
            ) : (
              <div className="my-2">
                <div className="mb-5">
                  <RadioGroup
                    defaultValue="phone"
                    onValueChange={(value) => {
                      setDeviceType(value);
                      setDeviceBrand("");
                      setDeviceModel("");
                      setAvailableModels([]);
                      setSelectedDamages([]);
                      setShowTextarea(false);
                    }}
                    className="grid grid-cols-2 sm:grid-cols-4 mb-6 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="phone"
                        id="phone"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="phone"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Smartphone
                          className={`mb-3 h-6 w-6 ${
                            deviceType === "phone" ? "text-[#6445E8]" : ""
                          }`}
                        />
                        Phone
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="tablet"
                        id="tablet"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="tablet"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <TabletSmartphone
                          className={`mb-3 h-6 w-6 ${
                            deviceType === "tablet" ? "text-[#6445E8]" : ""
                          }`}
                        />
                        Tablet
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="laptop"
                        id="laptop"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="laptop"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Laptop
                          className={`mb-3 h-6 w-6 ${
                            deviceType === "laptop" ? "text-[#6445E8]" : ""
                          }`}
                        />
                        Laptop
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="desktop"
                        id="desktop"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="desktop"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Computer
                          className={`mb-3 h-6 w-6 ${
                            deviceType === "desktop" ? "text-[#6445E8]" : ""
                          }`}
                        />
                        Desktop
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="grid mt-8 grid-cols-1 gap-4 mb-2">
                    <div>
                      <h1 className="text-xl font-semibold">
                        Choose the brand
                      </h1>
                      <p className="text-muted-foreground text-sm">
                        What kind of {deviceType} is it?
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="grid gap-2">
                      <Select
                        onValueChange={(id: string) => handleBrandChange(id)}
                      >
                        <SelectTrigger id="brand">
                          <SelectValue
                            placeholder={`Select ${deviceType} brand`}
                          />
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
                          ? `Which ${deviceBrand} model is it?`
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
                          disabled={
                            !deviceBrand || availableModels.length === 0
                          }
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
                </div>

                <div className="gap-2 mt-2">
                  <Label htmlFor="damages">Damages</Label>
                  <div className="grid grid-cols-4">
                    <div className="col-span-3">
                      <Button
                        variant="outline"
                        className="w-full flex justify-between items-center"
                        disabled={!deviceBrand || !deviceModel}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {isOpen ? (
                          <span className="text-muted-foreground animate-pulse">
                            Selecting...
                          </span>
                        ) : (
                          <span className="font-normal">Select damage(s)</span>
                        )}
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>

                      {isOpen && (
                        <ScrollArea className="mt-2 border rounded-md max-h-64 overflow-y-auto">
                          <div className="p-4">
                            {damages.map((damage) => (
                              <div
                                key={damage}
                                className={`flex items-center space-x-2 mb-2 cursor-pointer ${
                                  selectedDamages.includes(damage)
                                    ? "text-[#6445E8]"
                                    : "text-muted-foreground"
                                }`}
                                onClick={() => handleCheckboxChange(damage)}
                              >
                                <Checkbox
                                  checked={selectedDamages.includes(damage)}
                                />
                                <span>{damage}</span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </div>

                    <Button
                      className="col-span-1 ml-2 bg-[#6445E8] hover:bg-[#6445E8]/80 text-white"
                      disabled={!deviceBrand || !deviceModel}
                      variant={!deviceBrand || !deviceModel ? "secondary" : "default"}
                      onClick={() => handleShowComment()}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <MessageSquareMore className="flex sm:hidden" />
                            <span className="hidden sm:flex">
                              Describe the issue
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Click here to provide additional details about
                              your {deviceType}'s issue.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Button>
                  </div>
                </div>
                {selectedDamages.length > 0 && (
                  <div>
                    {selectedDamages.some(
                      (damage) => damage !== "I don't know / Other"
                    ) && <p className="text-sm">Selected:</p>}
                    <ul>
                      {selectedDamages
                        .filter((damage) => damage !== "I don't know / Other") // Exclude "Other"
                        .map((damage, index) => (
                          <li
                            key={index}
                            className="mt-1 text-muted-foreground text-sm capitalize"
                          >
                            <CheckCheck className="w-4 h-4 inline-flex mr-2" />
                            {damage}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {showTextarea && (
                  <div>
                    <Label htmlFor="other-damage">
                      Please describe the issue:
                    </Label>
                    <Textarea
                      id="other-damage"
                      rows={6}
                      value={otherDamage}
                      onChange={(e) => setOtherDamage(e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md"
                      placeholder={`I need a quick fix, my ${deviceType}'s screen is broken.`}
                    />
                  </div>
                )}
                <div className="mt-6">
                  <button
                    disabled={!deviceModel}
                    onClick={handleDeviceFix}
                    type="button"
                    className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-lg px-9 py-4 text-base font-medium text-white duration-300 ${
                      !deviceModel
                        ? "bg-[#6445E8] cursor-not-allowed opacity-50"
                        : "bg-[#6445E8] hover:bg-[#6445E8]/80"
                    }`}
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};

const styles = {
  bgImg: {
    backgroundImage: `url('/images/formImg.jpg')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  },
};

export default LandingRequestFix;