import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import driverImg from "@/assets/driver-portrait.jpg";
import {
  SplitText,
  SplitWords,
  AnimatedCounter,
  ImageReveal,
  RevealLine,
  StaggerContainer,
  StaggerItem,
} from "./ScrollAnimations";

const stats = [
  { label: "Grand Prix Raced", value: 141 },
  { label: "Podiums", value: 38 },
  { label: "Victories", value: 7 },
  { label: "Pole Positions", value: 25 },
];

const DriverSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section id="driver" className="section-padding bg-background overflow-hidden" ref={sectionRef}>
      <motion.div style={{ y: bgY }} className="max-w-7xl mx-auto">
        <RevealLine className="mb-8 max-w-[120px]" />

        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-display text-xs text-primary tracking-[0.3em]"
          >
            The Driver
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-8">
          <div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
              <SplitText text="TALENT." delay={0} />
              <br />
              <SplitText text="INTELLIGENCE." delay={0.15} />
              <br />
              <SplitText text="HARD WORK." delay={0.3} />
            </h2>

            <div className="overflow-hidden">
              <SplitWords
                text="Born in Monte Carlo on 16 October 1997, Charles is one of the strongest and most promising drivers in modern Formula 1. From karting at three years old to becoming an official Ferrari driver, his journey is defined by relentless determination and extraordinary speed."
                className="font-body text-muted-foreground text-base md:text-lg leading-relaxed mb-12"
                delay={0.1}
              />
            </div>

            <StaggerContainer className="grid grid-cols-2 gap-8" staggerDelay={0.12}>
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="border-t-2 border-foreground pt-4">
                    <p className="font-display font-black text-4xl md:text-5xl text-foreground">
                      <AnimatedCounter value={stat.value} delay={0.3} />
                    </p>
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1 font-display font-semibold">
                      {stat.label}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="relative">
            <ImageReveal
              src={driverImg}
              alt="Racing driver in pit lane"
              className="h-[500px] lg:h-[700px]"
              imgClassName="transition-transform duration-700 hover:scale-105"
              delay={0.2}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent"
            >
              <p className="text-primary-foreground font-display text-xs uppercase tracking-[0.2em]">
                Date of Birth — <span className="text-primary">16th Oct 1997</span>
              </p>
              <p className="text-primary-foreground/70 font-display text-xs uppercase tracking-[0.2em] mt-1">
                Hometown — Principality of Monaco
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DriverSection;
