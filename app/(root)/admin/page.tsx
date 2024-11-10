import { Suspense } from "react";
import { Admin } from "@/components/admin";
import PageLoader from "@/components/PageLoader";

export default function DashboardPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Admin />
    </Suspense>
  );
}
