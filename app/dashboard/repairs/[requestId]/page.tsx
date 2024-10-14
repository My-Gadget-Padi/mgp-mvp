"use client";

import SingleRepair from "@/components/repair/single-repair";
import { Id } from "@/convex/_generated/dataModel";

const SingleRepairPage = ({
  params: { requestId },
}: {
  params: { requestId: Id<"repairRequests"> };
}) => {
  return (
    <div className="h-screen flex-col md:flex">
      <SingleRepair
        requestId={requestId}
      />
    </div>
  );
};

export default SingleRepairPage;