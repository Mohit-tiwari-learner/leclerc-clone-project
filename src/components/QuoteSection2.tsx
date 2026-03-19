import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { SplitWords } from "./ScrollAnimations";

const QuoteSection2 = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);

  return (
    <motion.section
      ref={ref}
      style={{ scale: bgScale }}
      className="section-padding bg-primary overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ width: "0%" }}
          animate={inView ? { width: "60px" } : {}}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          className="h-[2px] bg-primary-foreground/50 mx-auto mb-8"
        />
        <h3 className="font-display font-extrabold text-3xl md:text-5xl text-primary-foreground uppercase leading-tight">
          <SplitWords text="It's more about hard work than talent" delay={0.05} />
        </h3>
        <motion.div
          initial={{ width: "0%" }}
          animate={inView ? { width: "60px" } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
          className="h-[2px] bg-primary-foreground/50 mx-auto mt-8"
        />
      </div>
    </motion.section>
  );
};

export default QuoteSection2;
