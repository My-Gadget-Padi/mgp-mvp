"use client";

import { Id } from "@/convex/_generated/dataModel";
import { Suspense } from "react";
import OnboardSuccess from "@/components/protection/onboard-device/success";
import PageLoader from "@/components/PageLoader";

const SuccessPage = ({
  params: { deviceId },
}: {
  params: { deviceId: Id<"devices"> };
}) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <OnboardSuccess deviceId={deviceId} />
    </Suspense>
  );
};

export default SuccessPage;