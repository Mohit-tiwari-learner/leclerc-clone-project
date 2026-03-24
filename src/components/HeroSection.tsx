import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import heroSky from "@/assets/hero-sky.jpg";
import heroBuilding from "@/assets/hero-building.png";
import { ScrollProgress } from "./ScrollAnimations";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const buildingY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const buildingScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const smoothBuildingY = useSpring(buildingY, { stiffness: 80, damping: 25 });

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      <ScrollProgress />

      {/* Sky background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
      >
        <img
          src={heroSky}
          alt=""
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* Centered text content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-0 pb-[15vh]"
      >
        <div className="overflow-hidden">
          <motion.h1
            className="font-display font-black text-[clamp(4rem,13vw,11rem)] leading-[0.9] tracking-tighter text-foreground/90"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            Design
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-display font-black text-[clamp(4rem,13vw,11rem)] leading-[0.9] tracking-tighter text-foreground/90"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.2,
              delay: 0.45,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            That Endures
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-base md:text-lg text-muted-foreground font-body max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        >
          <span className="font-semibold text-foreground">Award-winning studio.</span>{" "}
          Visionary architecture.{" "}
          <span className="text-muted-foreground">
            Shaping spaces that inspire.
          </span>
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#about"
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-foreground text-primary-foreground font-display font-bold text-sm tracking-wider hover:bg-foreground/90 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          View Projects
          <ArrowRight size={16} />
        </motion.a>
      </motion.div>

      {/* Building image — layered on top, rising from bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[1000px] z-20 pointer-events-none"
        style={{ y: smoothBuildingY, scale: buildingScale }}
        initial={{ y: "40%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: 1.6,
          delay: 0.6,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <img
          src={heroBuilding}
          alt="Modern Architecture"
          className="w-full h-auto"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
