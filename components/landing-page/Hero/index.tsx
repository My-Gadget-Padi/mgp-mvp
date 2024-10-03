import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[100px] dark:bg-gray-dark md:pb-[20px] md:pt-[120px] xl:pb-[100px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="lg:flex md:block sm:block">
            <div className="w-6/12 flex items-center px-4">
              <div className="text-left">
                <div className="rounded-full lg:w-4/12 sm:w-full text-sm px-2 py-1 border-[.5px] border-black text-black  text-center dark:text-white sm:text-lg  md:text-sm font-light">Do it all in one shop</div>
                <h2 className="text-4xl font-semibold leading-normal text-black">
                  We’re your gadgetpadi <br />
                  <span className="text-orange-300">Repair</span> them here.
                </h2>
                <p className="lg:mb-8 md:mb-3 sm:mb-1 mt-2 text-base font-light text-slate-900">
                  At My Gadget Padi, we’re all about keeping you connected.<br />
                  Get the latest devices, fast repairs, and affordable insurance<br />
                  in one place. No hassle, No worries – just tech solutions made easy.
                </p>
                <button className="bg-indigo-600 text-base font-medium text-white py-3 px-8 rounded mt-2" type="button">
                  <Link href="/repair/request-fix">Request a repair</Link>
                </button>

                <div className="flex lg:mt-32 md:mt-10 sm:mt-8">
                  <img src="/images/hero/people.png" alt="people" width={80} className="lg:block sm:hidden"/>
                  <p className="text-sm font-light ml-3"> Joined the hundreds <br />
                    anticipating our launch</p>
                </div>

              </div>
            </div>

          <div className="lg:w-6/12  md:w-8/12 sm:w-full px-4 flex mx-auto sm:py-10 lg:py-0">
              <Image
                src="/images/hero/gadget.png"
                alt="alt image"
                width={150}
                height={40}
                className="w-full dark:block"
              />
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
