"use client";

import SingleHistory from "@/components/history/single-history";
import { Id } from "@/convex/_generated/dataModel";

const SingleRepairPage = ({
  params: { requestId },
}: {
  params: { requestId: Id<"repairRequests"> };
}) => {
  return (
    <div className="h-screen flex-col md:flex">
      <SingleHistory
        requestId={requestId}
      />
    </div>
  );
};

export default SingleRepairPage;