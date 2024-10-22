"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSignUp, useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Helper function to generate a unique 21-character password
const generatePassword = (length = 21) => {
  if (typeof window !== "undefined" && window.crypto) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|:;<>,.?/";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (x) => charset[x % charset.length]).join("");
  } else {
    return Math.random().toString(36).slice(-length);
  }
};

const CustomSignUp = () => {
  const router = useRouter();
  const {
    signUp,
    isLoaded: isSignUpLoaded,
    setActive: setActiveSignup,
  } = useSignUp();
  const { signIn, isLoaded: isSignInLoaded, setActive } = useSignIn();
  const { isSignedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password] = useState(generatePassword());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  const handleSignUpOrSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!isSignUpLoaded || !isSignInLoaded) return;
    const redirectUrl = `${window.location.origin}/dashboard`;
    try {
      const response = await signUp.create({
        emailAddress: email,
        password,
      });

      if (response) {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_link",
          redirectUrl,
        });

        setActiveSignup({ session: signUp.createdSessionId });
        setShowMessage(true);
      }
    } catch (error: any) {
      if (error.errors.some((e: any) => e.code === "form_identifier_exists")) {
        try {
          const signInAttempt = await signIn.create({
            identifier: email,
          });

          const emailAddressIdObj: any =
            signInAttempt?.supportedFirstFactors?.find(
              (factor) => factor.strategy === "email_link"
            );

          const emailAddressId: any = emailAddressIdObj?.emailAddressId || "";

          if (emailAddressId) {
            await signIn.prepareFirstFactor({
              strategy: "email_link",
              redirectUrl,
              emailAddressId,
            });

            setActive({ session: signInAttempt.createdSessionId });
            setShowMessage(true);
          } else {
            throw new Error("Email address ID not found");
          }
        } catch (signInError) {
          console.error("Sign-in error:", signInError);
          setError("Something went wrong while signing in. Please try again.");
        }
      } else {
        console.error("Sign-up error:", error.errors);
        setError(
          error?.errors[0]?.longMessage ??
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpOrSigninWithGoogle = async () => {
    setLoading(true);
    if (!isSignUpLoaded || !isSignInLoaded) return;
    const redirectUrl = `${window.location.origin}/dashboard`;

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: redirectUrl,
        redirectUrlComplete: redirectUrl,
      });
    } catch (err: any) {
      console.error("Sign-in error:", err);
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
              <Link href="/request-fix">Repair</Link>{" "}
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
            <Link href="/sign-in">Signin</Link>
          </button>

          <div className="mt-5 lg:w-10/12 sm:w-10/12 mx-auto">
            <h3 className="mb-2 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
              MyGadgetPadi
            </h3>
            <p className="mb-5 text-center text-sm font-normal text-indigo-700">
              One stop for everything about your gadget
            </p>
            {!showMessage ? (
              <form onSubmit={handleSignUpOrSignIn} className="my-2">
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Signup with your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-stroke rounded-lg dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                  />
                </div>

                <div className="mb-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-lg px-9 py-4 text-base font-medium text-white duration-300 ${
                      loading ? "bg-[#6445E8] cursor-not-allowed opacity-50" : "bg-[#6445E8] hover:bg-[#6445E8]/80"
                    }`}
                  >
                    {loading ? "Loading..." : "Continue with email"}
                  </button>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}
              </form>
            ) : (
              <p className="text-center text-muted-foreground">
                Check your email for your personalized access link. Click the
                link to securely sign in or complete your sign-up for
                MyGadgetPadi.
              </p>
            )}

            {!showMessage && (
              <button
                type="button"
                onClick={handleSignUpOrSigninWithGoogle}
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