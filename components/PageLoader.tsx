import React from "react";
import Image from "next/image";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Image
        className="aspect-square animate-bounce rounded-md object-cover"
        height="200"
        width="200"
        src="/images/mgp-transparent.png"
        alt="Device placeholder"
        quality={100}
        unoptimized
        priority
      />
    </div>
  );
};

export default PageLoader;