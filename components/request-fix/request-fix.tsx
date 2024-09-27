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
  SquareArrowOutUpRight,
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
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images.";

export function RequestFix() {
  return (
    <ScrollArea className="h-screen">
      <div className="flex w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">Device Repair</h1>
                <p className="text-muted-foreground">
                  Pick a device category for repair
                </p>
              </div>
              <div className="flex ml-auto space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-4 sm:py-0 md:gap-8">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    <div className="text-2xl font-bold">
                      <Smartphone className="h-20 w-20 text-muted-foreground" />
                    </div>
                  </CardTitle>
                  <ArrowUpRight className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-base ml-3 font-semibold text-muted-foreground">
                    Phones
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    <div className="text-2xl font-bold">
                      <TabletSmartphone className="h-20 w-20 text-muted-foreground" />
                    </div>
                  </CardTitle>
                  <ArrowUpRight className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-base ml-2 font-semibold text-muted-foreground">
                    Tablets
                  </div>
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    <div className="text-2xl font-bold">
                      <Laptop className="h-20 w-20 text-muted-foreground" />
                    </div>
                  </CardTitle>
                  <ArrowUpRight className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-base ml-1 font-semibold text-muted-foreground">
                    Laptops
                  </div>
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    <div className="text-2xl font-bold">
                      <Computer className="h-20 w-20 text-muted-foreground" />
                    </div>
                  </CardTitle>
                  <ArrowUpRight className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-base font-semibold text-muted-foreground">
                    Computers/Desktops
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="" x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Resources</CardTitle>
                <CardDescription>
                  Click on any of the links below to see:
                </CardDescription>
                <Separator className="my-2" />
              </CardHeader>

              <CardContent>
                <div>
                  <ul>
                    <li className="mt-1 text-muted-foreground hover:underline text-base">
                      Step by Step process on How to Onboard your Device to
                      MyGadgetPadi
                      <SquareArrowOutUpRight className="w-4 h-4 inline-flex ml-2" />
                    </li>
                    <li className="mt-1 text-muted-foreground hover:underline text-base">
                      Step by Step process on How to Request a Fix
                      <SquareArrowOutUpRight className="w-4 h-4 inline-flex ml-2" />
                    </li>
                    <li className="mt-1 text-muted-foreground hover:underline text-base">
                      Step by Step process on How to Track your Device Repair
                      on MyGadgetPadi
                      <SquareArrowOutUpRight className="w-4 h-4 inline-flex ml-2" />
                    </li>
                    <li className="mt-1 text-muted-foreground hover:underline text-base">
                      Step by Step process on How to Buy a Device Protection
                      Plan
                      <SquareArrowOutUpRight className="w-4 h-4 inline-flex ml-2" />
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
};