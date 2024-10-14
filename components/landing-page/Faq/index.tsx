"use client";
import SectionTitle from "../Common/SectionTitle2";
import faqData from "./faqData";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Grouped FAQ data by sections
const faqSections = [
  {
    category: "General Inquiries",
    items: faqData.filter((item) =>
      [
        "What services does MyGadgetPadi offer?",
        "How do I contact MyGadgetPadi customer support?",
        "Do you offer financing options for purchases?",
        "Can I trade in my old mobile device for a new one?",
        "Do you offer shipping services for repairs and purchases?",
      ].includes(item.question)
    ),
  },
  {
    category: "Mobile Gadget-Specific Questions",
    items: faqData.filter((item) =>
      [
        "What types of devices do you repair?",
        "How long does it typically take to repair a device?",
        "Do you offer screen repair services for smartphones and tablets?",
        "Can you repair water damage to my device?",
        "Do you sell accessories for mobile devices?",
        "Can you help me transfer data from my old device to my new one?",
        "Do you offer unlocking services for locked devices?",
      ].includes(item.question)
    ),
  },
  {
    category: "Device Purchase",
    items: faqData.filter((item) =>
      [
        "Do you sell new or refurbished devices?",
        "What is your return policy for purchased devices?",
      ].includes(item.question)
    ),
  },
  {
    category: "Device Trade-In",
    items: faqData.filter((item) =>
      [
        "What types of devices can I trade in?",
        "How much credit will I receive for my trade-in?",
      ].includes(item.question)
    ),
  },
  {
    category: "Extended Warranty",
    items: faqData.filter((item) =>
      [
        "What does an extended warranty cover?",
        "How long are extended warranty plans valid?",
      ].includes(item.question)
    ),
  },
  {
    category: "Customer Service and Support",
    items: faqData.filter((item) =>
      [
        "What is your warranty policy for repaired devices?",
        "Can I track the status of my repair order online?",
        "What should I do if I am not satisfied with a repair?",
      ].includes(item.question)
    ),
  },
  {
    category: "Payment and Refunds",
    items: faqData.filter((item) =>
      [
        "What payment methods do you accept?",
        "Can I cancel my order after it has been placed?",
      ].includes(item.question)
    ),
  },
  {
    category: "Legal and General",
    items: faqData.filter((item) =>
      ["Are there any limitations on liability for MyGadgetPadi?"].includes(item.question)
    ),
  },
];

const Faq = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (question: any) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <section id="faq" className="bg-black dark:bg-white py-16 md:py-10 lg:py-20">
      <div className="container mx-auto text-center">
        <SectionTitle
          subtitle="FAQs"
          title="Welcome to MyGadgetPadi's FAQ!"
          paragraph="We’re here to help answer any questions you may have. If you need assistance, the Padi team is always ready to guide you."
          center
        />

        <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-10">
              <h3 className="text-xl font-bold text-white dark:text-black mb-5 text-center">{section.category}</h3>
              {section.items.map((item, index) => (
                <div key={item.question} className="mb-5">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton
                          onClick={() => toggleQuestion(item.question)}
                          className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-black rounded-full bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200"
                        >
                          <span className="font-semibold text-base">{item.question}</span>
                          <ChevronDown
                            className={`${
                              openQuestion === item.question ? "transform rotate-180" : ""
                            } w-5 h-5 text-indigo-500`}
                          />
                        </DisclosureButton>
                        {openQuestion === item.question && (
                          <DisclosurePanel className="text-left px-4 pt-4 pb-2 text-white dark:text-gray-300">
                            {item.answer}
                          </DisclosurePanel>
                        )}
                      </>
                    )}
                  </Disclosure>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-base font-normal text-white">
            Have a different question?{" "}
            <a href="mailto:support@mygadgetpadi.com" className="underline text-white">Send us a mail</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faq;