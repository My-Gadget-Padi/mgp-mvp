// create sign in
import Link from "next/link";
import Image from "next/image";
import { Style } from "util";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Repair page ",
  description: "This is direct client to the whatsapp Customer service department",
  // other metadata
};

const RepairPage = () => {
  return (
    <>
      <section className="relative lg:h-screen lg:overflow-hidden md:h-auto sm:h-auto sm:overflow-none">
        <div className="lg:flex mx-auto">
          <div className="lg:w-6/12 sm:w-full  h-full relative" style={styles.bgimg}>
            <div className="px-5 py-3">
              <button type="button" className="rounded-lg px-10 py-3 bg-white text-base font-normal text-black">
                <Link href="/auth/signup" >Repair</Link></button>
            </div>

            <div className="text-base text-white">
              <div className="carousel-btn absolute left-6 bottom-8">
                <Image src="/images/bullet.png"
                  alt="logo"
                  width={130}
                  height={25}
                  className="w-full dark:hidden"
                />
              </div>
              <div className="absolute right-5 bottom-8"><p>Help@mygadgetpadi.com</p></div>
            </div>


          </div>
          <div className="lg:w-6/12 sm:w-full bg-white  dark:bg-dark sm:p-[60px] relative">
            <div className="w-full flex justify-end  absolute right-6 top-3 py-3 px-5">
            <Link href="/" ><div>
             
                <Image
                  src="/images/logo/logo.png"
                  alt="logo"
                  width={130}
                  height={25}
                  className="w-full dark:hidden"
                />
              </div></Link>

            </div>


            <div className="mt-5 lg:w-10/12 sm:w-full mx-auto">
              <h3 className="mb-2 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Let’s Repair it now
              </h3>
              <p className="mb-5 text-center text-sm font-normal text-indigo-700">
                One stop for everything about your gadget
              </p>
              <form className="my-2">
                <div className="mb-5">
                  <label
                    htmlFor="Gadget Name"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Your Laptop Name
                  </label>
                  <input
                    type="text"
                    name="Gadget Name"
                    placeholder="mac book pro 2024"
                    className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full  border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="Gadget model"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Your Laptop Model
                  </label>
                  <input
                    type="text"
                    name="Gadget model & config"
                    placeholder="Apple"
                    className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full  border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="Gadget model"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Briefly explain your issue
                  </label>
                  <textarea
                    // rows={10}
                    name="Gadget model & config"
                    placeholder="I need a quick fix , my laptop screen is broken."
                    className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full  border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                  />
                </div>

                <div className="mb-5">
                  <button className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-lg bg-indigo-600 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-gray-600">
                    Submit Request
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const styles = {
  bgimg: {
    backgroundImage: `url('../images/formImg.jpg')`,  // Add your image path here
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',     // Makes the image cover the entire container
    backgroundPosition: 'center', // Centers the background image
    height: '100vh',             // Full viewport height
  },

};

export default RepairPage;
