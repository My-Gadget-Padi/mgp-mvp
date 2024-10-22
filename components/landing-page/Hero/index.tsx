import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-white pb-40 pt-28 sm:pt-40 md:pt-40 lg:pt-48 dark:bg-gray-dark"
    >
      <div className="container">
        <div className="lg:flex md:block sm:block">
          <div className="w-full lg:w-6/12 flex items-center">
            <div className="text-left">
              <Badge variant="outline" className="py-2">Do it all in one shop</Badge>
              <h2 className="text-4xl font-semibold leading-normal text-black">
                Protect, Repair, and Trade-in <br />
                your Gadgets with{" "}
                <span className="text-orange-300">GadgetPadi</span>
              </h2>
              <p className="lg:mb-8 md:mb-3 sm:mb-1 mt-2 text-base font-light text-slate-900">
                We are your go-to for all things gadgets—whether you need
                protection, <br />
                repairs, trade-ins, or just want to shop for the latest gadgets,{" "}
                <br />
                we’ve got it all in one easy place.
              </p>
              <div className="mt-4">
                <Link href="/request-fix">
                  <Button className="py-6 px-8 bg-[#6445E8] hover:bg-[#6445E8]/90">
                    Request a repair
                  </Button>
                </Link>
                <Link href="/sign-in" className="lg:hidden">
                  <Button variant="outline" className="py-6 px-8 border-[#6445E8] hover:bg-[#6445E8]/90 hover:text-white ml-2">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:w-6/12 mt-8 sm:pt-0 md:w-full sm:w-full flex mx-auto sm:py-10 lg:py-0">
            <Image
              src="/images/hero/home.jpg"
              alt="alt image"
              width={150}
              height={40}
              className="w-full rounded-lg"
              quality={100}
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;