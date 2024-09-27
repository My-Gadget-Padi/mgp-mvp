"use client";
import Image from "next/image";
import Link from "next/link";


const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-black py-10 dark:bg-white md:pt-12 lg:pt-15">
        <div className="container">

          <div className="w-full text-white flex flex-wrap justify-center">
            <div className='text-center lg:w-6/12 mb-10'>
              <h2 className="font-semibold text-lg mb-4">Connect with us everywhere</h2>
              <p className="text-sm font-light mt-5 "> This is a text, don&apos;t read except you&apos;re one... I caught you reading this,
                better stop now or the next line is going to hit you really well. You are smart</p>
            </div>
          </div>

          <div className="lg:mb-15 sm:mb-5 lg:w-full text-center sm:w-6/12"  style={styles.bgimg}></div>

          <div className="flex lg:w-8/12  lg:mt-8 sm:mt-5 mx-auto justify-between items-center text-sm font-normal text-white">

            <p className=" px-1">Terms and condition</p>
            <p className=" px-1 ">Privacy and policy</p>
            <p className=" px-1 ">Request a fix</p>
            <p className=" px-1 ">About us</p>
            <p className=" px-1 ">FAQ</p>
          </div>

        </div>
        {/* </div> */}
      </footer>
    </>
  );
};

const styles = {
  bgimg: {
    backgroundImage: `url('../images/footerbg.png')`,  
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',     
    backgroundPosition: 'center', 
    height: '400px', 
    // width:'100%' ,           
  },
};

export default Footer;
