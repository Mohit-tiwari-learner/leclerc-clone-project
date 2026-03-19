import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import {
  RevealLine,
  SplitText,
  StaggerContainer,
  StaggerItem,
} from "./ScrollAnimations";

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

const TimelineItem = ({
  item,
  index,
}: {
  item: { year: string; desc: string };
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className={`relative flex items-start mb-12 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div
        className={`pl-8 md:pl-0 md:w-1/2 ${
          index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
        }`}
      >
        <span className="font-display font-black text-3xl text-primary">
          {item.year}
        </span>
        <p className="font-body text-muted-foreground mt-2 text-sm md:text-base">
          {item.desc}
        </p>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 300 }}
        className="absolute left-0 md:left-1/2 top-2 w-3 h-3 bg-primary -translate-x-[6px] md:-translate-x-[6px]"
      />
    </motion.div>
  );
};

const CareerSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const lineHeight = useSpring(
    useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]),
    { stiffness: 80, damping: 25 }
  );

  return (
    <section id="career" className="section-padding bg-secondary" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <RevealLine className="mb-8 max-w-[80px]" />

        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-display text-xs text-primary tracking-[0.3em]"
          >
            Career
          </motion.p>
        </div>

        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mb-16 uppercase">
          <SplitText text="Beginnings" delay={0.1} />
        </h2>

        <div className="relative">
          {/* Animated growing line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-border"
            />
          </div>

          {timeline.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
