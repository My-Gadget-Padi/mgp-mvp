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

export function Notification() {
  return (
    <ScrollArea className="h-screen">
      <div className="flex h-screen w-full flex-col sm:w-[714px] md:w-[1300px]">
        <div className="flex flex-col sm:gap-4">
          <div>
            <div className="flex pl-4 pr-4 pt-3">
              <div>
                <h1 className="text-xl font-bold">Notifications</h1>
                <p className="text-muted-foreground">
                  View all notifications on your account.
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
                      <TabsTrigger
                        value="all"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="unread"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        Unread
                      </TabsTrigger>
                      <TabsTrigger
                        value="seen"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        Seen
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Message</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Contact Details</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">
                                Your device repair has been completed
                              </div>
                              <div className="hidden text-xs text-muted-foreground md:inline">
                                25/09/2024
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">Email</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">
                                ayo@mygadgetpadi.com
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-200 text-primary">
                                Unread
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">
                                Your device repair has been completed
                              </div>
                              <div className="hidden text-xs text-muted-foreground md:inline">
                                25/09/2024
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">SMS</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">
                                +234 1234567890
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">Seen</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">
                                Your device repair has been completed
                              </div>
                              <div className="hidden text-xs text-muted-foreground md:inline">
                                25/09/2024
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">Email</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">
                                ayo@mygadgetpadi.com
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-200 text-primary">
                                Unread
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">
                                Your device repair has been completed
                              </div>
                              <div className="hidden text-xs text-muted-foreground md:inline">
                                25/09/2024
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">Email</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">
                                ayo@mygadgetpadi.com
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-200 text-primary">
                                Unread
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="unread">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Message</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Contact Details</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">
                                Your device repair has been completed
                              </div>
                              <div className="hidden text-xs text-muted-foreground md:inline">
                                25/09/2024
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">Email</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">
                                ayo@mygadgetpadi.com
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-200 text-primary">
                                Unread
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">
                                Your device repair has been completed
                              </div>
                              <div className="hidden text-xs text-muted-foreground md:inline">
                                25/09/2024
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">Email</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">
                                ayo@mygadgetpadi.com
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-200 text-primary">
                                Unread
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">
                                Your device repair has been completed
                              </div>
                              <div className="hidden text-xs text-muted-foreground md:inline">
                                25/09/2024
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">Email</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">
                                ayo@mygadgetpadi.com
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-200 text-primary">
                                Unread
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="seen">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Message</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Contact Details</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">
                                Your device repair has been completed
                              </div>
                              <div className="hidden text-xs text-muted-foreground md:inline">
                                25/09/2024
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">SMS</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-muted-foreground">
                                +234 1234567890
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">Seen</Badge>
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