import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/settings/sidebar-nav";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences on MyGadgetPadi",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/settings",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
  },
  {
    title: "Display",
    href: "/dashboard/settings/display",
  },
  {
    title: "Billing",
    href: "/dashboard/settings/billing",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <ScrollArea className="h-screen pb-10">
      <div className="flex h-screen w-full flex-col sm:w-[714px] md:w-[1410px]">
        <div className="flex flex-col">
          <div className="p-6 sm:gap-4 sm:py-4">
            <div className="space-y-0.5">
              <h1 className="text-xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and set e-mail preferences.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5">
                <SidebarNav items={sidebarNavItems} />
              </aside>
              <div className="flex-1 lg:max-w-4xl">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};