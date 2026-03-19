import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import quoteBg from "@/assets/quote-bg.jpg";

const QuoteSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${quoteBg})` }}
      >
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <p className="text-primary text-xs uppercase tracking-[0.3em] font-display font-bold mb-6">
          Philosophy
        </p>
        <h3 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight uppercase">
          It's the mind that makes the difference
        </h3>
      </motion.div>
    </section>
  );
};

export default QuoteSection;
