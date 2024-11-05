"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Stepper } from "./stepper";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import LoaderSpinner from "../loader/loader-spinner";
import { TbCurrencyNaira } from "react-icons/tb";

export function ChoosePlan() {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  return (
    <main className="flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <Stepper currentStep={1} />
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <div className="bg-[#2B2B2B] text-white rounded-lg p-6 w-full md:w-1/3 text-center">
          <div className="flex flex-1 mb-6">
            <h3 className="text-lg font-semibold">Free Plan</h3>
            <p className="text-lg font-medium ml-auto">
              <span className="text-3xl font-bold inline-flex">
                <TbCurrencyNaira size={38} />
                100<span className="text-lg mt-2 font-medium">/month</span>
              </span>
            </p>
          </div>
          <ul className="text-sm text-left mb-4">
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-400">✓</span> Zero service charge
              during any repair claim
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-400">✓</span> Repair cap of up to
              N10,000 for non-part repairs (e.g., software or configuration
              issues)
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-400">✓</span> Free diagnosis on device
              and support during the subscription period
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-400">✓</span> Limited to one repair
              claim within the 3-month period
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-400">✓</span> Coverage period: 3
              months
            </li>
          </ul>
          <p className="text-xs text-start italic mb-4">
            Coverage excludes theft and physical damage, has a cap of N10,000
            for non-part repairs, and only offers free service for the first
            claim, with no subsequent claims allowed.
          </p>
          <Button className="bg-white text-[#2B2B2B] hover:bg-[#6445E8] hover:text-white rounded-md font-semibold w-full mt-2">
            Choose plan
          </Button>
        </div>

        <div className="bg-[#6445E8] text-white rounded-lg p-6 w-full md:w-1/3 text-center">
          <div className="flex flex-1 mb-6">
            <h3 className="text-lg font-semibold">Basic Plan</h3>
            <p className="text-lg font-medium ml-auto">
              <span className="text-3xl font-bold inline-flex">
                <TbCurrencyNaira size={38} />
                5,000<span className="text-lg mt-2 font-medium">/year</span>
              </span>
            </p>
          </div>
          <ul className="text-sm text-left mb-4">
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-400">✓</span> Zero service charge
              during any repair claim
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-400">✓</span> Repair cap of up to
              N10,000 for non-part repairs (e.g., software or configuration
              issues)
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-400">✓</span> Free diagnosis on device
              and support during the subscription period
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-400">✓</span> Limited to one repair
              claim within the 3-month period
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-400">✓</span> Coverage period: 12
              months
            </li>
          </ul>
          <p className="text-xs text-start italic mb-4">
            Coverage excludes theft and physical damage, has a cap of N10,000
            for non-part repairs, and only offers free service for the first
            claim, with no subsequent claims allowed.
          </p>
          <Button className="bg-white text-[#6445E8] hover:bg-[#2B2B2B] hover:text-white rounded-md font-semibold w-full mt-2">
            Choose plan
          </Button>
        </div>

        <div className="bg-white text-gray-900 border border-gray-300 rounded-lg p-6 w-full md:w-1/3 text-center">
          <div className="flex flex-1 mb-6">
            <h3 className="text-lg font-semibold">Pro Plan</h3>
            <p className="text-lg font-medium ml-auto">
              <span className="text-3xl font-bold inline-flex">
                <TbCurrencyNaira size={38} />
                10,000<span className="text-lg mt-2 font-medium">/year</span>
              </span>
            </p>
          </div>
          <ul className="text-sm text-left mb-4">
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-500">✓</span> Zero service charge
              during any repair claim
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-500">✓</span> Repair cap of up to
              N10,000 for non-part repairs (e.g., software or configuration
              issues)
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-500">✓</span> Free diagnosis on device
              and support during the subscription period
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-500">✓</span> Limited to one repair
              claim within the 3-month period
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="text-green-500">✓</span> Coverage period: 3
              months
            </li>
          </ul>
          <p className="text-xs text-start italic mb-4">
            Coverage excludes theft and physical damage, has a cap of N10,000
            for non-part repairs, and only offers free service for the first
            claim, with no subsequent claims allowed.
          </p>
          <Button variant={"outline"} className="border-[#6445E8] text-[#6445E8] hover:bg-[#6445E8] hover:text-white rounded-md font-semibold w-full mt-2">
            Choose plan
          </Button>
        </div>
      </div>
    </main>
  );
};