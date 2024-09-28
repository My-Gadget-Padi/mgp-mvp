"use client";

import ReviewRequest from "@/components/request-fix/review-request";
import { Id } from "@/convex/_generated/dataModel";

const ReviewPage = ({
  params: { requestId },
}: {
  params: { requestId: Id<"repairRequests"> };
}) => {
  return (
    <div className="h-screen flex-col md:flex">
      <ReviewRequest
        requestId={requestId}
      />
    </div>
  );
};

export default ReviewPage;