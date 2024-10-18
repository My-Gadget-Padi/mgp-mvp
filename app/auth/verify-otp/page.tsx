import VerifyOTP from "@/components/custom-authentication/verify-otp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin | MyGadgetPadi",
  description: "Sign in to your account",
};

const SigninPage = () => {
  return <VerifyOTP />;
};

export default SigninPage;
