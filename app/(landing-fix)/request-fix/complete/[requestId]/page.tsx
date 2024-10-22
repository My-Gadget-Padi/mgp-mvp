"use client";

import RequestFixComplete from "@/components/repair/landing/fix-complete";
import { Id } from "@/convex/_generated/dataModel";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";

const LandingComplete = ({
  params: { requestId },
}: {
  params: { requestId: Id<"repairRequests"> };
}) => {
  return (
    <section className="pr-4 pl-4 sm:pr-0 sm:pl-0 relative lg:h-screen lg:overflow-y-auto md:h-auto sm:h-auto sm:overflow-none">
      <div className="lg:flex mx-auto">
        <div
          className="lg:w-6/12 sm:w-full hidden lg:flex h-screen sticky top-0"
          style={styles.bgImg}
        >
          <div className="px-5 py-3">
            <button
              type="button"
              className="rounded-lg px-10 py-3 bg-white text-base font-normal text-black"
            >
              <Link href="/sign-up">Create your account</Link>
            </button>
          </div>
          <div className="text-base text-white">
            <div className="carousel-btn absolute left-6 bottom-8">
              <Image
                src="/images/bullet.png"
                alt="logo"
                width={130}
                height={25}
                className="w-full dark:hidden"
              />
            </div>
            <div className="absolute right-5 bottom-8">
              <p>help@mygadgetpadi.com</p>
            </div>
          </div>
        </div>
        <ScrollArea className="lg:w-6/12 sm:w-full bg-white dark:bg-dark sm:p-[50px] lg:overflow-y-auto">
          <div className="hidden sm:flex w-full justify-end  absolute right-6 top-3 py-3 px-5">
            <Link href="/">
              <div>
                <Image
                  src="/images/logo/logo.png"
                  alt="logo"
                  width={130}
                  height={25}
                  className="w-full dark:hidden"
                />
              </div>
            </Link>
          </div>
          <div className="mt-5 lg:w-10/12 sm:w-full mx-auto">
            <h3 className="mb-2 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
              Let’s Repair it Now
            </h3>
            <p className="mb-5 text-center text-sm font-normal text-indigo-700">
              One stop for everything about your gadget
            </p>
            <RequestFixComplete requestId={requestId} />
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};

const styles = {
  bgImg: {
    backgroundImage: `url('/images/formImg.jpg')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  },
};

export default LandingComplete;