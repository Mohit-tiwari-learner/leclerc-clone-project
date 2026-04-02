import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import buildingBefore from "@/assets/building-before.jpg";
import buildingAfter from "@/assets/building-after.jpg";

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
      if (!hasInteracted) setHasInteracted(true);
    },
    [hasInteracted]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMove]);

  // Subtle auto-slide hint animation
  useEffect(() => {
    if (!inView || hasInteracted) return;
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.015;
      const pos = 50 + Math.sin(t * 2) * 8;
      setSliderPosition(pos);
      frame = requestAnimationFrame(animate);
    };
    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, 1500);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [inView, hasInteracted]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      className="relative w-full h-[420px] lg:h-[560px] overflow-hidden cursor-col-resize select-none group rounded-sm"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After image (full background) */}
      <img
        src={buildingAfter}
        alt="After renovation"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={buildingBefore}
          alt="Before renovation"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth || "100%", maxWidth: "none" }}
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Cinematic top/bottom bars */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-foreground/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-foreground/40 to-transparent pointer-events-none z-10" />

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-20"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Line with glow */}
        <div className="absolute inset-0 w-[2px] bg-primary-foreground mx-auto shadow-[0_0_12px_rgba(255,255,255,0.4)]" />

        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={isDragging ? { scale: 1.15 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-12 h-12 rounded-full bg-primary-foreground/95 backdrop-blur-sm flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-primary-foreground/20"
          >
            <div className="flex items-center gap-1.5">
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="rotate-180">
                <path d="M6 1L1 6L6 11" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="w-[1px] h-4 bg-foreground/30" />
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1L6 6L1 11" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Labels */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute top-5 left-5 z-20"
      >
        <span className="font-display text-[10px] tracking-[0.3em] uppercase bg-foreground/80 backdrop-blur-sm text-primary-foreground px-4 py-2 border border-primary-foreground/10">
          Before
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute top-5 right-5 z-20"
      >
        <span className="font-display text-[10px] tracking-[0.3em] uppercase bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 border border-primary-foreground/10">
          After
        </span>
      </motion.div>

      {/* Percentage indicator */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20"
          >
            <span className="font-display text-[11px] tracking-[0.2em] text-primary-foreground/80 bg-foreground/60 backdrop-blur-sm px-3 py-1.5 tabular-nums">
              {Math.round(sliderPosition)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag hint */}
      <AnimatePresence>
        {!hasInteracted && inView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20"
          >
            <span className="font-display text-[10px] tracking-[0.3em] uppercase text-primary-foreground/50 animate-pulse">
              Drag to compare
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BeforeAfterSlider;
