"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Section from "@/components/section-label";
import Modal from "@/components/modal/index";
import { CheckCircle2, Plus } from "lucide-react";
import { pricingCards } from "@/constants/pricing-details";
import Image from "next/image";

type Props = {
  userId: string;
};

type PlanType = "START" | "GROW" | "SCALE";

export function BillingForm() {
  const plan = "START" as PlanType;

  const planFeatures = pricingCards.find(
    (card) => card.title.toUpperCase() === plan
  )?.features;
  if (!planFeatures) return;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="flex lg:col-span-2 justify-start lg:justify-center ">
        <Modal
          title="Choose a plan"
          description="Tell us about yourself! What do you do? Let’s tailor your experience so it best suits you."
          trigger={
            plan && plan === "START" ? (
              <Card className="border-dashed bg-cream border-gray-400 w-full sm:max-w-2xl cursor-pointer h-[270px] flex justify-center items-center">
                <CardContent className="flex gap-2 items-center">
                  <div className="rounded-full border-2 p-1">
                    <Plus className="text-gray-400" />
                  </div>
                  <CardDescription className="font-semibold">
                    Upgrade Plan
                  </CardDescription>
                </CardContent>
              </Card>
            ) : (
              <Image
                src="/images/creditcard.png"
                width={400}
                height={400}
                alt="image"
              />
            )
          }
        >
          Something to be here, subcription form
        </Modal>
      </div>
      <div className="lg:col-span-1">
        <h3 className="text-xl font-semibold mb-2">Current Plan</h3>
        <p className="text-sm font-semibold">
          {typeof plan === "string" ? plan : "N/A"}
        </p>
        <div className="flex gap-2 flex-col mt-2">
          {planFeatures.map((feature) => (
            <div key={feature} className="flex gap-2">
              <CheckCircle2 className="text-muted-foreground" />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};