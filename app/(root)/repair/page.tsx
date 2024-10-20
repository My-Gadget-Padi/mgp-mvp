import { Suspense } from "react"
import { Repair } from "@/components/repair";
import PageLoader from "@/components/PageLoader"

export default function RepairsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Repair />
    </Suspense>
  )
};