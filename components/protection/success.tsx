"use client";

import * as React from "react";
import { useRef } from "react";
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
import html2pdf from "html2pdf.js";

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

  const description = paymentDetails?.description || "";
  const planName = description
    .replace("Payment for ", "")
    .replace(" protection plan", "");

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

  const formattedDateTime = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);

  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (receiptRef.current) {
      const options = {
        filename: `${reference}_mygadgetpadi_receipt.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      };
      html2pdf().set(options).from(receiptRef.current).save();
    }
  };

  return (
    <main className=" flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <Stepper currentStep={3} />

      <div className="hidden">
        <div
          ref={receiptRef}
          className="font-mono max-w-sm mt-10 mx-auto border shadow-md rounded-lg bg-white p-4 text-sm"
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <img
                src="/logo/with-icon.svg"
                alt="mygadgetpadi logo"
                className="w-[200px]"
              />
            </div>

            <p className="text-black">{formattedDateTime}</p>
          </div>

          <div className="flex flex-col items-center justify-center mt-3">
            <div className="mt-4 border-2 border-dashed border-black px-12 rounded-lg">
              <div className="flex text-center justify-center items-center mx-auto bg-white w-[144px] relative -top-4 text-sm text-black font-medium">
                Reference Number
              </div>
              <div className="font-mono text-center text-[17px] font-bold text-black tracking-wide mb-6">
                {reference}
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between pt-2">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-medium text-right">
              {paymentDetails?.finalConfig.channel === "card"
                ? "Credit Card"
                : paymentDetails?.finalConfig.channel}
            </span>
          </div>
          <div className="mt-4 border-t border-dashed border-gray-500 pt-2 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Customer Name</span>
              <span className="font-medium text-right">
                {userProfile?.firstName} {userProfile?.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Plan Purchased</span>
              <span className="font-medium text-right">{planName}</span>
            </div>
          </div>

          <div className="mt-4 border-t border-dashed border-gray-500 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Amount</span>
              <span className="font-medium">
                {(paymentDetails?.finalConfig.amount / 100).toLocaleString(
                  "en-US"
                )}{" "}
                NGN
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax</span>
              <span className="font-medium">0 NGN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-medium">
                {(paymentDetails?.finalConfig.amount / 100).toLocaleString(
                  "en-US"
                )}{" "}
                NGN
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-dashed border-gray-500 pt-2 text-center text-gray-500 text-xs">
            <p>
              Thank you for purchase, our passion. Drop by again, if your device
              isn’t still working. You’re always welcome here!
            </p>
          </div>
        </div>
      </div>

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
        <Button
          onClick={handleDownloadPDF}
          className="bg-white text-[#6445E8] hover:text-white w-full"
        >
          <Download className="h-5 w-5 mr-1" />
          Download Receipt (PDF)
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