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
import { Checkbox } from "../ui/checkbox";
import {
  Calculator,
  Calendar,
  Smile,
  User,
} from "lucide-react"
 
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images.";

export function RepairDevice() {
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
                    <Link href={`/dashboard/request-fix/123`}>Select Device Brand</Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
               
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                
                  <Button size="sm">Next</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>Product Details</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>

                      <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
                      
                     
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-1">
                    <CardHeader>
                      <CardTitle>Stock</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">SKU</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="w-[100px]">Size</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-semibold">
                              GGPC-001
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-1" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-1"
                                type="number"
                                defaultValue="100"
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="price-1" className="sr-only">
                                Price
                              </Label>
                              <Input
                                id="price-1"
                                type="number"
                                defaultValue="99.99"
                              />
                            </TableCell>
                            <TableCell>
                              <ToggleGroup
                                type="single"
                                defaultValue="s"
                                variant="outline"
                              >
                                <ToggleGroupItem value="s">S</ToggleGroupItem>
                                <ToggleGroupItem value="m">M</ToggleGroupItem>
                                <ToggleGroupItem value="l">L</ToggleGroupItem>
                              </ToggleGroup>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">
                              GGPC-002
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-2" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-2"
                                type="number"
                                defaultValue="143"
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="price-2" className="sr-only">
                                Price
                              </Label>
                              <Input
                                id="price-2"
                                type="number"
                                defaultValue="99.99"
                              />
                            </TableCell>
                            <TableCell>
                              <ToggleGroup
                                type="single"
                                defaultValue="m"
                                variant="outline"
                              >
                                <ToggleGroupItem value="s">S</ToggleGroupItem>
                                <ToggleGroupItem value="m">M</ToggleGroupItem>
                                <ToggleGroupItem value="l">L</ToggleGroupItem>
                              </ToggleGroup>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">
                              GGPC-003
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-3" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-3"
                                type="number"
                                defaultValue="32"
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="price-3" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="price-3"
                                type="number"
                                defaultValue="99.99"
                              />
                            </TableCell>
                            <TableCell>
                              <ToggleGroup
                                type="single"
                                defaultValue="s"
                                variant="outline"
                              >
                                <ToggleGroupItem value="s">S</ToggleGroupItem>
                                <ToggleGroupItem value="m">M</ToggleGroupItem>
                                <ToggleGroupItem value="l">L</ToggleGroupItem>
                              </ToggleGroup>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="justify-center border-t p-4">
                      <Button size="sm" variant="ghost" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        Add Variant
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-2">
                    <CardHeader>
                      <CardTitle>Product Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-3">
                        <div className="grid gap-3">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger
                              id="category"
                              aria-label="Select category"
                            >
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="electronics">
                                Electronics
                              </SelectItem>
                              <SelectItem value="accessories">
                                Accessories
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="subcategory">
                            Subcategory (optional)
                          </Label>
                          <Select>
                            <SelectTrigger
                              id="subcategory"
                              aria-label="Select subcategory"
                            >
                              <SelectValue placeholder="Select subcategory" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="t-shirts">T-Shirts</SelectItem>
                              <SelectItem value="hoodies">Hoodies</SelectItem>
                              <SelectItem value="sweatshirts">
                                Sweatshirts
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle>Product Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="status">Status</Label>
                          <Select>
                            <SelectTrigger
                              id="status"
                              aria-label="Select status"
                            >
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Active</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle>Product Images</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <Image
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src="/placeholder.svg"
                          width="300"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <>
                            <Image
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src="/placeholder.svg"
                              width="84"
                            />
                          </>
                          <>
                            <Image
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src="/placeholder.svg"
                              width="84"
                            />
                          </>
                          <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-5">
                    <CardHeader>
                      <CardTitle>Archive Product</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div></div>
                      <Button size="sm" variant="secondary">
                        Archive Product
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Save Product</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
};