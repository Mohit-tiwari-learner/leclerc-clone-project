import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const QuoteSection2 = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display font-extrabold text-3xl md:text-5xl text-primary-foreground uppercase leading-tight"
        >
          It's more about hard work than talent
        </motion.h3>
      </div>
    </section>
  );
};

export default QuoteSection2;
