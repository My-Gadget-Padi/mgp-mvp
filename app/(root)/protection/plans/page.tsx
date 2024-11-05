import { Suspense } from "react"
import { ChoosePlan } from "@/components/protection/choose-plan";
import PageLoader from "@/components/PageLoader"

export default function ChoosePlanPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ChoosePlan />
    </Suspense>
  )
};