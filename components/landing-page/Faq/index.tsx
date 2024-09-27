"use client";
import SectionTitle from "../Common/SectionTitle2";
import faqData from "./faqData";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUp } from "lucide-react";


const faq = () => {
  return (
    <section
      id="id"
      className="bg-black dark:bg-white py-16 md:py-10 lg:py-20"
    >
      <div className="container">
      <SectionTitle
          subtitle="FAQs"
          title="Let's your Padi team answer your question"
          paragraph="this is a text, don’t read except you’re one... I caught you reading this, better stop now or the next line is going to hit you really well. You are smart"
          center
        />
        <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqData.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-black rounded-full bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span className="font-semibold text-base">{item.question}</span>
                    <ChevronUp
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-white dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
        </div>

        <div className="text-center">
          <p className="text-base font-normal text-white"> Have a different question? <span className="underline text-indigo-700"> send us a mail</span></p>
        </div>
     </div> 
      </section>
)}

export default faq;