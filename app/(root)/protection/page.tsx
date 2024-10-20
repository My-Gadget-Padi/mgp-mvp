import { Suspense } from "react"
import { Dashboard } from "@/components/dashboard";
import PageLoader from "@/components/PageLoader"

export default function ProtectionPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Dashboard />
    </Suspense>
  )
};