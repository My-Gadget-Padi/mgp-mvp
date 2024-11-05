"use client";

import * as React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import LoaderSpinner from "../loader/loader-spinner";
import { Stepper } from "./stepper";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";

interface PlanProps {
  planId: Id<"deviceProtections">;
}

const Checkout = ({ planId }: PlanProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  return (
    <main className="flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <Stepper currentStep={2} />

      <div className="space-y-6">
        {/* Plan Summary */}
        <div className="bg-[#2B2B2B] text-white rounded-lg p-6 shadow-md flex flex-col">
          <div className="flex justify-between items-start">
            <Badge className="bg-[#FFBA43] text-[#6445E8]">Basic plan</Badge>

            <span className="text-2xl font-semibold">N5,000</span>
          </div>
          <div className="mt-4 space-y-2">
            <p className="font-semibold">Akinfemiwa JohnDoe</p>
            <p className="text-sm">+23490515213</p>
            <p className="text-sm">3 months</p>
          </div>
          <div className="mt-4 text-right">
            <Link href="#" className="text-sm text-white underline">
              See details
            </Link>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="font-semibold text-lg mb-4">Payment details</h2>
          <div className="flex justify-between text-sm mb-2">
            <span>Sub Total Product</span>
            <span>N5,000</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Discount</span>
            <span>N0</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>N5,000</span>
          </div>
        </div>

        <Separator />

        <div className="ml-auto space-y-2.5">
          <div className="space-x-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agreed to all{" "}
                <Link href="#" className="text-[#6445E8] underline">
                  terms and conditions
                </Link>
              </label>
            </div>
          </div>

          <Button className="w-full bg-[#6445E8] text-white py-6 rounded-lg font-semibold hover:bg-[#6445E8]/90">
            Proceed to payment
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Checkout;