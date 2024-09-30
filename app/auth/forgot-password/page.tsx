import CustomForgotPassword from '@/components/custom-authentication/forgot-password';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Forgot Password | MyGadgetPadi",
  description: "Securely get back into your account",
};

const Page = () => {
  return (
    <CustomForgotPassword />
  );
};

export default Page;