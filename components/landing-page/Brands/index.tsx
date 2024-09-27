
import Image from "next/image";
import Link from "next/link";


const BrandForm = () => {
  return (
    <section className="mt-12 sm:mt-3 ">
      <div className="container">
          <div className="lg:flex md:block sm:blocl items-center w-full border-red border lg:h-52 sm:h-auto sm:py-3 lg:py-8 md:py-15 justify-center rounded-lg bg-black px-8 dark:bg-gray-dark">
            <div className="lg:w-5/12 sm:w-full  text-left  lg:mt-0 sm:mt-5">
            <h2 className="lg:text-2xl sm:text-base font-medium leading-normal text-white">
            Get your gadget fix in <br/>by professionals only.
                </h2>
            <button className="bg-indigo-600 lg:text-base sm:text-sm font-medium text-white py-3 px-8  rounded mt-3" type="button">
            <Link href="/repair/form">Request a Fix</Link>
                </button>
            </div>
            <div className="lg:w-5/12 lg:flex flex-wrap justify-end lg:mt-0 sm:mt-5">
            <p className="text-base font-thin text-white">this is a text, don’t read except you’re one... I caught you reading this, better stop now or the next line is going to hit you really well. You are smart👌</p>
            <p className=" text-base font-medium text-white py-3 px-8 mt-2 border-2 rounded-lg">
            <Link href="/auth/signup"> Join community <span className="pl-2"></span></Link>
                </p>
            </div>
          </div>
        </div>
    </section>
  );
};

export default BrandForm;
