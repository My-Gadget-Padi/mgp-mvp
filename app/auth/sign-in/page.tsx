import CustomSignIn from "@/components/custom-authentication/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin | MyGadgetPadi",
  description: "Sign in to your account",
};

const SigninPage = () => {
  return (
    <CustomSignIn />
  );
};

export default SigninPage;
