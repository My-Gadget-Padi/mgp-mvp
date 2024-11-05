"use client";

import * as React from "react";
import Link from "next/link";
import { Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import LoaderSpinner from "../loader/loader-spinner";
import { Stepper } from "./stepper";

interface PlanProps {
  planId: Id<"deviceProtections">;
}

const Success = ({ planId }: PlanProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  return (
    <main className="flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <Stepper currentStep={3} />

      <div className="relative max-w-md sm:w-[400px] mx-auto p-6 bg-[#6445E8] text-white rounded-2xl shadow-md space-y-6">
        {/* Left and Right Cut-out Circles */}
        <div className="absolute top-[174px] -left-3 w-6 h-6 bg-white rounded-full"></div>
        <div className="absolute top-[150px] -right-3 w-6 h-6 bg-white rounded-full"></div>
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-white rounded-full p-4">
            <svg
              className="w-8 h-8 text-[#6445E8]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        {/* Payment Success Message */}
        <div>
          <h2 className="text-center text-lg font-semibold">
            Payment Successful!
          </h2>

          <div className="mt-2 sm:hidden items-center justify-center flex">
            - - - - - - - - - - - - - - - - - - - - - - -
          </div>
          <div className="mt-2 hidden items-center justify-center sm:flex">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          </div>
        </div>
        {/* Details */}
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Reference Number</span>
            <span className="inline-flex">
                000085752257
                <Copy className="h-4 w-4 ml-1" />
            </span>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span>Mar 22, 2023</span>
          </div>
          <div className="flex justify-between">
            <span>Time</span>
            <span>07:80 AM</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method</span>
            <span>Credit Card</span>
          </div>
        </div>
        <div className="text-sm space-y-2">
          <div className="sm:hidden items-center justify-center flex">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          </div>
          <div className="hidden items-center justify-center sm:flex">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          </div>
          <div className="flex justify-between">
            <span>Amount</span>
            <span>N5,000</span>
          </div>
        </div>
        {/* Download PDF Button */}
        <Button className="bg-white text-[#6445E8] hover:text-white w-full">
          <Download className="h-5 w-5 mr-1" />
          Get PDF Receipt
        </Button>
      </div>

      <div className="flex justify-center mt-4">
        <Button className="bg-[#6445E8] text-white hover:bg-[#6445E8]/90 w-full sm:w-[400px]">
          Onboard a device
        </Button>
      </div>

      <Link
        href="/protection"
        className="text-[#6445E8] underline flex items-center justify-center"
      >
        I'll do it later
      </Link>
    </main>
  );
};

export default Success;