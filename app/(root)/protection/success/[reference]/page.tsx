"use client";

import Success from "@/components/protection/success";
import { Id } from "@/convex/_generated/dataModel";

const SuccessPage = ({
  params: { reference },
}: {
  params: { reference: string };
}) => {
  return (
    <Success reference={reference} />
  );
};

export default SuccessPage;