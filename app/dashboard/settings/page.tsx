import { Suspense } from "react"
import { Setting } from "@/components/settings/setting";
import PageLoader from "@/components/PageLoader"

export default function Settings() {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="h-screen flex-col md:flex">
        <Setting
        />
      </div>
    </Suspense>
  )
};