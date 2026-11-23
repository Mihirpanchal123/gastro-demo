import Hero from "@/components/Hero";
import Services from "@/components/Services";
import GutExplorer from "@/components/GutExplorer";
import SymptomCheck from "@/components/SymptomCheck";
import Doctor from "@/components/Doctor";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Faq from "@/components/Faq";
import { Pricing, VideoStrip, LatestUpdates, BrochureCTA } from "@/components/HomeExtras";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <GutExplorer />
      <SymptomCheck />
      <Doctor />
      <Journey />
      <Pricing />
      <VideoStrip />
      <Testimonials />
      <BrochureCTA />
      <LatestUpdates />
      <Booking />
      <Faq />
    </>
  );
}
