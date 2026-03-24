import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import quoteBg from "@/assets/quote-bg.jpg";
import { SplitWords } from "./ScrollAnimations";
import { LineReveal } from "./SectionReveal";

const QuoteSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${quoteBg})`,
          scale: imgScale,
          y: imgY,
        }}
      >
        <div className="absolute inset-0 bg-foreground/70" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <LineReveal delay={0.1}>
          <p className="text-primary text-xs uppercase tracking-[0.3em] font-display font-bold mb-6">
            Philosophy
          </p>
        </LineReveal>
        <h3 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight uppercase">
          <SplitWords
            text="Architecture is the thoughtful making of space"
            delay={0.1}
          />
        </h3>
      </div>
    </section>
  );
};

export default QuoteSection;
