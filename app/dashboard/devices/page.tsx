import { Suspense } from "react"
import { Device } from "@/components/device/device"
import PageLoader from "@/components/PageLoader"

export default function Devices() {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="h-screen flex-col md:flex">
        <Device
        />
      </div>
    </Suspense>
  )
};