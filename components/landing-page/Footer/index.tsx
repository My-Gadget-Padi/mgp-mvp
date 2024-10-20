"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-black py-10 dark:bg-white md:pt-12 lg:pt-15">
        <div className="container">
          <div className="w-full text-white flex flex-wrap justify-center">
            <div className="text-center lg:w-6/12 mb-10">
              <h2 className="font-semibold text-lg mb-4">
                Stay Connected with Us
              </h2>
              <p className="text-sm font-light mt-5">
                Wherever you are, we’re here to help. Join us on our journey as we 
                continue to make tech support easy, accessible, and enjoyable for everyone. 
                We believe in creating strong connections—with both your gadgets and you.
              </p>
            </div>
          </div>

          <Link href="https://chat.whatsapp.com/F8YT2S7NmBX9iB8DPbZey9">
            <div
              className="lg:mb-15 sm:mb-5 lg:w-full text-center sm:w-full"
              style={styles.bgImg}
            ></div>
          </Link>

          {/* Footer Links Section */}
          <div className="flex lg:w-full lg:mt-8 sm:mt-5 gap-20 justify-center text-center items-center text-sm font-normal text-white">
            {/**<Link href="/terms" className="px-1">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="px-1">
              Privacy Policy
            </Link>
            */}
            <Link href="/request-fix" className="px-1">
              Request a Fix
            </Link>
            <Link href="#about-us" className="px-1">
              About Us
            </Link>
            <Link href="#faqs" className="px-1">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

const styles = {
  bgImg: {
    backgroundImage: `url('../images/footerbg.png')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "400px",
  },
};

export default Footer;