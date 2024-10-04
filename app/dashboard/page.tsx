import { Suspense } from "react"
import { Dashboard } from "@/components/dashboard/dashboard";
import PageLoader from "@/components/PageLoader"

export default function DashboardPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="h-screen flex-col md:flex">
        <Dashboard
        />
      </div>
    </Suspense>
  )
};