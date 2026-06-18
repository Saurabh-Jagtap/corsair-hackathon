"use client";

import { AIWorkflow } from "@/components/landing/AIWorkFlow";
import { CTA } from "@/components/landing/CTA";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Nav } from "@/components/landing/Nav";
import { ProductPreview } from "@/components/landing/ProductPreview";

export default function Home() {
  return (
    <div className="bg-[#F4F6F7] text-[#1A2B35] font-sans">
      <Nav />
      <Hero />
      <ProductPreview />
      <HowItWorks />
      <AIWorkflow />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
