import Image from "next/image";

const TestimonialSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="flex justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full text-sm px-4 py-1 border border-gray-300 font-light text-black text-center dark:text-white mb-6">
              Testimonials
            </div>

            {/* Mobile View */}
            <div className="flex flex-col items-center space-y-2 sm:hidden">
              <div className="text-xl font-medium leading-relaxed text-slate-700">
                Loved by people
              </div>
              <Image
                src="/images/testimonials/person1.jpg"
                alt="Person smiling"
                className="rounded-full"
                width={50}
                height={50}
                quality={100}
                unoptimized
              />
              <div className="text-xl font-medium leading-relaxed text-slate-700">
                who truly
              </div>
              <Image
                src="/images/testimonials/person2.jpg"
                alt="Person caring"
                className="rounded-full"
                width={50}
                height={50}
                quality={100}
                unoptimized
              />
              <div className="text-xl font-medium leading-relaxed text-slate-700">
                care about their gadgets
              </div>
              <Image
                src="/images/testimonials/person3.jpg"
                alt="Person with gadget"
                className="rounded-full"
                width={50}
                height={50}
                quality={100}
                unoptimized
              />
              <div className="text-xl font-medium leading-relaxed text-slate-700">
                both users and retailers.
              </div>
            </div>

            {/* Larger screens (sm and above) */}
            <div className="hidden sm:flex flex-col items-center">
              <div className="w-full text-xl font-medium leading-relaxed text-slate-700 sm:text-xl flex items-center justify-center space-x-3 mb-2">
                <span>Loved by people</span>
                <Image
                  src="/images/testimonials/person1.jpg"
                  alt="Person smiling"
                  className="rounded-full"
                  width={50}
                  height={50}
                  quality={100}
                  unoptimized
                />
                <span>who truly</span>
                <Image
                  src="/images/testimonials/person2.jpg"
                  alt="Person caring"
                  className="rounded-full"
                  width={50}
                  height={50}
                  quality={100}
                  unoptimized
                />
                <span>care</span>
              </div>

              <div className="w-full text-xl font-medium leading-relaxed text-slate-700 sm:text-xl flex items-center justify-center space-x-3 mb-2">
                <span>about their gadgets</span>
                <Image
                  src="/images/testimonials/person3.jpg"
                  alt="Person with gadget"
                  className="rounded-full"
                  width={50}
                  height={50}
                  quality={100}
                  unoptimized
                />
                <span>both users and</span>
              </div>

              <div className="w-full text-xl font-medium leading-relaxed text-slate-700 sm:text-xl flex items-center justify-center">
                <span>retailers.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;