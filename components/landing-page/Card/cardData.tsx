import { Landing } from "@/types/blog";

const landingData: Landing[] = [
  {
    id: 1,
    title: "Gadget Protection",
    paragraph:
      "We offer extended warranties/coverage for your gadgets, ensuring long-term protection and peace of mind in case of accidents.",
    image: "/images/card/protect.jpg", 
    tag: false,

  },
  {
    id: 2,
    title: "Gadget Repair",
    paragraph:
      "We have a dedicated customer service offering technical support, repairs, and maintenance to keep your gadgets running smoothly.",
    image: "/images/card/repair.jpg",
  
    tag: true,
  },
  {
    id: 3,
    title: "Gadget Trade-In",
    paragraph:
      "You can trade-in your old gadgets for the latest gadgets available.",
    image: "/images/card/trade-in.jpg",
    tag: true,
  },
  {
    id: 4,
    title: "Gadget Purchase",
    paragraph:
      "Select from a diverse selection of top-quality, new, and refurbished smart gadgets tailored to meet your needs.",
    image: "/images/card/buy.jpg",
    tag: true,

  },
];
export default landingData;
