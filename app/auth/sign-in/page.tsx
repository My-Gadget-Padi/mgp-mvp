import CustomSignIn from "@/components/custom-authentication/sign-in";
import Authorize from "@/components/custom-authentication/authorize";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin | MyGadgetPadi",
  description: "Sign in to your account",
};

const SigninPage = () => {
  return <Authorize />;
};

export default SigninPage;
