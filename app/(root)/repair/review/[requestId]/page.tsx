"use client";

import Review from "@/components/repair/review";
import { Id } from "@/convex/_generated/dataModel";

const ReviewPage = ({
  params: { requestId },
}: {
  params: { requestId: Id<"repairRequests"> };
}) => {
  return (
      <Review
        requestId={requestId}
      />
  );
};

export default ReviewPage;