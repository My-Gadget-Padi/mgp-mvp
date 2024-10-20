"use client";

import Delivery from "@/components/repair/delivery";
import { Id } from "@/convex/_generated/dataModel";

const DeliveryPage = ({
  params: { requestId },
}: {
  params: { requestId: Id<"repairRequests"> };
}) => {
  return (
    <Delivery requestId={requestId} />
  );
};

export default DeliveryPage;