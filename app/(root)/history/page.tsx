import { Suspense } from "react";
import PageLoader from "@/components/PageLoader";
import { History } from "@/components/history";

export default function HistoryPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <History />
    </Suspense>
  )
};