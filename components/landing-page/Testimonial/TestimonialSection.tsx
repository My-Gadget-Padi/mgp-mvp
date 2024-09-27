// import 
import Image from "next/image";

const TestimonialSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 flex justify-center">
              <div className="flex flex-wrap items-center justify-center text-center">
              <div className="rounded-full text-sm px-3 py-1 border font-light text-black  text-center dark:text-white sm:text-lg  md:text-sm mb-3">Testimonials</div>
              <div className="w-full text-lg font-medium leading-relaxed text-slate-700 sm:text-lg sm:leading-relaxed">
                Loved by people    <img/>        who truly            care about their gadgets      <img/>                  both users and retailers.
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
