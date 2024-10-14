"use client";

import SingleMessage from "@/components/notification/single-message";
import { Id } from "@/convex/_generated/dataModel";

const SingleMessagePage = ({
  params: { notificationId },
}: {
  params: { notificationId: Id<"notifications"> };
}) => {
  return (
    <div className="h-screen flex-col md:flex">
      <SingleMessage
        notificationId={notificationId}
      />
    </div>
  );
};

export default SingleMessagePage;