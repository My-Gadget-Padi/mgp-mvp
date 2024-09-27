import { brandCard } from "@/types/brandCard";
import Image from "next/image";
import Link from "next/link";

const SingleCard = ({ card }: { card: brandCard}) => {
  const { title, paragraph, image,imageIcon } = card;
  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-black shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
        <div className="p-8 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8 ">
          <h3
              className="mb-1 text-base font-bold text-white hover:text-white dark:text-white dark:hover:text-indigo-700"
            >
              {title}
          </h3>
          <p className="py-8  text-sm font-ligt text-white dark:border-white dark:border-opacity-10">
            {paragraph}
          </p>
          <Link
          href="/blog-details"
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute left-2 top-6 z-20 inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold capitalize text-white">
            <Image src={image} width={35} height={35} alt="description" />

          </span>

          <span className="absolute right-6 bottom-3 z-20 inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold capitalize text-white">
            <Image src={imageIcon} width={80} height={80} alt="description" />
          </span>
        </Link>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
