import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import panoramaImg from "@/assets/panorama-360.jpg";

const PanoramaViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  // Auto-pan on mount
  useEffect(() => {
    if (!inView || !containerRef.current) return;
    const el = containerRef.current;
    // Start from center
    el.scrollLeft = el.scrollWidth / 4;
    setCurrentScroll(el.scrollLeft);

    let frame: number;
    let paused = false;
    const autoPan = () => {
      if (!paused && el) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }
      frame = requestAnimationFrame(autoPan);
    };
    frame = requestAnimationFrame(autoPan);

    const pauseAuto = () => { paused = true; };
    const resumeAuto = () => { setTimeout(() => { paused = false; }, 2000); };

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
      const walk = (x - startX) * 2;
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
      const walk = (x - startX) * 2;
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
      className="relative mt-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-display text-[10px] tracking-[0.3em] uppercase text-primary-foreground/60 font-semibold">
            360° Immersive View
          </span>
        </div>
        <span className="font-display text-[10px] tracking-[0.2em] uppercase text-primary-foreground/40">
          Drag to explore →
        </span>
      </div>

      {/* Viewer */}
      <div
        ref={containerRef}
        className="relative w-full h-[300px] md:h-[450px] overflow-x-scroll overflow-y-hidden cursor-grab active:cursor-grabbing"
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

        {/* Vignette edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-foreground to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-foreground to-transparent pointer-events-none z-10" />
      </div>

      {/* Project info bar */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="font-display text-sm font-bold text-primary-foreground">
            Skyline Penthouse
          </p>
          <p className="font-body text-xs text-primary-foreground/50 mt-0.5">
            Upper East Side, New York — 4,200 sq ft
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-display text-[10px] tracking-[0.2em] uppercase text-primary/80">
            Featured Project
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PanoramaViewer;
