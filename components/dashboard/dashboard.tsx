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

export function Dashboard() {
  const [showFirstButton, setShowFirstButton] = useState(true);

  useEffect(() => {
    const toggleButtons = () => {
      setShowFirstButton((prev) => !prev);
    };
    const intervalId = setInterval(toggleButtons, 3600000);
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <ScrollArea className="h-screen">
      <div className="flex h-screen w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to MyGadgetPadi</p>
              </div>
              <div className="flex ml-auto space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-4 sm:py-0 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Device Repair
                  </CardTitle>
                  <Wrench className="h-8 w-8 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Repair Your</div>
                  <div className="text-2xl font-bold">Device</div>
                </CardContent>
                <CardFooter>
                  <Button asChild size="sm" className="ml-auto">
                    <Link href="/dashboard/request-fix">
                      Request a fix
                      <ArrowUpRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Device Protection
                  </CardTitle>
                  <ShieldCheck className="h-8 w-8 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Protect Your</div>
                  <div className="text-2xl font-bold">Device</div>
                </CardContent>
                <CardFooter>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="ml-auto"
                    disabled
                  >
                    Coming soon
                  </Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Notifications
                  </CardTitle>
                  <BellRing className="h-8 w-8 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">See All</div>
                  <div className="text-2xl font-bold">Notifications</div>
                </CardContent>
                <CardFooter>
                  <Button asChild size="sm" className="ml-auto">
                    <Link href="/dashboard/notifications">
                      View all
                      <ArrowUpRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Contact Us
                  </CardTitle>
                  <MessagesSquare className="h-8 w-8 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">We Are Available</div>
                  <div className="text-2xl font-bold">24/7</div>
                </CardContent>
                <CardFooter>
                  {showFirstButton ? (
                    <Button asChild size="sm" className="ml-auto">
                      <Link href="https://wa.me/+2347076641696">
                        Send a message
                        <ArrowUpRight className="h-4 w-4 ml-1.5" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild size="sm" className="ml-auto">
                      <Link href="https://wa.me/+2347072665255">
                        Send a message
                        <ArrowUpRight className="h-4 w-4 ml-1.5" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
              <div className="sm:mb-8">
                <div className="mb-6 mt-6 space-y-2">
                  <h1 className="text-2xl font-semibold leading-none tracking-tight">
                    Ongoing Repairs
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Your most recent device repair requests.
                  </p>
                </div>
                <div className="lg:col-span-1 space-y-8">
                  <Card className="rounded-xl overflow-hidden mt-4">
                    <CardContent className="p-0 flex">
                      <div
                        className={cn(
                          "relative w-full",
                          "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
                          "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
                          "text-neutral-900 w-[220px]"
                        )}
                      >
                        <img
                          src="/images/iphone14.jpg"
                          alt=""
                          width={200}
                          height={200}
                          className="object-cover absolute h-full w-full inset-0 "
                        />
                        <div className="absolute inset-0">
                          <div
                            className={cn(
                              "absolute inset-0",
                              "shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_#fff,0px_0px_0px_4px_rgba(0,0,0,.08)]",
                              "dark:shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_rgba(100,100,100,0.3),0px_0px_0px_4px_rgba(0,0,0,.08)]"
                            )}
                          />
                          <div
                            className={cn(
                              "absolute inset-0",
                              "dark:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15),0px_1px_1px_0px_rgba(0,0,0,0.15)_inset,0px_0px_0px_1px_rgba(0,0,0,0.15)_inset,0px_0px_1px_0px_rgba(0,0,0,0.15)]"
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="w-full p-3">
                          <p className="text-sm">
                            Device:
                            <br />
                            <span className="font-semibold">
                              Iphone 14 Pro Max
                            </span>
                          </p>
                          <p className="mt-4 text-sm">
                            Damage:
                            <br />
                            <span className="font-semibold">Broken screen</span>
                          </p>
                        </div>
                        <Separator orientation="horizontal" />
                        <div className="w-full flex items-center p-3 gap-2">
                          <Fullscreen />
                          <p className="text-sm">View full information</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <Card
                className="lg:col-span-2 mb-4"
                x-chunk="dashboard-01-chunk-4"
              >
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Device Repairs</CardTitle>
                    <CardDescription>
                      All recent repairs that have been scheduled and recently
                      completed.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="scheduled">
                    <TabsList className="ml-auto">
                      <TabsTrigger
                        value="scheduled"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        <CalendarClock className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Scheduled
                      </TabsTrigger>
                      <TabsTrigger
                        value="completed"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        <CircleCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Recently Completed
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="scheduled">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:block"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="hidden md:block">
                              <Image
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="/images/iphone14.jpg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Iphone 14</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Back cover</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowUp className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>High</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <CalendarClock className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Scheduled</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Device has been successfully scheduled to
                                      repair "Back cover" damage
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <Fullscreen className="mr-1.5 h-5 text-muted-foreground" />
                                <p className="text-sm">View full information</p>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="hidden md:block">
                              <Image
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="/images/iphone14.jpg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Iphone 14</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Back cover</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowUp className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>High</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <CalendarClock className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Scheduled</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Device has been successfully scheduled to
                                      repair "Back cover" damage
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <Fullscreen className="mr-1.5 h-5 text-muted-foreground" />
                                <p className="text-sm">View full information</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="completed">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:block"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Damage</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="hidden md:block">
                              <Image
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="/images/iphone14.jpg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Iphone 15</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Camera</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowRight className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>Medium</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <CircleCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Completed</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Device repair has been completed
                                      successfully
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <Fullscreen className="mr-1.5 h-5 text-muted-foreground" />
                                <p className="text-sm">View full information</p>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="hidden md:block">
                              <Image
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="/images/iphone14.jpg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Iphone 14</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Needs cleaning</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowRight className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>Medium</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <CircleCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Completed</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Device repair has been completed
                                      successfully
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <Fullscreen className="mr-1.5 h-5 text-muted-foreground" />
                                <p className="text-sm">View full information</p>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="hidden md:block">
                              <Image
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="/images/iphone14.jpg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Iphone 14</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Needs cleaning</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowRight className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>Medium</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <CircleCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Completed</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Device repair has been completed
                                      successfully
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <Fullscreen className="mr-1.5 h-5 text-muted-foreground" />
                                <p className="text-sm">View full information</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
};