"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DeviceProps {
  deviceId: Id<"devices">;
}

const OnboardSuccess = ({ deviceId }: DeviceProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const device = useQuery(api.devices.getDeviceById, {
    deviceId
  });

  return (
    <main className="flex flex-1 py-20 sm:py-32 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <div className="items-center justify-center text-center">
        <div className="">
          <div className="flex justify-center items-center mb-6">
            <div className="relative w-28 h-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/success.png"
                  alt="pick-up"
                  width={200}
                  height={200}
                  quality={100}
                  unoptimized
                  className="w-full h-full object-cover rounded-lg mt-4"
                />
              </div>
            </div>
          </div>

          <p className="text-primary text-base sm:text-lg mb-6">
            Tada you’ve made a claim.
          </p>

          <Link href="/protection">
            <Button className="items-center gap-2 px-20 py-7 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8] hover:text-white">
              Go back to dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OnboardSuccess;