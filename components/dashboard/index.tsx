"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Wrench, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import OngoingRepairCard from "./ongoing-repairs";
import PreviousRepairs from "./previous-repairs";

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
    <main className="flex flex-1 mt-6 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Link href="/repair">
          <Card className="border-transparent shadow-md">
            <CardContent className="pb-2 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Gadget repair
                  </span>
                  <h2 className="text-lg mt-2 font-semibold">
                    Request a repair now
                  </h2>
                </div>
                <Button
                  size="icon"
                  className="h-12 w-12 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
                >
                  <Wrench className="h-6 w-6 stroke-white" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/protection">
          <Card className="border-transparent shadow-md">
            <CardContent className="pb-2 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Gadget protection
                  </span>
                  <h2 className="text-lg mt-2 font-semibold">
                    Protect your device
                  </h2>
                </div>
                <Button
                  size="icon"
                  className="h-12 w-12 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
                >
                  <ShieldCheck className="h-6 w-6 stroke-white" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        {showFirstButton ? (
          <Link href="https://wa.me/+2347076641696">
            <Card className="border-transparent shadow-md">
              <CardContent className="pb-2 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      We are seated
                    </span>
                    <h2 className="text-lg mt-2 font-semibold">
                      Send us a text
                    </h2>
                  </div>
                  <Button
                    size="icon"
                    className="h-12 w-12 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
                  >
                    <MessageSquareText className="h-6 w-6 stroke-white" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ) : (
          <Link href="https://wa.me/+2347072665255">
            <Card className="border-transparent shadow-md">
              <CardContent className="pb-2 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      We are seated
                    </span>
                    <h2 className="text-lg mt-2 font-semibold">
                      Send us a text
                    </h2>
                  </div>
                  <Button
                    size="icon"
                    className="h-12 w-12 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
                  >
                    <MessageSquareText className="h-6 w-6 stroke-white" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:gap-8">
        <Card className="w-full flex flex-col sm:flex-row rounded-2xl border-transparent shadow-md">
          <div className="flex-1">
            <CardHeader>
              <Badge className="max-w-[122px] py-1 bg-[#FFBA433B]/30 mb-4 text-primary font-light text-sm">
                mygadgetpadi
              </Badge>
              <CardTitle>
                <h1 className="text-lg font-bold">MyPadi News</h1>
                <p className="text-sm font-normal text-muted-foreground mt-2">
                  Get the latest news, updates, bonuses, etc.
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 mt-5">
              <Link
                href="#"
                className="text-sm text-blue-500 font-semibold hover:underline"
              >
                Read more →
              </Link>
            </CardContent>
          </div>

          {/* Purple Card */}
          <div
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="180" cy="200" r="30" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="60" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="90" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="120" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="150" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="180" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/></svg>')`,
              backgroundPosition: "right -20px top",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            className="max-w-3xl sm:w-52 h-52 mb-4 mr-4 ml-4 sm:mr-4 sm:mt-4 bg-[#6445E8] rounded-lg flex items-center justify-center"
          />
        </Card>

        <Card className="w-full relative p-0 border-transparent h-auto md:h-64">
          <div className="relative h-full">
            <Image
              src="/images/card/protect.jpg"
              alt="Background Image"
              width={100}
              height={100}
              className="rounded-2xl w-full h-64 object-cover"
              quality={100}
              priority={true}
              unoptimized={true}
            />
            <div className="rounded-2xl absolute inset-0 flex flex-col justify-between bg-black bg-opacity-50">
              <CardHeader>
                <CardTitle className="text-white">
                  <h1 className="text-lg font-semibold">MyPadi Blog</h1>
                  <p className="text-sm font-light mt-2">
                    Get the latest news, updates, bonuses, etc.
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200"
                >
                  Coming soon
                </Link>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ongoing Repairs Section */}
        <div>
          <h2 className="text-xl font-bold">Ongoing repairs</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Here’s what you’re fixing now
          </p>
          <OngoingRepairCard />
        </div>

        {/* Previous Repairs Section */}
        <div>
          <h2 className="text-xl font-bold">Previous repairs</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Here’s what you fixed with MyPadi
          </p>
          <PreviousRepairs />
        </div>
      </div>
    </main>
  );
};