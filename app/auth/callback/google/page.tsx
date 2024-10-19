import VerifyGoogle from "@/components/custom-authentication/verify-google";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin | MyGadgetPadi",
  description: "Sign in to your account",
};

const SigninPage = () => {
  return <VerifyGoogle />;
};

export default SigninPage;
