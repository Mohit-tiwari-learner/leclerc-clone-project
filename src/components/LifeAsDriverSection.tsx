import { motion, useMotionValue, useSpring, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Ruler, Hammer, Palette, Leaf } from "lucide-react";
import trainingImg from "@/assets/training.jpg";
import preparationImg from "@/assets/preparation.jpg";
import racingImg from "@/assets/racing.jpg";
import offseasonImg from "@/assets/offseason.jpg";
import { SplitText, SplitWords, RevealLine, AnimatedCounter } from "./ScrollAnimations";
import { WipeReveal } from "./SectionReveal";

const cards = [
  {
    title: "Concept Design",
    desc: "Every project begins with a vision — sketches, models, and bold ideas that challenge conventions.",
    img: trainingImg,
    icon: Ruler,
    stat: 120,
    statLabel: "Projects",
  },
  {
    title: "Construction",
    desc: "Precise execution on-site, managing materials, timelines, and craftsmanship at every stage.",
    img: preparationImg,
    icon: Hammer,
    stat: 85,
    statLabel: "Built",
  },
  {
    title: "Interior Design",
    desc: "Curating spaces from within — light, texture, and material come together for extraordinary living.",
    img: racingImg,
    icon: Palette,
    stat: 38,
    statLabel: "Awards",
  },
  {
    title: "Sustainable Design",
    desc: "Green roofs, passive cooling, and biophilic design — architecture that respects the planet.",
    img: offseasonImg,
    icon: Leaf,
    stat: 200,
    statLabel: "Trees Saved",
  },
];

