import { SignUp } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up | MyGadgetPadi',
  description: 'Create your free account'
};

const Page = () => {
  return (
    <div className="flex-1 py-32 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
      <SignUp path="/auth/sign-up" />
    </div>
    </div>
  )
}

export default Page