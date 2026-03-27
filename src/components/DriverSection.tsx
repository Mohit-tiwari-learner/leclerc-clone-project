import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import architectImg from "@/assets/architect-portrait.jpg";
import {
  SplitText,
  SplitWords,
  AnimatedCounter,
  ImageReveal,
  RevealLine,
} from "./ScrollAnimations";
import { TiltReveal, TimelineStagger, TimelineItem, WipeReveal } from "./SectionReveal";
import BeforeAfterSlider from "./BeforeAfterSlider";
import TeamParallaxGrid from "./TeamParallaxGrid";

const stats = [
  { label: "Projects Completed", value: 240 },
  { label: "Design Awards", value: 38 },
  { label: "Team Members", value: 65 },
  { label: "Cities Worldwide", value: 12 },
];

const DriverSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section id="about" className="section-padding bg-background overflow-hidden" ref={sectionRef}>
      <motion.div style={{ y: bgY }} className="max-w-7xl mx-auto">
        <WipeReveal direction="left">
          <RevealLine className="mb-8 max-w-[120px]" />
        </WipeReveal>

        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="text-display text-xs text-primary tracking-[0.3em]"
          >
            About Us
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-8">
          <div>
            <TiltReveal>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
                <SplitText text="VISION." delay={0} />
                <br />
                <SplitText text="PRECISION." delay={0.15} />
                <br />
                <SplitText text="CRAFT." delay={0.3} />
              </h2>
            </TiltReveal>

            <div className="overflow-hidden">
              <SplitWords
                text="Founded in 2004, ARC Studio is an award-winning architecture firm specializing in residential, commercial, and cultural projects. We believe great architecture emerges from the dialogue between form, function, and the human experience."
                className="font-body text-muted-foreground text-base md:text-lg leading-relaxed mb-12"
                delay={0.1}
              />
            </div>

            <TimelineStagger className="grid grid-cols-2 gap-8" stagger={0.15}>
              {stats.map((stat) => (
                <TimelineItem key={stat.label}>
                  <div className="border-t-2 border-foreground pt-4">
                    <p className="font-display font-black text-4xl md:text-5xl text-foreground">
                      <AnimatedCounter value={stat.value} delay={0.3} />
                    </p>
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1 font-display font-semibold">
                      {stat.label}
                    </p>
                  </div>
                </TimelineItem>
              ))}
            </TimelineStagger>
          </div>

          <WipeReveal direction="right" delay={0.3}>
            <div className="relative">
              <ImageReveal
                src={architectImg}
                alt="Lead architect at construction site"
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
                  Founded — <span className="text-primary">2004</span>
                </p>
                <p className="text-primary-foreground/70 font-display text-xs uppercase tracking-[0.2em] mt-1">
                  Headquarters — New York City
                </p>
              </motion.div>
            </div>
          </WipeReveal>
        </div>
      </motion.div>
    </section>
  );
};

export default DriverSection;
