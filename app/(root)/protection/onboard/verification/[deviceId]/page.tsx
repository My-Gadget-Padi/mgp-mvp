"use client";

import { Id } from "@/convex/_generated/dataModel";
import { Suspense } from "react";
import OwnershipProof from "@/components/protection/onboard-device/ownership-proof";
import PageLoader from "@/components/PageLoader";

const VerificationPage = ({
  params: { deviceId },
}: {
  params: { deviceId: Id<"devices"> };
}) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <OwnershipProof deviceId={deviceId} />
    </Suspense>
  );
};

export default VerificationPage;