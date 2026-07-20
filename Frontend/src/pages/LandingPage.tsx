import { Hero } from "@/components/landing/Hero";
import { BentoEcosystem } from "@/components/landing/BentoEcosystem";
import { Experience } from "@/components/landing/Experience";
import { LivingMetrics } from "@/components/landing/LivingMetrics";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <BentoEcosystem />
      <Experience />
      <LivingMetrics />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
