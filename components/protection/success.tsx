"use client";

import * as React from "react";
import Link from "next/link";
import { Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { TbCurrencyNaira } from "react-icons/tb";
import { Stepper } from "./stepper";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface PlanProps {
  reference: string;
}

const Success = ({ reference }: PlanProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const paymentDetails = useQuery(api.payments.getPaymentByReference, {
    reference,
  });

  const date = new Date(paymentDetails?._creationTime!);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <main className="flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <Stepper currentStep={3} />

      <div className="relative max-w-md sm:w-[400px] mx-auto p-6 bg-[#6445E8] text-white rounded-2xl shadow-md space-y-6">
        {/* Left and Right Cut-out Circles */}
        <div className="absolute top-[174px] -left-3 w-6 h-6 bg-white rounded-full"></div>
        <div className="absolute top-[150px] -right-3 w-6 h-6 bg-white rounded-full"></div>
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

            <CopyToClipboard text={reference}>
              <span className="inline-flex">
                {reference.slice(0, 10)}***
                <Copy
                  className="h-4 w-4 ml-1"
                  onClick={() =>
                    toast({
                      title: "Reference ID copied to clipboard!",
                    })
                  }
                />
              </span>
            </CopyToClipboard>
          </div>

          <div className="flex justify-between">
            <span>Date</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Time</span>
            <span>{formattedTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method</span>
            <span>
              {paymentDetails?.finalConfig.channel === "card"
                ? "Credit Card"
                : paymentDetails?.finalConfig.channel}
            </span>
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
            <span className="inline-flex">
              <TbCurrencyNaira size={20} />
              {(paymentDetails?.finalConfig.amount / 100).toLocaleString(
                "en-US"
              )}
            </span>
          </div>
        </div>
        {/* Download PDF Button */}
        <Button className="bg-white text-[#6445E8] hover:text-white w-full">
          <Download className="h-5 w-5 mr-1" />
          Get PDF Receipt
        </Button>
      </div>

      <Link href="/protection/onboard" className="flex justify-center mt-4">
        <Button className="bg-[#6445E8] text-white hover:bg-[#6445E8]/90 w-full sm:w-[400px]">
          Onboard a device
        </Button>
      </Link>

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