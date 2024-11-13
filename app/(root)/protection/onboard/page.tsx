import { Suspense } from "react"
import { OnboardDevice } from "@/components/protection/onboard-device";
import PageLoader from "@/components/PageLoader"

export default function OnboardPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <OnboardDevice />
    </Suspense>
  )
};