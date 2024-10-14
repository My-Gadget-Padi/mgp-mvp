import { Suspense } from "react"
import PageLoader from "@/components/PageLoader"
import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./account-form";

export default function SettingsAccountPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings on MyGadgetPadi.
          </p>
        </div>
        <Separator />
        <AccountForm />
      </div>
    </Suspense>
  )
};