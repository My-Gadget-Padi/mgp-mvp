import { Separator } from "../ui/separator";
import { ProfileForm } from "./profile-form";

export function Setting() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile settings on MyGadgetPadi.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
};