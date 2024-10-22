import CustomSignUp from '@/components/custom-authentication/sign-up';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Signup | MyGadgetPadi",
  description: "Create your free account on MyGadgetPadi",
};

const Page = () => {
  return (
    <CustomSignUp />
  );
};

export default Page;