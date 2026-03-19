import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import trainingImg from "@/assets/training.jpg";
import preparationImg from "@/assets/preparation.jpg";
import racingImg from "@/assets/racing.jpg";
import offseasonImg from "@/assets/offseason.jpg";

const cards = [
  {
    title: "Training",
    desc: "Body and mind under extreme stress — G-force, heat, and mental strain demand peak physical condition.",
    img: trainingImg,
  },
  {
    title: "Preparation",
    desc: "In F1, every detail counts. Meticulous preparation of every aspect for peak race performance.",
    img: preparationImg,
  },
  {
    title: "Racing",
    desc: "Strategies defined, pace set, adrenaline rising — then the lights go out.",
    img: racingImg,
  },
  {
    title: "Off-Season",
    desc: "Intense training camps in the mountains, balanced with time for family and recovery.",
    img: offseasonImg,
  },
];

const LifeAsDriverSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="life" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-display text-xs text-primary mb-4 tracking-[0.3em]"
        >
          Driving
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl md:text-6xl text-foreground mb-6 uppercase"
        >
          Life as a Driver
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-muted-foreground text-base md:text-lg max-w-2xl mb-16"
        >
          Great talent alone is not enough. It takes years of preparation, both physical 
          and mental, and constant attention to every detail before, during and after every race.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="relative group overflow-hidden cursor-pointer"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="font-display font-bold text-xl text-primary-foreground uppercase tracking-wider mb-2">
                  {card.title}
                </h3>
                <p className="font-body text-primary-foreground/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeAsDriverSection;
