"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stepper } from "./stepper";

const SuccessFree = () => {
  return (
    <main className=" flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <Stepper currentStep={3} />

      <div className="relative w-full sm:w-[400px] mx-auto p-6 bg-[#6445E8] text-white rounded-2xl shadow-md space-y-6">
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
            Activation Successful!
          </h2>

          <div className="mt-2 sm:hidden items-center justify-center flex">
            - - - - - - - - - - - - - - - - - - - - - - -
          </div>
          <div className="mt-2 hidden items-center justify-center sm:flex">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          </div>
        </div>
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

export default SuccessFree;