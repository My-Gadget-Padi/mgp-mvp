import { Landing } from "@/types/blog";

const landingData: Landing[] = [
  {
    id: 1,
    title: "Gadget Protection",
    paragraph:
      "Protect your gadget from theft, damage and unplanned situations. We offer long-term protection and peace of mind in case of accidents.",
    image: "/images/card/protect.jpg", 
    tag: false,

  },
  {
    id: 2,
    title: "Gadget Repair",
    paragraph:
      "We have professional technicians available to offer technical support, repairs and maintenance to keep your gadgets running smoothly.",
    image: "/images/card/repair.jpg",
  
    tag: true,
  },
  {
    id: 3,
    title: "Gadget Trade-In",
    paragraph:
      "Swap your old gadgets for the latest models available.",
    image: "/images/card/trade-in.jpg",
    tag: true,
  },
  {
    id: 4,
    title: "Gadget Purchase",
    paragraph:
      "Select from verified top quality new and refurbished smart gadgets designed to meet your needs.",
    image: "/images/card/buy.jpg",
    tag: true,

  },
];
export default landingData;
