import Link from "next/link";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: " create and confirm password after recovery ",
  description: "This is Sign Up to MGP Dashboard",
};

const newPage = () => {
  return (
    <>
       <section className="relative lg:h-screen lg:overflow-hidden md:h-auto sm:h-auto sm:overflow-none">
        <div className="lg:flex mx-auto">
          <div className="lg:w-6/12 sm:w-full  h-full relative" style={styles.bgimg}>
              <div className="px-5 py-3">
              <button className="rounded-lg px-10 py-3 bg-white text-base font-normal text-black">
              <Link href="/repair/form" >Repair</Link></button> 
              </div>
             
              <div className="text-base text-white">
                <div className="carousel-btn absolute left-6 bottom-8">
                <Image src="/images/bullet.png"
                  alt="logo"
                  width={130}
                  height={25}
                  className="w-full dark:hidden"
                /> 
                </div>
                <div className="absolute right-5 bottom-8"><p>Help@mygadgetpadi.com</p></div>
              </div>


          </div>
          <div className="lg:w-6/12 sm:w-full bg-white  dark:bg-dark sm:p-[60px] relative">
            <button className="border-2 border-black rounded-lg absolute right-6 top-3 px-5 py-2"><Link href="/auth/login" >Login</Link></button>

            <div className=" lg:w-10/12 sm:w-full mx-auto">
              <h3 className="mb-2 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Mygadgetpadi
              </h3>
              <p className="mb-5 text-center text-sm font-normal text-indigo-700">
                we can help you in
              </p>
              <form className="my-2">
                <div className="mb-5">
                  <label htmlFor="text" className="mb-3 block text-sm text-dark dark:text-white">
                    New Password
                  </label>
                  <input type="password" name="Password" placeholder="password"
                    className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full  border bg-[#f8f8f8] px-6 py-3 text-base font-light text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none" />
                </div>
                <div className="mb-5">
                  <label htmlFor="text" className="mb-3 block text-sm text-dark dark:text-white">
                    Confirm Password
                  </label>
                  <input type="password" name="password" placeholder="password"
                    className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full  border bg-[#f8f8f8] px-6 py-3 text-base font-light text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none" />
                </div>
            
            
                <div className="mb-6">
                  <button
                    className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-lg bg-indigo-600 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-gray-600">
                    Create Password
                  </button>
            
                </div>
              </form>
            </div>
              
            </div>

      </div>
      </section>
    </>
  );
};

const styles = {
  bgimg: {
    backgroundImage: `url('../images/formImg.jpg')`,  
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',     
    backgroundPosition: 'center', 
    height: '100vh',             
  },
};

export default newPage;
