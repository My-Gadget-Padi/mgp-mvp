import { SignIn } from '@clerk/nextjs'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your account'
};

const Page = () => {
  return (
    <div className="flex-1 py-32 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
      <SignIn path="/sign-in" />
    </div>
    </div>
  )
}

export default Page