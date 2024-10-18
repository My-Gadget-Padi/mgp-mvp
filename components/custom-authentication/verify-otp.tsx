"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

// Login page built by Fola, added custom authentication flow
const VerifyOTP = () => {
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("/dashboard");
  const verifyOtp = useAction(api.auth.verifyOtp);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url =
        new URLSearchParams(window.location.search).get("redirect_url") ||
        "/dashboard";
      setRedirectUrl(url);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setLoading(true);
      setErrorMessage("");

      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const otp = formData.get("otp") as string;
      const userAgent = navigator.userAgent;
      await verifyOtp({ email, otp, userAgent });
      setStep({ email: formData.get("email") as string });
    } catch (err) {
      console.error("Verification error:", err);
      setErrorMessage("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative lg:h-screen lg:overflow-hidden md:h-auto sm:h-auto sm:overflow-none">
      <div className="lg:flex mx-auto">
        <div
          className="lg:w-6/12 sm:w-full hidden lg:flex h-full relative"
          style={styles.bgImg}
        >
          <div className="px-5 py-3">
            <button
              type="button"
              className="rounded-lg px-10 py-3 bg-white text-base font-normal text-black"
            >
              <Link href="/repair/request-fix">Repair</Link>{" "}
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
        <div className="lg:w-6/12 mt-4 sm:mt-0 w-full pr-4 pl-4 sm:pr-0 sm:pl-0 sm:w-full bg-white dark:bg-dark sm:p-[60px] relative">
          <button
            type="button"
            className="hidden sm:block border-2 border-black rounded-lg absolute right-6 top-3 py-3 px-5"
          >
            <Link href="/auth/sign-up">Create Account</Link>
          </button>

          <div className="mt-5 lg:w-10/12 sm:w-full mx-auto">
            <h3 className="mb-2 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
              MyGadgetPadi
            </h3>
            <p className="mb-5 text-center text-sm font-normal text-indigo-700">
              One stop for everything about your gadget
            </p>
            <form onSubmit={handleSubmit} className="my-2">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-sm text-dark dark:text-white"
                >
                  Your Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-sm text-dark dark:text-white"
                >
                  OTP
                </label>
                <input
                  type="number"
                  name="otp"
                  placeholder="Enter the OTP"
                  required
                  className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                />
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  disabled={loading}
                  className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-lg bg-indigo-600 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-gray-600 ${
                    loading ? "opacity-50" : ""
                  }`}
                >
                  {loading ? "Loading..." : "Verify OTP"}
                </button>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p>
              )}
            </form>

            <button
              className="text-base text-center py-1 text-gray-500 font-light"
              type="button"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </button>
          </div>
        </div>
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

export default VerifyOTP;
