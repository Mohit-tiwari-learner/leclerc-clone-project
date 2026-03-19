import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import driverImg from "@/assets/driver-portrait.jpg";

const stats = [
  { label: "Grand Prix Raced", value: "141" },
  { label: "Podiums", value: "38" },
  { label: "Victories", value: "7" },
  { label: "Pole Positions", value: "25" },
];

const DriverSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="driver" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-display text-xs text-primary mb-4 tracking-[0.3em]"
        >
          The Driver
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8"
            >
              TALENT.<br />
              INTELLIGENCE.<br />
              HARD WORK.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-muted-foreground text-base md:text-lg leading-relaxed mb-12"
            >
              Born in Monte Carlo on 16 October 1997, Charles is one of the strongest 
              and most promising drivers in modern Formula 1. From karting at three years 
              old to becoming an official Ferrari driver, his journey is defined by 
              relentless determination and extraordinary speed.
            </motion.p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="border-t-2 border-foreground pt-4"
                >
                  <p className="font-display font-black text-4xl md:text-5xl text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1 font-display font-semibold">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden group"
          >
            <img
              src={driverImg}
              alt="Racing driver in pit lane"
              className="w-full h-[500px] lg:h-[700px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent">
              <p className="text-primary-foreground font-display text-xs uppercase tracking-[0.2em]">
                Date of Birth — <span className="text-primary">16th Oct 1997</span>
              </p>
              <p className="text-primary-foreground/70 font-display text-xs uppercase tracking-[0.2em] mt-1">
                Hometown — Principality of Monaco
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DriverSection;
