import { Suspense } from "react"
import { Protection } from "@/components/protection/protection";
import PageLoader from "@/components/PageLoader"

export default function Protections() {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="h-screen flex-col md:flex">
        <Protection
        />
      </div>
    </Suspense>
  )
};