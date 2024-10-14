import { Suspense } from "react"
import { RequestFix } from "@/components/request-fix/request-fix";
import PageLoader from "@/components/PageLoader"

export default function RequestFixPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="h-screen flex-col md:flex">
        <RequestFix
        />
      </div>
    </Suspense>
  )
};