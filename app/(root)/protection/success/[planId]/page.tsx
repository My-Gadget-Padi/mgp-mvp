"use client";

import Success from "@/components/protection/success";
import { Id } from "@/convex/_generated/dataModel";

const SuccessPage = ({
  params: { planId },
}: {
  params: { planId: Id<"deviceProtections"> };
}) => {
  return (
    <Success planId={planId} />
  );
};

export default SuccessPage;