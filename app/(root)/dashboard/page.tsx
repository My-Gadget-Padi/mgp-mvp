import { Suspense } from "react"
import { Dashboard } from "@/components/dashboard";
import PageLoader from "@/components/PageLoader"

export default function DashboardPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Dashboard />
    </Suspense>
  )
};