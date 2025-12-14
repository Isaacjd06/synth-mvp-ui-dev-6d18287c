import Navbar from "@/components/landing/Navbar";
import NewHeroSection from "@/components/landing/NewHeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import IntelligenceSection from "@/components/landing/IntelligenceSection";
import DifferentiationSection from "@/components/landing/DifferentiationSection";
import JourneySection from "@/components/landing/JourneySection";
import FeatureTourSection from "@/components/landing/FeatureTourSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTASection from "@/components/landing/FinalCTASection";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden relative" style={{ background: "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)" }}>
      {/* Fixed background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }} />
      </div>

      <Navbar />
      <NewHeroSection />
      <BenefitsSection />
      <IntelligenceSection />
      <DifferentiationSection />
      <JourneySection />
      <FeatureTourSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
};

export default Index;
