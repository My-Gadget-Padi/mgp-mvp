import { Suspense } from "react"
import SuccessFree from "@/components/protection/success-free";
import PageLoader from "@/components/PageLoader"

export default function SuccessFreePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <SuccessFree />
    </Suspense>
  )
};