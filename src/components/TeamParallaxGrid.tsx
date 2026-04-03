import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import team6 from "@/assets/team-6.jpg";

const teamMembers = [
  { src: team1, name: "Marcus Webb", role: "Founding Partner", specialty: "Conceptual Design", speed: -40, featured: true },
  { src: team2, name: "Elena Torres", role: "Design Director", specialty: "Sustainable Architecture", speed: 30 },
  { src: team3, name: "James Chen", role: "Lead Designer", specialty: "Urban Planning", speed: -20 },
  { src: team4, name: "Sarah Miller", role: "Project Director", specialty: "Commercial Spaces", speed: 45, featured: true },
  { src: team5, name: "David Laurent", role: "Senior Architect", specialty: "Structural Innovation", speed: -35 },
  { src: team6, name: "Mei Lin", role: "Interior Design Lead", specialty: "Material Research", speed: 25 },
];

/* ── Magnetic hover hook ── */
const useMagnetic = (strength = 0.3) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [x, y, strength]);

  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return { ref, x, y, handleMouse, reset };
};

/* ── Horizontal scroll counter ── */
const ScrollCounter = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const count = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const smoothCount = useSpring(count, { stiffness: 40, damping: 20 });
  const [display, setDisplay] = useState("00");

  useEffect(() => {
    const unsub = smoothCount.on("change", (v) => {
      setDisplay(String(Math.round(v)).padStart(2, "0"));
    });
    return unsub;
  }, [smoothCount]);

  return (
    <div ref={ref} className="hidden md:flex items-center gap-3">
      <span className="font-display text-7xl font-black text-primary/20 leading-none tabular-nums">
        {display}
      </span>
      <div className="flex flex-col">
        <span className="font-display text-[9px] tracking-[0.4em] uppercase text-muted-foreground">Total</span>
        <span className="font-display text-[9px] tracking-[0.4em] uppercase text-muted-foreground">Members</span>
      </div>
    </div>
  );
};

