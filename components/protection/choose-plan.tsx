"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stepper } from "./stepper";
import { TbCurrencyNaira } from "react-icons/tb";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

export function ChoosePlan() {
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const plans = useQuery(api.plans.getAllPlans);

  return (
    <main className="flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <Stepper currentStep={1} />
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        {plans
          ?.slice()
          .reverse()
          .map((plan, index) => (
            <div
              key={index}
              className={`${
                plan.name === "Free Plan"
                  ? "bg-[#2B2B2B] text-white"
                  : plan.name === "Basic Plan"
                  ? "bg-[#6445E8] text-white"
                  : "bg-white text-gray-900 border border-gray-300"
              } rounded-lg p-6 w-full md:w-1/3 text-center`}
            >
              <div className="flex flex-1 mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-lg font-medium ml-auto">
                  <span className="text-3xl font-bold inline-flex">
                    <TbCurrencyNaira size={38} />
                    {plan.price.toLocaleString()}
                    <span className="text-lg mt-2 font-medium">
                      {plan.type === "monthly" ? "/month" : "/year"}
                    </span>
                  </span>
                </p>
              </div>
              <ul className="text-sm text-left mb-4">
                {plan.details.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-green-${
                        plan.name === "Pro Plan" ? "500" : "400"
                      }`}
                    >
                      ✓
                    </span>{" "}
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-start italic mb-4">
                {plan.details.terms}
              </p>
              <Link
                href={
                  plan.name === "Free Plan" &&
                  userProfile?.hasFreePlan === true
                    ? `#`
                    : `/protection/checkout/${plan._id as Id<"plans">}`
                }
              >
                <Button
                  variant={plan.name === "Pro Plan" ? "outline" : "secondary"}
                  disabled={
                    plan.name === "Free Plan" &&
                    userProfile?.hasFreePlan === true
                  }
                  className={`${
                    plan.name === "Pro Plan"
                      ? "border-[#6445E8] text-[#6445E8] hover:bg-[#6445E8]"
                      : plan.name === "Basic Plan"
                      ? "border-[#6445E8] text-[#6445E8] hover:text-primary hover:bg-primary"
                      : "bg-white text-[#2B2B2B] hover:bg-[#6445E8]"
                  } hover:text-white rounded-md font-semibold w-full mt-2`}
                >
                  {plan.name === "Free Plan" &&
                  userProfile?.hasFreePlan === true
                    ? "Free plan has been activated"
                    : "Choose a plan"}
                </Button>
              </Link>
            </div>
          ))}
      </div>
    </main>
  );
};