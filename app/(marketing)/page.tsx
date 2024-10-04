// "use client";
import React from "react";
import TestimonialSection from "@/components/landing-page/Testimonial/TestimonialSection";
import Card from "@/components/landing-page/Card";
import BigCard from "@/components/landing-page/BigCard"
import ScrollUp from "@/components/landing-page/Common/ScrollUp";
import Hero from "@/components/landing-page/Hero";
import LongCard from "@/components/landing-page/Brands"
import FAQ from "@/components/landing-page/Faq"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyGadgetPadi | One stop for device protection",
  description: "At My Gadget Padi, we’re all about keeping you connected. Get the latest devices, fast repairs, and affordable insurance in one place. No hassle, No worries – just tech solutions made easy.",
  icons: {
    icon: '/logo/favicon.ico'
  },
  openGraph: {
    title: "MyGadgetPadi | One stop for device protection",
    description: "At My Gadget Padi, we’re all about keeping you connected. Get the latest devices, fast repairs, and affordable insurance in one place. No hassle, No worries – just tech solutions made easy.",
    images: [
      {
        url: 'https://mygadgetpadi.vercel.app/images/home.png',
        alt: 'MyGadgetPadi | One stop for device protection'
      }
    ],
    type: 'website'
  }
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Card/>
      <LongCard/>
      <BigCard/>
      <FAQ/>
      <TestimonialSection/>
    </>
  );
};