/* ── Team Card ── */
const TeamCard = ({
  member,
  index,
  layout = "default",
}: {
  member: (typeof teamMembers)[0];
  index: number;
  layout?: "featured" | "default";
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, member.speed]);
  const smoothY = useSpring(parallaxY, { stiffness: 60, damping: 20 });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);

  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);

  const magnetic = useMagnetic(0.15);
  const smoothMX = useSpring(magnetic.x, { stiffness: 150, damping: 15 });
  const smoothMY = useSpring(magnetic.y, { stiffness: 150, damping: 15 });

  const isFeatured = layout === "featured";
  const imgHeight = isFeatured ? "h-[380px] md:h-[520px]" : "h-[280px] md:h-[380px]";

  return (
    <div ref={ref}>
      <motion.div
        ref={(el) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          (magnetic.ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        style={{ y: smoothY, x: smoothMX, rotateY: smoothMX, rotateX: smoothMY }}
        initial={{ opacity: 0, y: 120, clipPath: "inset(20% 0 20% 0)" }}
        animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0% 0)" } : {}}
        transition={{ duration: 1.4, delay: index * 0.12, ease: [0.76, 0, 0.24, 1] }}
        className="group relative cursor-pointer will-change-transform"
        style-perspective="1200px"
        onMouseMove={magnetic.handleMouse}
        onMouseLeave={() => { setIsHovered(false); magnetic.reset(); }}
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <motion.div style={{ scale: imgScale }} className="origin-center">
            <motion.img
              src={member.src}
              alt={member.name}
              loading="lazy"
              width={640}
              height={800}
              animate={isHovered ? { scale: 1.08, filter: "saturate(1.2) brightness(0.85)" } : { scale: 1, filter: "saturate(0.9) brightness(1)" }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className={`w-full ${imgHeight} object-cover object-top`}
            />
          </motion.div>

          {/* Noise grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
          />

          {/* Persistent gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent pointer-events-none" />

          {/* Cinematic letterbox bars on hover */}
          <motion.div
            initial={false}
            animate={isHovered ? { height: "12%" } : { height: "0%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 bg-foreground/90 pointer-events-none z-10"
          />
          <motion.div
            initial={false}
            animate={isHovered ? { height: "12%" } : { height: "0%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 bg-foreground/90 pointer-events-none z-10"
          />

          {/* Large ghost index */}
          <motion.div
            initial={false}
            animate={isHovered ? { opacity: 0.08, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none"
          >
            <span className="font-display text-[120px] md:text-[180px] font-black text-primary-foreground leading-none select-none">
              0{index + 1}
            </span>
          </motion.div>

          {/* Hover content: specialty + line */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-20">
            <motion.div
              initial={false}
              animate={isHovered ? { y: -12, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.div
                initial={false}
                animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="w-full h-[1px] bg-primary/40 origin-left mb-4"
              />
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-display text-[9px] tracking-[0.5em] uppercase text-primary font-bold">
                    Specialty
                  </span>
                  <p className="font-body text-[11px] md:text-xs text-primary-foreground/80 mt-1.5 leading-relaxed">
                    {member.specialty}
                  </p>
                </div>
                <motion.div
                  initial={false}
                  animate={isHovered ? { rotate: -45, scale: 1 } : { rotate: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="w-8 h-8 border border-primary/50 flex items-center justify-center"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H4M11 1V8" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Corner brackets on hover */}
          <motion.div
            initial={false}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute inset-3 z-10 pointer-events-none"
          >
            <div className="absolute top-0 left-0 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-primary/50" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-[1.5px] border-r-[1.5px] border-primary/50" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[1.5px] border-l-[1.5px] border-primary/50" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-primary/50" />
          </motion.div>
        </div>

        {/* Name & role below */}
        <motion.div
          initial={{ opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" }}
          animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mt-5 relative"
        >
          <div className="flex items-start justify-between">
            <div>
              <motion.p
                animate={isHovered ? { x: 8 } : { x: 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="font-display text-sm md:text-base font-bold text-foreground tracking-wide leading-tight"
              >
                {member.name}
              </motion.p>
              <div className="flex items-center gap-2 mt-1.5">
                <motion.div
                  animate={isHovered ? { width: 20 } : { width: 12 }}
                  transition={{ duration: 0.4 }}
                  className="h-[1px] bg-primary"
                />
                <p className="font-display text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                  {member.role}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ── Section Header with scroll-linked horizontal line ── */
const SectionHeader = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
  const titleX = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div ref={containerRef}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="mb-20"
      >
        {/* Top line + label */}
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="w-12 h-[2px] bg-primary origin-left"
          />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-[10px] tracking-[0.5em] uppercase text-muted-foreground font-semibold"
          >
            Our People
          </motion.span>
        </div>

        {/* Main title */}
        <div className="flex items-end justify-between gap-8">
          <motion.div style={{ x: titleX }}>
            <div className="overflow-hidden">
              <motion.h3
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-black text-5xl md:text-6xl lg:text-[80px] text-foreground uppercase leading-[0.85] tracking-tight"
              >
                The Creative
              </motion.h3>
            </div>
            <div className="overflow-hidden">
              <motion.h3
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 1, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-black text-5xl md:text-6xl lg:text-[80px] text-primary uppercase leading-[0.85] tracking-tight"
              >
                Minds
              </motion.h3>
            </div>
          </motion.div>

          <div className="hidden md:flex flex-col items-end gap-6">
            <ScrollCounter />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="max-w-[280px] font-body text-xs text-muted-foreground leading-relaxed text-right"
            >
              An interdisciplinary team of architects, designers, and visionaries shaping the built environment.
            </motion.p>
          </div>
        </div>

        {/* Scroll-linked divider */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-[1px] bg-border mt-10"
        />
      </motion.div>
    </div>
  );
};

/* ── Main Grid ── */
const TeamParallaxGrid = () => {
  return (
    <div className="mt-32" style={{ perspective: "1200px" }}>
      <SectionHeader />

      {/* Asymmetric masonry */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-5">
        <div className="col-span-1 md:col-span-5">
          <TeamCard member={teamMembers[0]} index={0} layout="featured" />
        </div>
        <div className="col-span-1 md:col-span-4 md:mt-24">
          <TeamCard member={teamMembers[1]} index={1} />
        </div>
        <div className="col-span-1 md:col-span-3 md:mt-10">
          <TeamCard member={teamMembers[2]} index={2} />
        </div>
        <div className="col-span-1 md:col-span-3 md:-mt-16">
          <TeamCard member={teamMembers[3]} index={3} />
        </div>
        <div className="col-span-1 md:col-span-5 md:-mt-32">
          <TeamCard member={teamMembers[4]} index={4} layout="featured" />
        </div>
        <div className="col-span-2 md:col-span-4 md:-mt-8">
          <TeamCard member={teamMembers[5]} index={5} />
        </div>
      </div>
    </div>
  );
};

export default TeamParallaxGrid;
