import { Suspense } from "react"
import PageLoader from "@/components/PageLoader"
import { Notification } from "@/components/notification";

export default function NotificationsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Notification />
    </Suspense>
  )
};