"use client";

import * as React from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  File,
  Home,
  LineChart,
  ListFilter,
  Mail,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
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
  GalleryVerticalEnd,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";

export function Repair() {
  return (
    <ScrollArea className="h-screen">
      <div className="flex h-screen w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">Repairs</h1>
                <p className="text-muted-foreground">
                  View all repairs on your account.
                </p>
              </div>
              <div className="flex ml-auto space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-4 md:gap-8">
            <div className="grid gap-4 md:gap-8 gird-cols-1">
              <Card className="" x-chunk="dashboard-01-chunk-4">
                <CardContent className="mt-4">
                  <Tabs defaultValue="all">
                    <TabsList className="ml-auto">
                      <TabsTrigger value="all" className="text-zinc-600">
                        <GalleryVerticalEnd className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        All
                      </TabsTrigger>
                      <TabsTrigger value="scheduled" className="text-zinc-600">
                        <CalendarClock className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Scheduled
                      </TabsTrigger>
                      <TabsTrigger
                        value="received"
                        className="text-zinc-600 hidden md:inline-flex"
                      >
                        <Archive className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Received
                      </TabsTrigger>
                      <TabsTrigger
                        value="assigned"
                        className="text-zinc-600 hidden md:inline-flex"
                      >
                        <UserCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Assigned
                      </TabsTrigger>
                      <TabsTrigger
                        value="in-progress"
                        className="text-zinc-600"
                      >
                        <Timer className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        In progress
                      </TabsTrigger>
                      <TabsTrigger value="completed" className="text-zinc-600">
                        <CircleCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Completed
                      </TabsTrigger>
                      <TabsTrigger value="shipped" className="text-zinc-600 hidden md:inline-flex">
                        <TruckIcon className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Shipped
                      </TabsTrigger>
                      <TabsTrigger
                        value="delivered"
                        className="text-zinc-600 hidden md:inline-flex"
                      >
                        <PackageOpen className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Delivered
                      </TabsTrigger>
                      <TabsTrigger
                        value="cancelled"
                        className="text-zinc-600 hidden md:inline-flex"
                      >
                        <CircleX className="h-5 w-4 mr-1.5 text-muted-foreground" />
                        Cancelled
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
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
                              <div className="font-medium">Iphone 13</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Broken screen</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowUp className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>High</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <CircleX className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Cancelled</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Device repair has been cancelled</p>
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
                              <div className="font-medium">Iphone 12</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Battery life</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowDown className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>Low</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <Archive className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Received</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Device has been received by MyGadgetPadi
                                      for repairs
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
                              <div className="font-medium">Samsung Ultra</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Won't charge</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowDown className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>Low</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <UserCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Assigned</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Device has been assigned to a Technician
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
                              <div className="font-medium">Iphone 12</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Liquid damage</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowUp className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>High</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <Timer className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>In progress</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Device repairs have started</p>
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
                              <div className="font-medium">
                                Iphone 12 Pro Max
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">WiFi issue</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowDown className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>Low</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <TruckIcon className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Shipped</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Device has been shipped for delivery</p>
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
                              <div className="font-medium">
                                Iphone 16 Pro Max
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Water damage</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowDown className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>Low</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <PackageOpen className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Delivered</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Device has been delivered successfully
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
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="received">
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
                              <div className="font-medium">Iphone 12</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Battery life</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowDown className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>Low</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <Archive className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Received</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Device has been received by MyGadgetPadi
                                      for repairs
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
                    <TabsContent value="assigned">
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
                              <div className="font-medium">Samsung Ultra</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Won't charge</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowDown className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>Low</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <UserCheck className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Assigned</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Device has been assigned to a Technician
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
                    <TabsContent value="in-progress">
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
                              <div className="font-medium">Iphone 12</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Liquid damage</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowUp className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>High</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <Timer className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>In progress</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Device repairs have started</p>
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
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="shipped">
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
                              <div className="font-medium">
                                Iphone 12 Pro Max
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">WiFi issue</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowDown className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>Low</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <TruckIcon className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Shipped</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Device has been shipped for delivery</p>
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
                    <TabsContent value="delivered">
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
                              <div className="font-medium">
                                Iphone 16 Pro Max
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Water damage</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowDown className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>Low</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <PackageOpen className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Delivered</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      Device has been delivered successfully
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
                    <TabsContent value="cancelled">
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
                              <div className="font-medium">Iphone 13</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">Broken screen</div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <ArrowUp className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <span>High</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <CircleX className="h-5 w-4 mr-1.5 text-muted-foreground" />
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span>Cancelled</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Device repair has been cancelled</p>
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