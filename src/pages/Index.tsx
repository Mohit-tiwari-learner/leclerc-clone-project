import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DriverSection from "@/components/DriverSection";
import QuoteSection from "@/components/QuoteSection";
import CareerSection from "@/components/CareerSection";
import GallerySection from "@/components/GallerySection";
import LifeAsDriverSection from "@/components/LifeAsDriverSection";
import QuoteSection2 from "@/components/QuoteSection2";
import FooterSection from "@/components/FooterSection";
import Preloader from "@/components/Preloader";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loading]);

  return (
    <>
      <Preloader onComplete={handleComplete} />
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="overflow-x-hidden"
          >
            <Navbar />
            <HeroSection />
            <DriverSection />
            <QuoteSection />
            <CareerSection />
            <GallerySection />
            <LifeAsDriverSection />
            <QuoteSection2 />
            <FooterSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
