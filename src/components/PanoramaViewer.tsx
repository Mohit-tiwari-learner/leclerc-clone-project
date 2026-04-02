import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import panoramaImg from "@/assets/panorama-360.jpg";

const PanoramaViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  // Track rotation percentage
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 0) {
        setRotation(Math.round((el.scrollLeft / maxScroll) * 360));
      }
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-pan
  useEffect(() => {
    if (!inView || !containerRef.current) return;
    const el = containerRef.current;
    el.scrollLeft = el.scrollWidth / 4;

    let frame: number;
    let paused = false;
    const autoPan = () => {
      if (!paused && el) {
        el.scrollLeft += 0.4;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }
      frame = requestAnimationFrame(autoPan);
    };
    frame = requestAnimationFrame(autoPan);

    const pauseAuto = () => { paused = true; setIsPaused(true); };
    const resumeAuto = () => { setTimeout(() => { paused = false; setIsPaused(false); }, 3000); };

    el.addEventListener("mousedown", pauseAuto);
    el.addEventListener("mouseup", resumeAuto);
    el.addEventListener("touchstart", pauseAuto);
    el.addEventListener("touchend", resumeAuto);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("mousedown", pauseAuto);
      el.removeEventListener("mouseup", resumeAuto);
      el.removeEventListener("touchstart", pauseAuto);
      el.removeEventListener("touchend", resumeAuto);
    };
  }, [inView]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2.5;
      containerRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      const x = e.touches[0].pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2.5;
      containerRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleEnd = () => setIsDragging(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      className="relative mt-16"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-display text-[10px] tracking-[0.3em] uppercase text-primary-foreground/60 font-semibold">
            360° Immersive View
          </span>
        </div>
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {isPaused ? (
              <motion.span
                key="paused"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-display text-[10px] tracking-[0.2em] uppercase text-primary-foreground/50"
              >
                Drag to explore
              </motion.span>
            ) : (
              <motion.span
                key="auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-display text-[10px] tracking-[0.2em] uppercase text-primary-foreground/30"
              >
                Auto-panning
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Viewer */}
      <div className="relative">
        <div
          ref={containerRef}
          className="relative w-full h-[320px] md:h-[500px] overflow-x-scroll overflow-y-hidden cursor-grab active:cursor-grabbing rounded-sm"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          <img
            src={panoramaImg}
            alt="360° Penthouse Interior Panorama"
            className="h-full w-auto max-w-none select-none pointer-events-none"
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* Vignette edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-foreground via-foreground/50 to-transparent pointer-events-none z-10 rounded-l-sm" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-foreground via-foreground/50 to-transparent pointer-events-none z-10 rounded-r-sm" />

        {/* Cinematic bars */}
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-foreground/30 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-foreground/30 to-transparent pointer-events-none z-10" />

        {/* Compass indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="absolute top-4 right-4 z-20 flex flex-col items-center"
        >
          <div className="w-10 h-10 rounded-full border border-primary-foreground/20 bg-foreground/40 backdrop-blur-sm flex items-center justify-center">
            <motion.div
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 6H6L8 1Z" fill="hsl(var(--primary))" />
                <path d="M8 15L6 10H10L8 15Z" fill="hsl(var(--primary-foreground))" opacity="0.4" />
              </svg>
            </motion.div>
          </div>
          <span className="font-display text-[8px] tracking-[0.3em] uppercase text-primary-foreground/30 mt-1">
            {rotation}°
          </span>
        </motion.div>

        {/* Drag indicator on hover */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 border border-primary/30 pointer-events-none z-10 rounded-sm"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Project info bar */}
      <div className="mt-5 flex items-start justify-between">
        <div>
          <p className="font-display text-sm font-bold text-primary-foreground tracking-wide">
            Skyline Penthouse
          </p>
          <p className="font-body text-xs text-primary-foreground/50 mt-1">
            Upper East Side, New York — 4,200 sq ft
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          <span className="font-display text-[10px] tracking-[0.2em] uppercase text-primary/80">
            Featured Project
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PanoramaViewer;
