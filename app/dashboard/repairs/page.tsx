import { Suspense } from "react"
import { Repair } from "@/components/repair/repair";
import PageLoader from "@/components/PageLoader"

export default function Repairs() {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="h-screen flex-col md:flex">
        <Repair
        />
      </div>
    </Suspense>
  )
};