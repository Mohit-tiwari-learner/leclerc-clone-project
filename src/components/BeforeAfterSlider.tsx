import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import buildingBefore from "@/assets/building-before.jpg";
import buildingAfter from "@/assets/building-after.jpg";

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    },
    []
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

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      className="relative w-full h-[400px] lg:h-[500px] overflow-hidden cursor-col-resize select-none group"
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

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-primary-foreground z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center shadow-lg">
          <div className="flex items-center gap-1">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="rotate-180">
              <path d="M5 1L1 5L5 9" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1L5 5L1 9" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="absolute top-4 left-4 z-20"
      >
        <span className="font-display text-[10px] tracking-[0.3em] uppercase bg-foreground/70 text-primary-foreground px-3 py-1.5">
          Before
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="absolute top-4 right-4 z-20"
      >
        <span className="font-display text-[10px] tracking-[0.3em] uppercase bg-primary/90 text-primary-foreground px-3 py-1.5">
          After
        </span>
      </motion.div>
    </motion.div>
  );
};

export default BeforeAfterSlider;
