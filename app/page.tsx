// Homepage - Updated with split hero layout and transparent pricing section
// Changes: Hero redesigned with photo left/pricing card right, added PricingSection
// Updated copy throughout for brand alignment (USCIS-ready, human translators, transparency)

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import PricingSection from "./components/PricingSection";
import WhyChooseUs from "./components/WhyChooseUs";
import Services from "./components/Services";
import PopularServices from "./components/PopularServices";
import FindLocalTranslator from "./components/FindLocalTranslator";
import WhoWeServe from "./components/WhoWeServe";
import QualitySecurity from "./components/QualitySecurity";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <PricingSection />
        <WhyChooseUs />
        <PopularServices />
        <Services />
        <FindLocalTranslator />
        <WhoWeServe />
        <QualitySecurity />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  );
}
