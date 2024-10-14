"use client";

import SelectDelivery from "@/components/request-fix/select-delivery";
import { Id } from "@/convex/_generated/dataModel";

const DeliveryPage = ({
  params: { requestId },
}: {
  params: { requestId: Id<"repairRequests"> };
}) => {
  return (
    <div className="h-screen flex-col md:flex">
      <SelectDelivery
        requestId={requestId}
      />
    </div>
  );
};

export default DeliveryPage;