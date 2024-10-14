import { Suspense } from "react"
import { Notification } from "@/components/notification/notification";
import PageLoader from "@/components/PageLoader"

export default function Notifications() {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="h-screen flex-col md:flex">
        <Notification
        />
      </div>
    </Suspense>
  )
};