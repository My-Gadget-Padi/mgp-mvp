import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { PiTelegramLogo } from "react-icons/pi";

export default function IconFooter() {
  return (
    <div className="text-primary py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="https://www.youtube.com/@mygadgetpadi" className="text-primary hover:text-[#07796B]" prefetch={false}>
            <FiYoutube className="h-6 w-6" />
            <span className="sr-only">Youtube</span>
          </Link>
          <Link href="https://wa.me/+1234567890" className="text-primary hover:text-[#07796B]" prefetch={false}>
            <FaWhatsapp className="h-6 w-6" />
            <span className="sr-only">WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
};