import { Metadata } from "next";
import { Suspense } from "react"
import { Settings } from "@/components/settings";
import PageLoader from "@/components/PageLoader"

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage your profile, account, and notification settings on MyGadgetPadi",
};

export default function SettingsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Settings />
    </Suspense>
  )
};