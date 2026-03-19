import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  { year: "2009", desc: "Youngest French Championship winner — Cadet category" },
  { year: "2010", desc: "Youngest winner of the Monaco Kart Cup KF3" },
  { year: "2011", desc: "Youngest winner of the CIK-FIA KF3 World Cup" },
  { year: "2012", desc: "CIK-FIA World Champion U18" },
  { year: "2016", desc: "GP3 Series Champion" },
  { year: "2017", desc: "FIA Formula 2 Championship Winner" },
  { year: "2018", desc: "Formula 1 debut with Alfa Romeo Sauber" },
  { year: "2019", desc: "Joined Scuderia Ferrari — Victory at Monza" },
  { year: "2024", desc: "Home victory at Monaco Grand Prix" },
];

const CareerSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="career" className="section-padding bg-secondary" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-display text-xs text-primary mb-4 tracking-[0.3em]"
        >
          Career
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl md:text-5xl text-foreground mb-16 uppercase"
        >
          Beginnings
        </motion.h2>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className={`relative flex items-start mb-10 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className={`pl-8 md:pl-0 md:w-1/2 ${
                i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
              }`}>
                <span className="font-display font-black text-3xl text-primary">
                  {item.year}
                </span>
                <p className="font-body text-muted-foreground mt-2 text-sm md:text-base">
                  {item.desc}
                </p>
              </div>

              <div className="absolute left-0 md:left-1/2 top-2 w-3 h-3 bg-primary -translate-x-[6px] md:-translate-x-[6px]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
