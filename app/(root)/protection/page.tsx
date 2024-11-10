import { Suspense } from "react"
import { Protection } from "@/components/protection";
import PageLoader from "@/components/PageLoader"

export default function ProtectionPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Protection />
    </Suspense>
  )
};