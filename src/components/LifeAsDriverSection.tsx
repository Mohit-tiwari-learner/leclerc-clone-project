import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import trainingImg from "@/assets/training.jpg";
import preparationImg from "@/assets/preparation.jpg";
import racingImg from "@/assets/racing.jpg";
import offseasonImg from "@/assets/offseason.jpg";
import { SplitText, SplitWords, RevealLine } from "./ScrollAnimations";
import { TiltReveal, WipeReveal } from "./SectionReveal";

const cards = [
  {
    title: "Concept Design",
    desc: "Every project begins with a vision — sketches, models, and bold ideas that challenge conventions.",
    img: trainingImg,
  },
  {
    title: "Construction",
    desc: "Precise execution on-site, managing materials, timelines, and craftsmanship at every stage.",
    img: preparationImg,
  },
  {
    title: "Interior Design",
    desc: "Curating spaces from within — light, texture, and material come together for extraordinary living.",
    img: racingImg,
  },
  {
    title: "Sustainable Design",
    desc: "Green roofs, passive cooling, and biophilic design — architecture that respects the planet.",
    img: offseasonImg,
  },
];

const LifeCard = ({ card, index }: { card: typeof cards[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 100,
        rotateY: -8,
        filter: "blur(8px)",
      }}
      animate={
        inView
          ? { opacity: 1, y: 0, rotateY: 0, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="relative group overflow-hidden cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <div ref={cardRef} className="overflow-hidden h-[400px]">
        <motion.img
          src={card.img}
          alt={card.title}
          style={{ y: imgY }}
          className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent flex flex-col justify-end p-6">
        <motion.h3
          initial={{ y: 10 }}
          whileHover={{ y: -5 }}
          className="font-display font-bold text-xl text-primary-foreground uppercase tracking-wider mb-2"
        >
          {card.title}
        </motion.h3>
        <p className="font-body text-primary-foreground/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {card.desc}
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          className="h-[2px] bg-primary mt-4 origin-left"
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

const LifeAsDriverSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <WipeReveal direction="left">
          <RevealLine className="mb-8 max-w-[100px]" />
        </WipeReveal>

        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="text-display text-xs text-primary tracking-[0.3em]"
          >
            Services
          </motion.p>
        </div>

        <TiltReveal>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-foreground mb-6 uppercase">
            <SplitText text="What We Do" delay={0.05} />
          </h2>
        </TiltReveal>

        <SplitWords
          text="From initial concept to final construction, we guide every project through a rigorous creative process that balances beauty, functionality, and sustainability."
          className="font-body text-muted-foreground text-base md:text-lg max-w-2xl mb-16"
          delay={0.2}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {cards.map((card, i) => (
            <LifeCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeAsDriverSection;