// Water ripple SVG filter — only rendered once
const WaterFilter = () => (
  <svg className="absolute w-0 h-0">
    <defs>
      <filter id="water-ripple">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.015 0.015"
          numOctaves="3"
          seed="2"
          result="turbulence"
        >
          <animate
            attributeName="baseFrequency"
            values="0.015 0.015;0.025 0.02;0.015 0.015"
            dur="4s"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="12"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

const GlassCard = ({ card, index }: { card: typeof cards[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);
  const [canTilt, setCanTilt] = useState(true);

  // Detect touch devices
  useEffect(() => {
    setCanTilt(window.matchMedia("(hover: hover)").matches);
  }, []);

  // Mouse tracking for tilt + light
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 150, damping: 20 });

  const lightX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), { stiffness: 200, damping: 30 });
  const lightY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), { stiffness: 200, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || !canTilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }, [canTilt, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const Icon = card.icon;

  // Scroll parallax for image
  const { scrollYProgress } = useScroll({
    target: inViewRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={inViewRef}
      initial={{
        opacity: 0,
        y: 80,
        rotateY: -90,
        filter: "blur(12px)",
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
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: canTilt ? rotateX : 0,
          rotateY: canTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        whileHover={{ scale: 1.04, z: 30 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative group cursor-pointer rounded-2xl overflow-hidden h-[420px] md:h-[480px]"
      >
        {/* Glassmorphism border glow */}
        <div
          className="absolute -inset-[1px] rounded-2xl z-0 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.4), transparent 40%, hsl(var(--primary) / 0.2) 70%, transparent)",
            opacity: isHovered ? 1 : 0.3,
          }}
        />

        {/* Glass card body */}
        <div
          className="absolute inset-[1px] rounded-2xl overflow-hidden z-10"
          style={{
            background: "hsl(var(--foreground) / 0.85)",
            backdropFilter: "blur(20px)",
            boxShadow: isHovered
              ? "inset 0 0 40px hsl(var(--primary) / 0.08), 0 25px 60px -15px hsl(var(--foreground) / 0.5)"
              : "inset 0 0 30px hsl(var(--primary-foreground) / 0.03), 0 10px 30px -10px hsl(var(--foreground) / 0.3)",
          }}
        >
          {/* Background image with water ripple on hover */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              style={{
                y: imgY,
                filter: isHovered ? "url(#water-ripple)" : "none",
              }}
              className="absolute inset-0 w-full h-[120%] -top-[10%] transition-[filter] duration-700"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}
              />
            </motion.div>
            {/* Dark overlay for readability */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: "linear-gradient(to top, hsl(var(--foreground) / 0.95) 10%, hsl(var(--foreground) / 0.5) 50%, hsl(var(--foreground) / 0.2) 100%)",
              }}
            />
          </div>

          {/* Dynamic light reflection */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, hsl(var(--primary-foreground) / 0.12) 0%, transparent 60%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Content */}
          <div className="relative z-30 h-full flex flex-col justify-between p-6 md:p-8">
            {/* Top: Icon + Stat */}
            <div className="flex items-start justify-between">
              {/* Floating icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="p-3 rounded-xl transition-all duration-500"
                style={{
                  background: isHovered
                    ? "hsl(var(--primary) / 0.2)"
                    : "hsl(var(--primary-foreground) / 0.08)",
                  boxShadow: isHovered
                    ? "0 0 24px hsl(var(--primary) / 0.3)"
                    : "none",
                }}
              >
                <Icon
                  size={28}
                  className="transition-colors duration-500"
                  style={{
                    color: isHovered ? "hsl(var(--primary))" : "hsl(var(--primary-foreground) / 0.6)",
                    filter: isHovered ? "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))" : "none",
                  }}
                />
              </motion.div>

              {/* Stat counter */}
              <div className="text-right">
                <span className="font-display font-extrabold text-2xl md:text-3xl" style={{ color: "hsl(var(--primary-foreground))" }}>
                  <AnimatedCounter value={card.stat} delay={0.3 + index * 0.15} />
                  <span className="text-lg">+</span>
                </span>
                <p className="font-body text-xs tracking-wider uppercase" style={{ color: "hsl(var(--primary-foreground) / 0.5)" }}>
                  {card.statLabel}
                </p>
              </div>
            </div>

            {/* Bottom: Title + Description */}
            <div>
              <motion.h3
                className="font-display font-bold text-xl md:text-2xl uppercase tracking-wider mb-2"
                style={{ color: "hsl(var(--primary-foreground))" }}
                animate={{ y: isHovered ? -6 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              >
                {card.title}
              </motion.h3>

              <motion.p
                className="font-body text-sm leading-relaxed"
                style={{ color: "hsl(var(--primary-foreground) / 0.6)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 16 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              >
                {card.desc}
              </motion.p>

              {/* Accent line */}
              <motion.div
                className="h-[2px] mt-4 origin-left"
                style={{ background: "hsl(var(--primary))" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Ambient floating orb
const AmbientOrb = ({ className, delay = 0, style }: { className: string; delay?: number; style?: React.CSSProperties }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className}`}
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.2, 0.9, 1],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const LifeAsDriverSection = () => {
  return (
    <section id="services" className="relative section-padding overflow-hidden" style={{ background: "hsl(var(--foreground))" }}>
      {/* Ambient background orbs */}
      <AmbientOrb
        className="w-[400px] h-[400px] -top-40 -left-40 opacity-20 blur-[100px]"
        style={{ background: "hsl(var(--primary) / 0.3)" } as any}
      />
      <AmbientOrb
        className="w-[300px] h-[300px] top-1/2 -right-20 opacity-15 blur-[80px]"
        delay={3}
        style={{ background: "hsl(210 80% 50% / 0.15)" } as any}
      />
      <AmbientOrb
        className="w-[250px] h-[250px] bottom-20 left-1/3 opacity-10 blur-[90px]"
        delay={6}
        style={{ background: "hsl(var(--primary) / 0.2)" } as any}
      />

      {/* Water ripple filter (shared) */}
      <WaterFilter />

      <div className="relative z-10 max-w-7xl mx-auto">
        <WipeReveal direction="left">
          <RevealLine className="mb-8 max-w-[100px]" />
        </WipeReveal>

        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="text-display text-xs tracking-[0.3em]"
            style={{ color: "hsl(var(--primary))" }}
          >
            Services
          </motion.p>
        </div>

        <h2 className="font-display font-extrabold text-4xl md:text-6xl mb-6 uppercase" style={{ color: "hsl(var(--primary-foreground))" }}>
          <SplitText text="What We Do" delay={0.05} />
        </h2>

        <SplitWords
          text="From initial concept to final construction, we guide every project through a rigorous creative process that balances beauty, functionality, and sustainability."
          className="font-body text-base md:text-lg max-w-2xl mb-16"
          wordClassName="text-[hsl(var(--primary-foreground)/0.5)]"
          delay={0.2}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card, i) => (
            <GlassCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeAsDriverSection;
