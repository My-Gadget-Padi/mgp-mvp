"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";

export default function VerifyPayment() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const confirmPayment = useAction(api.paystack.verifyPayment);

  useEffect(() => {
    if (!reference) {
      toast({
        title: "Error",
        description: "No payment reference provided.",
        variant: "destructive",
      });
      return;
    }

    const handlePaymentConfirmation = async () => {
      try {
        setLoading(true);

        const response = await confirmPayment({
          reference: reference as string,
        });

        if (response) {
          toast({
            title: "Success",
            description: "Payment confirmed successfully!",
          });
          router.push(`/protection/success/${reference}`);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Payment could not be confirmed.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    handlePaymentConfirmation();
  }, [reference]);

  return (
    <div>
      {loading && <PageLoader />}
    </div>
  );
};