"use client";

import Checkout from "@/components/protection/checkout";
import { Id } from "@/convex/_generated/dataModel";

const CheckoutPage = ({
  params: { planId },
}: {
  params: { planId: Id<"deviceProtections"> };
}) => {
  return (
    <Checkout planId={planId} />
  );
};

export default CheckoutPage;