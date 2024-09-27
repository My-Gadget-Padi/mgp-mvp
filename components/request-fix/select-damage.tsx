"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import Link from "next/link";
import {
  BellRing,
  MessagesSquare,
  Fullscreen,
  ShieldCheck,
  Wrench,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CircleX,
  CircleCheck,
  Timer,
  Archive,
  TruckIcon,
  PackageOpen,
  CalendarClock,
  UserCheck,
  Smartphone,
  Laptop,
  Tablet,
  TabletSmartphone,
  Computer,
  CheckCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Bike,
  Truck,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  DollarSign,
  Menu,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserNav } from "../user-nav";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UploadDeviceImageOrVideo from "../uploadDevice/UploadDeviceImageOrVideo";
import { Id } from "@/convex/_generated/dataModel";

export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images.";

export function SelectDamage() {
  const [videoStorageId, setVideoStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedDamages, setSelectedDamages] = useState<string[]>([]);

  useEffect(() => {
    const savedDamages = JSON.parse(
      localStorage.getItem("selectedDamages") || "[]"
    );
    setSelectedDamages(savedDamages);
  }, []);

  const handleSelectChange = (value: string) => {
    if (selectedDamages.includes(value)) {
      return;
    }

    const updatedDamages = [...selectedDamages, value];
    setSelectedDamages(updatedDamages);
    localStorage.setItem("selectedDamages", JSON.stringify(updatedDamages));

    const damageSelect = document.getElementById("damage");
    if (damageSelect) {
      (damageSelect as HTMLInputElement).value = "";
    }
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">Fix your Phone</h1>
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
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard/request-fix">Request a Fix</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link href={`/dashboard/request-fix/123`}>
                      Select Device Damage
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
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>What's wrong with your device?</CardTitle>
                      <CardDescription>
                        Things happen—we've seen it all.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        <div className="grid gap-2">
                          <Label htmlFor="priority">
                            Repair Priority{" "}
                            <span className="text-muted-foreground text-xs">
                              (how urgently do you need your device fixed?)
                            </span>
                          </Label>
                          <Select>
                            <SelectTrigger id="priority">
                              <SelectValue placeholder="Select repair priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="upload">Device Image/Video</Label>
                          <UploadDeviceImageOrVideo
                            setVideo={setVideoUrl}
                            setVideoStorageId={setVideoStorageId}
                            video={videoUrl}
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="damages">Damages</Label>

                          <Select
                            onValueChange={(value) => {
                              handleSelectChange(value);
                              const damageSelect =
                                document.getElementById("damage");
                              if (damageSelect) {
                                (damageSelect as HTMLInputElement).value = "";
                              }
                            }}
                          >
                            <SelectTrigger
                              id="damage"
                              aria-label="Select damage"
                            >
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
                    </CardContent>
                    <CardFooter>
                      <div className="ml-auto flex items-center justify-center gap-2">
                        <Button size="sm">Next step</Button>
                      </div>
                    </CardFooter>
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
                        Request ID: Oe31b70H
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Copy className="h-3 w-3" />
                          <span className="sr-only">Copy Order ID</span>
                        </Button>
                      </CardTitle>
                      <CardDescription>Date: November 23, 2023</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Button size="sm" variant="outline" className="h-8 gap-1">
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
                          <span>IPhone 15 Pro Max</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Damage(s)
                          </span>
                          <div className="ml-auto">
                            <ul>
                              <li className="mt-1 text-muted-foreground text-sm capitalize">
                                <CheckCheck className="w-4 h-4 inline-flex mr-2" />
                                Broken Screen
                              </li>
                              <li className="mt-1 text-muted-foreground text-sm capitalize">
                                <CheckCheck className="w-4 h-4 inline-flex mr-2" />
                                Water Damage
                              </li>
                              <li className="mt-1 text-muted-foreground text-sm capitalize">
                                <CheckCheck className="w-4 h-4 inline-flex mr-2" />
                                Not Charging
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Priority
                          </span>
                          <span className="inline-flex">
                            <ArrowUp className="h-5 w-4 mr-1.5 text-muted-foreground" />
                            High
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Status</span>
                          <span className="inline-flex">
                            <CalendarClock className="h-5 w-4 mr-1.5 text-muted-foreground" />
                            Scheduled
                          </span>
                        </li>
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid auto-rows-max gap-3">
                        <div className="font-semibold">Delivery Method</div>
                        <div className="text-muted-foreground inline-flex">
                          <Bike className="mb-3 h-5 w-4 mr-1.5" />
                          Pick Up
                        </div>
                      </div>
                      <div className="grid gap-3 ml-auto">
                        <div className="font-semibold">Address</div>
                        <address className="grid gap-0.5 not-italic text-muted-foreground">
                          <span>Liam Johnson</span>
                          <span>1234 Main St.</span>
                          <span>Anytown, CA 12345</span>
                        </address>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="100"
                      src="/images/iphone14.jpg"
                      width="100"
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