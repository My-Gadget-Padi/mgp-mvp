"use client";

import DeviceClaim from "@/components/protection/claim";
import { Id } from "@/convex/_generated/dataModel";

const ClaimPage = ({
  params: { protectionId },
}: {
  params: { protectionId: Id<"deviceProtections"> };
}) => {
  return (
      <DeviceClaim
        protectionId={protectionId}
      />
  );
};

export default ClaimPage;