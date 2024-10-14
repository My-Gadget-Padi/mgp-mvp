"use client";

import SelectDevice from "@/components/request-fix/select-device";
import { Id } from "@/convex/_generated/dataModel";

const RepairDevicePage = ({
  params: { requestId },
}: {
  params: { requestId: Id<"repairRequests"> };
}) => {
  return (
    <div className="h-screen flex-col md:flex">
      <SelectDevice
        requestId={requestId}
      />
    </div>
  );
};

export default RepairDevicePage;