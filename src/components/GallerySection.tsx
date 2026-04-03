import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import heroImg from "@/assets/hero-racing.jpg";
import PanoramaViewer from "./PanoramaViewer";

const images = [
  { src: gallery1, caption: "Villa Serena", category: "Residential", year: "2024", size: "tall" },
  { src: gallery2, caption: "Apex Tower", category: "Commercial", year: "2023", size: "wide" },
  { src: gallery3, caption: "Meridian Bridge", category: "Infrastructure", year: "2024", size: "normal" },
  { src: heroImg, caption: "Wave Pavilion", category: "Cultural", year: "2023", size: "tall" },
];

/* ── Cinematic Gallery Image ── */
const GalleryImage = ({
  img,
  index,
}: {
  img: (typeof images)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax: different speeds per card for depth
  const speeds = [-12, 8, -6, 15];
  const imgY = useTransform(scrollYProgress, [0, 1], [`${speeds[index]}%`, `${-speeds[index]}%`]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const smoothScale = useSpring(imgScale, { stiffness: 80, damping: 20 });

  const [isHovered, setIsHovered] = useState(false);

  // Magnetic tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothRY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current as HTMLDivElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 8);
    rotateX.set(-y * 8);
  }, [rotateX, rotateY]);

  const resetTilt = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  }, [rotateX, rotateY]);

  // Size classes for masonry
  const sizeClass = img.size === "tall"
    ? "md:row-span-2"
    : img.size === "wide"
      ? "md:col-span-1"
      : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 140, clipPath: "inset(25% 5% 25% 5%)" }}
      animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" } : {}}
      transition={{ duration: 1.6, delay: index * 0.18, ease: [0.76, 0, 0.24, 1] }}
      className={`relative overflow-hidden group cursor-pointer ${sizeClass}`}
      style={{ perspective: "800px" }}
    >
      <motion.div
        ref={containerRef}
        className="h-full overflow-hidden relative"
        style={{ rotateX: smoothRX, rotateY: smoothRY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouse}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={resetTilt}
      >
        <motion.img
          src={img.src}
          alt={img.caption}
          style={{ y: imgY, scale: smoothScale }}
          className="w-full h-[300px] md:h-full min-h-[300px] object-cover will-change-transform"
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        {/* Persistent bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent pointer-events-none" />

        {/* Cinematic letterbox bars on hover */}
        <motion.div
          initial={false}
          animate={isHovered ? { height: "8%" } : { height: "0%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 right-0 bg-foreground pointer-events-none z-20"
        />
        <motion.div
          initial={false}
          animate={isHovered ? { height: "8%" } : { height: "0%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-0 left-0 right-0 bg-foreground pointer-events-none z-20"
        />

        {/* Large ghost number */}
        <motion.div
          initial={false}
          animate={isHovered ? { opacity: 0.06, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <span className="font-display text-[140px] md:text-[200px] font-black text-primary-foreground leading-none select-none">
            0{index + 1}
          </span>
        </motion.div>

        {/* Hover content overlay */}
        <div className="absolute inset-0 z-30 flex flex-col justify-between p-5 md:p-7 pointer-events-none">
          {/* Top: category badge + year */}
          <motion.div
            initial={false}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-center justify-between"
          >
            <span className="font-display text-[9px] tracking-[0.5em] uppercase text-primary font-bold px-3 py-1.5 border border-primary/30 backdrop-blur-sm">
              {img.category}
            </span>
            <span className="font-display text-[10px] tracking-[0.3em] text-primary-foreground/50">
              {img.year}
            </span>
          </motion.div>

          {/* Bottom: project name + arrow */}
          <motion.div
            initial={false}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={false}
              animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="w-full h-[1px] bg-primary/30 origin-left mb-4"
            />
            <div className="flex items-end justify-between">
              <div>
                <p className="font-display text-lg md:text-xl font-bold text-primary-foreground tracking-wide">
                  {img.caption}
                </p>
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary-foreground/50 mt-1">
                  {img.category}
                </p>
              </div>
              <motion.div
                initial={false}
                animate={isHovered ? { rotate: -45, scale: 1 } : { rotate: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="w-10 h-10 border border-primary/40 flex items-center justify-center pointer-events-auto hover:bg-primary/10 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 13L13 1M13 1H5M13 1V9" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Corner brackets */}
        <motion.div
          initial={false}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="absolute inset-3 z-10 pointer-events-none"
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/40" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ── Section Header ── */
const GallerySectionHeader = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const titleX = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={containerRef}>
      <motion.div ref={ref} className="mb-16">
        {/* Label line */}
        <div className="flex items-center gap-4 mb-6">
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
            className="font-display text-[10px] tracking-[0.5em] uppercase text-primary font-bold"
          >
            Portfolio
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="flex-1 h-[1px] bg-primary/20 origin-left hidden md:block"
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="hidden md:block font-display text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40"
          >
            {images.length} Projects
          </motion.span>
        </div>

        {/* Title with parallax */}
        <motion.div style={{ x: titleX }}>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "120%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black text-4xl md:text-5xl lg:text-[72px] text-primary-foreground uppercase leading-[0.85] tracking-tight"
            >
              Featured
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "120%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black text-4xl md:text-5xl lg:text-[72px] text-primary uppercase leading-[0.85] tracking-tight"
            >
              Work
            </motion.h2>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ── Main Section ── */
const GallerySection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section id="portfolio" className="relative overflow-hidden">
      {/* Background with subtle parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-foreground -z-10"
      />

      <div ref={sectionRef} className="section-padding">
        <div className="max-w-7xl mx-auto">
          <GallerySectionHeader />

          {/* Masonry grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-2 md:h-[850px]">
            {images.map((img, i) => (
              <GalleryImage key={i} img={img} index={i} />
            ))}
          </div>

          {/* Panorama */}
          <PanoramaViewer />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
