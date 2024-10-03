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
  computerBrands,
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

const LandingRequestFix = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [deviceType, setDeviceType] = useState("phone"); //tablet, laptop, computer
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [availableModels, setAvailableModels] = useState<any[]>([]);
  const [selectedDamages, setSelectedDamages] = useState<string[]>([]);
  const [otherDamage, setOtherDamage] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);

  const saveRequest = useMutation(api.repairRequests.createRepairRequest);

  const getBrandsForDevice = (device: string | undefined) => {
    switch (device) {
      case "phone":
        return phoneBrands;
      case "tablet":
        return tabletBrands;
      case "laptop":
        return laptopBrands;
      case "computer":
        return computerBrands;
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
      setAvailableModels(models[id] || []);
    }
  };

  const handleModelChange = (id: string) => {
    const model = availableModels.find((model) => model.id === id);
    if (model) {
      setDeviceModel(model.label);
    }
  };

  const handleSelectChange = (value: string) => {
    if (value === "other") {
      setShowTextarea(true);
      return;
    } else {
      setShowTextarea(false);
    }

    if (selectedDamages.includes(value)) {
      return;
    }

    const updatedDamages = [...selectedDamages, value];
    setSelectedDamages(updatedDamages);

    const damageSelect = document.getElementById("damage");
    if (damageSelect) {
      (damageSelect as HTMLInputElement).value = "";
    }
  };

  const handleDeviceFix = async () => {
    if (!deviceBrand) {
      toast({
        title: "Please select a device brand",
      });
      return;
    }

    if (!deviceModel) {
      toast({
        title: "Please select your device model",
      });
      return;
    }

    if (selectedDamages.length === 0) {
      toast({
        title: "Please select one or two damages",
      });
      return;
    }

    try {
      const requestId = await saveRequest({
        user_status: "guest",
        device: deviceType,
        brandName: deviceBrand,
        model: deviceModel,
        damages: selectedDamages,
        comments: otherDamage,
      });

      toast({
        title: "Repair request submitted",
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
        }, 10000); // 10 seconds
      }
    } catch (error) {
      console.error("Repair request error", error);
      toast({
        title: "Repair request is unsuccessful",
        variant: "destructive",
      });
    }
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
        <ScrollArea className="lg:w-6/12 sm:w-full bg-white dark:bg-dark sm:p-[60px] relative lg:overflow-y-auto">
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
            <div className="my-2">
              <div className="mb-5">
                <RadioGroup
                  defaultValue="phone"
                  onValueChange={(value) => {
                    setDeviceType(value);
                    setDeviceBrand("");
                    setDeviceModel("");
                    setAvailableModels([]);
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
                      <Smartphone className="mb-3 h-6 w-6" />
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
                      <TabletSmartphone className="mb-3 h-6 w-6" />
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
                      <Laptop className="mb-3 h-6 w-6" />
                      Laptop
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="computer"
                      id="computer"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="computer"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Computer className="mb-3 h-6 w-6" />
                      Computer
                    </Label>
                  </div>
                </RadioGroup>
                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select
                      onValueChange={(id: string) => handleBrandChange(id)}
                    >
                      <SelectTrigger id="brand">
                        <SelectValue placeholder="Select device brand" />
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
                    <Label htmlFor="model">Model</Label>
                    <Select
                      onValueChange={(id: string) => handleModelChange(id)}
                      disabled={!deviceBrand || availableModels.length === 0}
                    >
                      <SelectTrigger id="model">
                        <SelectValue placeholder="Select device model" />
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
                  </div>
                </div>
              </div>
              <div className="gap-2 mt-2">
                <Label htmlFor="damages">Damages</Label>
                <div className="grid grid-cols-4">
                  <div className="col-span-3">
                    <Select
                      onValueChange={(value) => {
                        handleSelectChange(value);
                        const damageSelect = document.getElementById("damage");
                        if (damageSelect) {
                          (damageSelect as HTMLInputElement).value = "";
                        }
                      }}
                      disabled={deviceModel === ""}
                    >
                      <SelectTrigger id="damage" aria-label="Select damage">
                        <SelectValue placeholder="Select damage(s)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="broken screen">
                          Broken Screen
                        </SelectItem>
                        <SelectItem value="doesn't power on">
                          Doesn't Power On
                        </SelectItem>
                        <SelectItem value="broken inner screen">
                          Broken Inner Screen
                        </SelectItem>
                        <SelectItem value="water damage">
                          Water Damage
                        </SelectItem>
                        <SelectItem value="broken outer screen">
                          Broken Outer Screen
                        </SelectItem>
                        <SelectItem value="short battery life">
                          Short Battery Life
                        </SelectItem>
                        <SelectItem value="won't charge">
                          Won't Charge
                        </SelectItem>
                        <SelectItem value="back camera doesn't work">
                          Back Camera Doesn't Work
                        </SelectItem>
                        <SelectItem value="can't hear / no audio">
                          Can't Hear / No Audio
                        </SelectItem>
                        <SelectItem value="microphone doesn't work">
                          Microphone Doesn't Work
                        </SelectItem>
                        <SelectItem value="volume button doesn't work">
                          Volume Button Doesn't Work
                        </SelectItem>
                        <SelectItem value="power button doesn't work">
                          Power Button Doesn't Work
                        </SelectItem>
                        <SelectItem value="vibrator">Vibrator</SelectItem>
                        <SelectItem value="back cover damage">
                          Back Housing/Cover
                        </SelectItem>
                        <SelectItem value="ear speaker / no audio">
                          Ear Speaker / No Audio
                        </SelectItem>
                        <SelectItem value="other">
                          I don't know / Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="col-span-1 ml-2"
                    disabled={deviceModel === ""}
                    variant={deviceModel === "" ? "secondary" : "default"}
                    onClick={() => handleShowComment()}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <MessageSquareMore className="flex sm:hidden" />
                          <span className="hidden sm:flex">
                            Add a comment
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Click here to provide additional details about your{" "}
                            {deviceType}'s issue.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Button>
                </div>
              </div>
              {selectedDamages.length > 0 && (
                <div className="mt-3">
                  <p className="text-base">Selected Damages:</p>
                  <ul>
                    {selectedDamages.map((damage, index) => (
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
                <div className="mt-4">
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
                  onClick={handleDeviceFix}
                  type="button"
                  className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-lg bg-indigo-600 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-gray-600"
                >
                  Submit Request
                </button>
              </div>
            </div>
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