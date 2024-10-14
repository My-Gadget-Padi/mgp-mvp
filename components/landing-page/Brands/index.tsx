
import Image from "next/image";
import Link from "next/link";


const BrandForm = () => {
  return (
    <section className="mt-12 sm:mt-3 ">
      <div className="container">
          <div className="lg:flex md:block sm:blocl items-center w-full border-red border lg:h-52 sm:h-auto sm:py-3 lg:py-8 md:py-15 justify-center rounded-lg bg-black px-8 dark:bg-gray-dark">
            <div className="lg:w-5/12 sm:w-full  text-left  lg:mt-0 sm:mt-5">
            <h2 className="lg:text-2xl sm:text-base font-medium leading-normal text-white">
              Get your gadget fixed <br/>by professionals only.
            </h2>
            <button className="bg-indigo-600 mt-6 lg:text-base sm:text-sm font-medium text-white py-3 px-8  rounded" type="button">
            <Link href="/repair/request-fix">Request a Fix</Link>
                </button>
            </div>
            <div className="lg:w-5/12 lg:flex flex-wrap justify-end lg:mt-4 pb-4 pt-4 sm:mt-5">
            <p className="text-base font-thin text-white mt-12 md:mt-0">Be the first to know about exciting updates, exclusive offers, and the latest news on MyGadgetPadi! Connect with like-minded tech enthusiasts and gadget lovers on our WhatsApp community. Get direct access to tips, early access to promotions, and insider updates on new features and services.</p>
            <p className="mt-5 mb-4 text-base font-medium text-white py-3 px-8 border-2 rounded-lg">
              <Link href="https://chat.whatsapp.com/F8YT2S7NmBX9iB8DPbZey9">Join our community<span className="pl-2"></span></Link>
            </p>
            </div>
          </div>
        </div>
    </section>
  );
};

export default BrandForm;
