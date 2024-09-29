import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex-col items-center justify-center h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative flex-col hidden h-full p-10 text-white bg-muted lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src="/images/logo.png"
            width={180}
            height={50}
            alt="mygadgetpadi-ai logo"
            className=""
            priority={true}
          />
        </div>
      </div>
      <div className="flex items-center h-full p-4 lg:p-8">
        <div className="flex flex-col items-center justify-center w-full mx-auto space-y-6">
          <div className="flex flex-col space-y-2 text-center">{children}</div>
        </div>
      </div>
    </div>
  );
};