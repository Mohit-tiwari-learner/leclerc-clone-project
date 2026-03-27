import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
const heroVideo = "/hero-video.mp4";
import heroBuilding from "@/assets/hero-building.png";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const buildingY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  // Walk-in zoom: building scales dramatically as you scroll
  const buildingScale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1.8, 3.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 0.3, 0.85]);
  const smoothBuildingY = useSpring(buildingY, { stiffness: 60, damping: 20 });
  const smoothBuildingScale = useSpring(buildingScale, { stiffness: 50, damping: 25 });
  // Vignette effect intensifies during walk-in
  const vignetteOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 0.7]);
  const smoothVignette = useSpring(vignetteOpacity, { stiffness: 60, damping: 25 });
  // Sky zooms subtly too
  const skyScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / innerWidth * 20);
    mouseY.set((clientY - innerHeight / 2) / innerHeight * 15);
  };

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  // Time ticker
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const interval = setInterval(tick, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll indicator bounce
  const scrollIndicatorY = useMotionValue(0);
  useAnimationFrame((t) => {
    scrollIndicatorY.set(Math.sin(t / 600) * 6);
  });

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-foreground"
      onMouseMove={handleMouseMove}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-[35] pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Sky background with mouse parallax */}
      <motion.div
        className="absolute inset-[-20px]"
        style={{ x: smoothMouseX, y: smoothMouseY, scale: skyScale }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Cinematic letterbox bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-foreground z-[31]"
        initial={{ height: "50vh" }}
        animate={{ height: 0 }}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-foreground z-[31]"
        initial={{ height: "50vh" }}
        animate={{ height: 0 }}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary-foreground/20 z-[15] pointer-events-none"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Dark gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-foreground/30 z-[5] pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Left vertical accent line */}
      <motion.div
        className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-primary/20 z-[12] pointer-events-none hidden md:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 1.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
      />

      {/* Centered text content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pb-[12vh]"
      >
        {/* Small top label */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
        >
          <div className="w-8 h-[1px] bg-primary" />
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-primary-foreground/60 font-semibold">
            Award-Winning Studio
          </span>
          <div className="w-8 h-[1px] bg-primary" />
        </motion.div>

        {/* Main heading — line 1 */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-display font-black text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] text-primary-foreground"
            initial={{ y: "120%", rotateX: -40 }}
            animate={{ y: "0%", rotateX: 0 }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ perspective: 800 }}
          >
            Design
          </motion.h1>
        </div>

        {/* Main heading — line 2 with outline style */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-display font-black text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em]"
            style={{
              WebkitTextStroke: "2px hsl(var(--primary-foreground))",
              color: "transparent",
              perspective: 800,
            }}
            initial={{ y: "120%", rotateX: -40 }}
            animate={{ y: "0%", rotateX: 0 }}
            transition={{ duration: 1.4, delay: 0.95, ease: [0.76, 0, 0.24, 1] }}
          >
            That Endures
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="mt-8 text-sm md:text-base text-primary-foreground/50 font-body max-w-lg tracking-wide leading-relaxed"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
        >
          Visionary architecture that shapes the future.
          <br />
          <span className="text-primary-foreground/80 font-medium">Spaces that inspire generations.</span>
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="mt-10 flex items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7, ease: "easeOut" }}
        >
          <a
            href="#about"
            className="group relative inline-flex items-center gap-3 px-8 py-4 font-display font-bold text-xs tracking-[0.2em] uppercase text-foreground bg-primary-foreground overflow-hidden transition-all duration-500 hover:tracking-[0.3em]"
          >
            <span className="relative z-10">Explore</span>
            <ArrowRight size={14} className="relative z-10 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 font-display text-xs tracking-[0.2em] uppercase text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300 font-semibold"
          >
            Our Work
            <span className="w-6 h-[1px] bg-current" />
          </a>
        </motion.div>
      </motion.div>

      {/* Building image — walk-in zoom effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] max-w-[950px] z-20 pointer-events-none origin-[50%_85%]"
        style={{
          y: smoothBuildingY,
          scale: smoothBuildingScale,
          x: smoothMouseX,
        }}
        initial={{ y: "50%", opacity: 0, scale: 0.9 }}
        animate={{ y: "0%", opacity: 1, scale: 1 }}
        transition={{
          duration: 2,
          delay: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <img
          src={heroBuilding}
          alt="Modern Architecture"
          className="w-full h-auto drop-shadow-[0_-20px_60px_rgba(0,0,0,0.4)]"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* Vignette overlay for walk-in tunnel effect */}
      <motion.div
        className="absolute inset-0 z-[25] pointer-events-none"
        style={{
          opacity: smoothVignette,
          background: "radial-gradient(ellipse 50% 50% at 50% 60%, transparent 0%, hsl(var(--foreground)) 100%)",
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent z-30 pointer-events-none" />

      {/* Bottom HUD bar */}
      <motion.div
        className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-[32] flex items-end justify-between pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        {/* Left: location */}
        <div className="flex flex-col gap-1">
          <span className="font-display text-[9px] tracking-[0.3em] uppercase text-muted-foreground/60">
            New York — Est. 2004
          </span>
        </div>

        {/* Center: scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 pointer-events-auto cursor-pointer"
          style={{ y: scrollIndicatorY }}
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="font-display text-[8px] tracking-[0.4em] uppercase text-muted-foreground/50">
            Scroll
          </span>
          <ArrowDown size={12} className="text-muted-foreground/50" />
        </motion.div>

        {/* Right: time */}
        <div className="flex flex-col items-end gap-1">
          <span className="font-body text-[10px] tabular-nums text-muted-foreground/50 tracking-wider">
            {time}
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
