"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

//Signup page built by Bola, added custom authentication flow
const CustomSignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [emailAddress, setEmailAddress] = useState<string | null>(null);

  const router = useRouter();

  if (isSignedIn) {
    router.push('/dashboard')
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const response = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });
      setEmailAddress(response.emailAddress);

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setIsVerificationStep(true);
      setLoading(false);
    } catch (err: any) {
      setError(err.errors ? err.errors[0]?.message : "Signup failed");
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      await signUp.attemptEmailAddressVerification(
        { code }
      );

      if (signUp.createdSessionId) {
        await setActive({ session: signUp.createdSessionId });
        router.push("/dashboard");
      } else {
        setError("Session ID is null, unable to set active session.");
        console.error("Session ID is null after verification");
      }
    } catch (err: any) {
      setError(err.errors ? err.errors[0]?.message : "Verification failed");
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
            <button type="button" className="rounded-lg px-10 py-3 bg-white text-base font-normal text-black">
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

        <div className="lg:w-6/12 sm:w-full bg-white dark:bg-dark sm:p-[60px] relative">
          <button
            type="button"
            className="border-2 border-black rounded-lg absolute right-6 top-3 px-5 py-2"
          >
            <Link href="/auth/sign-in">Login</Link>
          </button>

          <div className="lg:w-10/12 sm:w-10/12 mx-auto">
            <h3 className="mb-2 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
              MyGadgetPadi
            </h3>
            <p className="mb-5 text-center text-sm font-normal text-indigo-700">
              One stop for everything about your gadget
            </p>

            {error && <p className="text-red-500 mb-5 text-center">{error}</p>}

            {!isVerificationStep ? (
              <>
                <form className="my-2" onSubmit={handleSignup}>
                  <div className="mb-5">
                    <label
                      htmlFor="firstName"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      First Name (optional)
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base font-light text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="lastName"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Last Name (optional)
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base font-light text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base font-light text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base font-light text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-lg bg-indigo-600 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-gray-600 ${
                        loading ? "opacity-50" : ""
                      }`}
                    >
                      {loading ? "Creating account..." : "Create an account"}
                    </button>
                  </div>
                </form>
                <button
                  type="button"
                  onClick={async () => {
                    if (!isLoaded) return;
                    try {
                      await signUp.authenticateWithRedirect({
                        strategy: "oauth_google",
                        redirectUrl: "/dashboard",
                        redirectUrlComplete: "/dashboard",
                      });
                    } catch (err) {
                      setError("Google signup failed.");
                      console.error(err);
                    }
                  }}
                  className="border-stroke dark:text-body-color-dark dark:shadow-two mt-3 flex w-full items-center justify-center rounded-lg border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-blue hover:bg-blue/5 hover:text-blue dark:border-transparent dark:bg-[#2C303B] dark:hover:border-blue dark:hover:bg-blue/5 dark:hover:text-blue dark:hover:shadow-none"
                >
                  <span className="mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_95:967)">
                        <path
                          d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_95:967">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Continue with Google
                </button>
              </>
            ) : (
              <form className="my-2" onSubmit={handleVerification}>
                <div className="mb-5">
                  <label
                    htmlFor="code"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Verification Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base font-light text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-lg bg-indigo-600 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-gray-600 ${
                      loading ? "opacity-50" : ""
                    }`}
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                </div>
              </form>
            )}
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

export default CustomSignUp;