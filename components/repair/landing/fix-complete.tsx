"use client";

import * as React from "react";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface SelectDeviceProps {
  requestId: Id<"repairRequests">;
}

const RequestFixComplete = ({ requestId }: SelectDeviceProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const repairRequest = useQuery(api.repairRequests.getRepairRequestById, {
    requestId,
  });

  const details = encodeURIComponent(
    `
      Device:
      ${repairRequest?.model}

      Damage(s):
      ${
        repairRequest?.damages?.length
          ? repairRequest.damages.map((damage) => `- ${damage}`).join("\n")
          : "No damages specified"
      }
      ${repairRequest?.comments || "I need it fixed urgently."}
      `
  );

  const currentHour = new Date().getHours();

  const phoneNumber =
    currentHour % 2 === 0 ? "+2347076641696" : "+2347072665255";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${details}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(whatsappLink);
    }, 5000);

    return () => clearTimeout(timer);
  }, [whatsappLink]);

  return (
    <main className="flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
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

          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            Repair request completed
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-6">
            You will be redirected to your personal representative on WhatsApp.
          </p>

          <CopyToClipboard text={whatsappLink}>
            <Button
              onClick={() => {
                toast({
                  title: "Success 🎉",
                  description: "WhatsApp link has been copied to clipboard!",
                });
                window.open(whatsappLink, "_blank");
              }}
              className="bg-[#6445E8] hover:bg-[#6445E8]/90 py-6 sm:px-8"
            >
              Copy link
            </Button>
          </CopyToClipboard>
          <p className="italic text-sm text-muted-foreground mt-2">
            (Click this button to copy link if not automatically redirected)
          </p>
        </div>
      </div>
    </main>
  );
};

export default RequestFixComplete;