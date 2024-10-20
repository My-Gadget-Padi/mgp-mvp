"use client";

import Complete from "@/components/repair/complete";
import { Id } from "@/convex/_generated/dataModel";

const CompletePage = ({
  params: { requestId },
}: {
  params: { requestId: Id<"repairRequests"> };
}) => {
  return (
      <Complete
        requestId={requestId}
      />
  );
};

export default CompletePage;