import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-racing.jpg";
import { SplitText, MagneticWrap, ScrollProgress } from "./ScrollAnimations";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const smoothScale = useSpring(imgScale, { stiffness: 80, damping: 25 });

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <ScrollProgress />

      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImg})`,
          scale: smoothScale,
          y: imgY,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-foreground"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <MagneticWrap strength={0.15}>
          <h1 className="font-display font-black text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter text-primary-foreground">
            <SplitText
              text="CL"
              charClassName="text-primary-foreground"
              delay={0.3}
            />
            <SplitText
              text="16"
              charClassName="text-primary"
              delay={0.5}
            />
          </h1>
        </MagneticWrap>

        <div className="overflow-hidden mt-4">
          <motion.p
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.8,
              delay: 0.9,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="text-display text-sm md:text-base text-primary-foreground/80 tracking-[0.3em]"
          >
            Beyond Speed
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-primary-foreground/60 text-xs tracking-[0.2em] uppercase font-display">
            Scroll to explore
          </span>
          <motion.div
            className="w-px h-12 bg-primary-foreground/30"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
