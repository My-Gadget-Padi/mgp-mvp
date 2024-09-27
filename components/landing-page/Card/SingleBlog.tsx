import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, tags, } = blog;
  return (
    <>
      <div className="group relative overflow-hidden rounded-lg bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
        <div className="p-6 sm:p-8 md:px-8 md:py-8 lg:p-10 xl:px-5 xl:py-8 2xl:p-8">
          <h3 className="flex">
            <Link
              href="/blog-details"
              className="mb-1 text-2xl font-bold text-black hover:text-indigo-700 dark:text-white dark:hover:text-indigo-700"
            >
              {title}
            </Link>
            <span className="absolute right-6 top-8 z-20 inline-flex items-center justify-center rounded-full bg-black px-4 py-1 text-sm font-semibold  text-white">
              {tags[0]}
            </span>
          </h3>
          <p className="py-2 mb-5 text-sm font-normal text-black dark:border-white dark:border-opacity-10">
            {paragraph}
          </p>
          <Link
            href="/blog-details"
            className="relative block aspect-[37/22] w-full">
            <div className="h-15">
              <Image src={image} alt="image" fill className="rounded-lg" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
