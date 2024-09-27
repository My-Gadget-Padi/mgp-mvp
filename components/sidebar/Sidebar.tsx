"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Nav } from "@/components/sidebarNav/nav";
import { useScreenWidth } from "./UseScreenWidth";
import {
  LucideIcon,
  ChevronLeft,
  LayoutGrid,
  Settings,
  BellRing,
  LogOut,
  MonitorSmartphone,
  ShieldCheck,
  Wrench
} from "lucide-react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";

interface SidebarProps {
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    url: string;
    onClick?: () => void;
    subLinks?: { title: string; url: string }[];
  }[];
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here, e.g., clear tokens, redirect, etc.
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/+2348088980832", "_blank");
  };

  const sideBarLinks: SidebarProps["links"] = [
    {
      title: "Dashboard",
      label: "",
      icon: LayoutGrid as LucideIcon,
      variant: "ghost",
      url: "/dashboard",
      subLinks: [
        {
          title: "Request Fix",
          url: "/dashboard/request-fix",
        },
      ],
    },
    {
      title: "Notifications",
      label: "",
      icon: BellRing as LucideIcon,
      variant: "ghost",
      url: "/dashboard/notifications",
    },
    {
      title: "Repairs",
      label: "",
      icon: Wrench as LucideIcon,
      variant: "ghost",
      url: "/dashboard/repairs",
    },
    {
      title: "Protections",
      label: "",
      icon: ShieldCheck as LucideIcon,
      variant: "ghost",
      url: "/dashboard/protections",
    },
    {
      title: "Devices",
      label: "",
      icon: MonitorSmartphone as LucideIcon,
      variant: "ghost",
      url: "/dashboard/devices",
    },
    {
      title: "Settings",
      label: "",
      icon: Settings as LucideIcon,
      variant: "ghost",
      url: "/dashboard/settings",
      subLinks: [
        {
          title: "Profile",
          url: "/dashboard/settings",
        },
        {
          title: "Account",
          url: "/dashboard/settings/account",
        },
        {
          title: "Appearance",
          url: "/dashboard/settings/appearance",
        },
        {
          title: "Notifications",
          url: "/dashboard/settings/notifications",
        },
        {
          title: "Display",
          url: "/dashboard/settings/display",
        },
        {
          title: "Billing",
          url: "/dashboard/settings/billing",
        },
      ],
    },
    {
      title: "Logout",
      label: "",
      icon: LogOut as LucideIcon,
      variant: "ghost",
      url: "",
      onClick: () => handleLogout(),
    },
  ];

  const toggleCollapse = () => {
    console.log("Toggle clicked, current state:", isCollapsed);
    setIsCollapsed((prev) => {
      const newState = !prev;
      console.log("State after toggle:", newState);
      return newState;
    });
  };

  const isSmallScreen = useScreenWidth(768);

  React.useEffect(() => {
    console.log("Screen size change detected:", isSmallScreen);
    if (isSmallScreen && !isCollapsed) {
      setIsCollapsed(true);
    } else if (!isSmallScreen && isCollapsed) {
      setIsCollapsed(false);
    }
  }, [isSmallScreen]);

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[60px]" : "w-[250px]"
      )}
    >
      <div
        className={cn(
          "flex h-[56px] items-center justify-between px-2",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {isCollapsed ? (
          <Image
            onClick={toggleCollapse}
            src="/images/logo-icon.png"
            alt="LOGO"
            sizes="100vw"
            className="ml-4"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={30}
            height={30}
          />
        ) : (
          <Image
            src="/images/logo.png"
            alt="LOGO"
            sizes="100vw"
            style={{
              width: "50%",
              height: "auto",
            }}
            width={0}
            height={0}
          />
        )}
        <button
          type="button"
          className="p-2 rounded-md hover:bg-gray-200"
          onClick={toggleCollapse}
        >
          {isCollapsed ? null : <ChevronLeft />}
        </button>
      </div>
      <Separator />
      <Nav isCollapsed={isCollapsed} links={sideBarLinks} />
      <Separator />
      <div className="mt-auto p-4">
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href="https://wa.me/+2348088980832"
                target="_blank"
                className="flex justify-center"
              >
                <svg
                  className="w-10 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="100px"
                  height="100px"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path
                    fill="#fff"
                    d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                  />
                  <path
                    fill="#fff"
                    d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                  />
                  <path
                    fill="#cfd8dc"
                    d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                  />
                  <path
                    fill="#40c351"
                    d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                  />
                  <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Send us a message</TooltipContent>
          </Tooltip>
        ) : (
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Our support team is available 24/7.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button onClick={openWhatsApp} size="sm" className="w-full">
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="100px"
                  height="100px"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path
                    fill="#fff"
                    d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                  />
                  <path
                    fill="#fff"
                    d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                  />
                  <path
                    fill="#cfd8dc"
                    d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                  />
                  <path
                    fill="#40c351"
                    d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                  />
                  <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                    clip-rule="evenodd"
                  />
                </svg>
                Send a Message
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};