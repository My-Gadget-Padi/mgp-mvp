import Link from "next/link";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recovery option to creating new password",
  description: "This route to sign into MGP Dashboard",
};

const forgetPasswordPage = () => {
  return (
    <>
       <section className="relative lg:h-screen lg:overflow-hidden md:h-auto sm:h-auto sm:overflow-none">
        <div className="mx-auto lg:flex">
          <div className="relative h-full lg:w-6/12 sm:w-full" style={styles.bgimg}>
              <div className="px-5 py-3">
              <button className="px-10 py-3 text-base font-normal text-black bg-white rounded-lg">
              <Link href="/repair/form" >Repair</Link></button> 
              </div>
             
              <div className="text-base text-white">
                <div className="absolute carousel-btn left-6 bottom-8">
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
            <button className="absolute px-5 py-2 border-2 border-black rounded-lg right-6 top-3"><Link href="/auth/login" >Login</Link></button>

            <div className="mx-auto  lg:w-10/12 sm:w-full">
              <h3 className="mb-2 text-2xl font-bold text-center text-black dark:text-white sm:text-3xl">
                Mygadgetpadi
              </h3>
              <p className="mb-5 text-sm font-normal text-center text-indigo-700">
                we can help you in
              </p>
              <form className="my-2">
                <div className="mb-5">
                  <label htmlFor="text" className="block mb-3 text-sm text-dark dark:text-white">
                    Email
                  </label>
                  <input type="email" name="email" placeholder="Email address"
                    className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full  border bg-[#f8f8f8] px-6 py-3 text-base font-light text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none" />
                </div>
              
            
            
                <div className="mb-6">
                  <button
                    className="flex items-center justify-center w-full py-4 text-base font-medium text-white duration-300 bg-indigo-600 rounded-lg shadow-submit dark:shadow-submit-dark px-9 hover:bg-gray-600">
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

export default forgetPasswordPage;