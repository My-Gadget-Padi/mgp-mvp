"use client";

import SelectDamage from "@/components/request-fix/select-damage";
import { Id } from "@/convex/_generated/dataModel";

const DamagePage = ({
  params: { requestId },
}: {
  params: { requestId: Id<"repairRequests"> };
}) => {
  return (
    <div className="h-screen flex-col md:flex">
      <SelectDamage
        requestId={requestId}
      />
    </div>
  );
};

export default DamagePage;