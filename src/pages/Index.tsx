import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DriverSection from "@/components/DriverSection";
import QuoteSection from "@/components/QuoteSection";
import CareerSection from "@/components/CareerSection";
import GallerySection from "@/components/GallerySection";
import LifeAsDriverSection from "@/components/LifeAsDriverSection";
import QuoteSection2 from "@/components/QuoteSection2";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <DriverSection />
      <QuoteSection />
      <CareerSection />
      <GallerySection />
      <LifeAsDriverSection />
      <QuoteSection2 />
      <FooterSection />
    </div>
  );
};

export default Index;
