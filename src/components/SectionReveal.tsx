import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

// GSAP-style horizontal wipe reveal for sections
export const WipeReveal = ({
  children,
  className = "",
  direction = "left",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const clipPaths: Record<string, { initial: string; animate: string }> = {
    left: { initial: "inset(0 100% 0 0)", animate: "inset(0 0% 0 0)" },
    right: { initial: "inset(0 0 0 100%)", animate: "inset(0 0 0 0%)" },
    up: { initial: "inset(100% 0 0 0)", animate: "inset(0% 0 0 0)" },
    down: { initial: "inset(0 0 100% 0)", animate: "inset(0 0 0% 0)" },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clipPaths[direction].initial }}
      animate={inView ? { clipPath: clipPaths[direction].animate } : {}}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.76, 0, 0.24, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Elastic scale-in reveal
export const ElasticReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      animate={
        inView
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 1,
        delay,
        ease: [0.34, 1.56, 0.64, 1], // elastic overshoot
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 3D perspective tilt reveal
export const TiltReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, rotateX: 45, y: 100, scale: 0.9 }}
        animate={
          inView
            ? { opacity: 1, rotateX: 0, y: 0, scale: 1 }
            : {}
        }
        transition={{
          duration: 1.2,
          delay,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        className={className}
        style={{ transformOrigin: "center bottom" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Mask text line-by-line reveal (GSAP ScrollTrigger style)
export const LineReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "120%", rotate: 3 }}
        animate={inView ? { y: "0%", rotate: 0 } : {}}
        transition={{
          duration: 1,
          delay,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Stagger children with GSAP-like timeline feel
export const TimelineStagger = ({
  children,
  className = "",
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const TimelineItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: {
        opacity: 0,
        y: 80,
        rotateX: -15,
        filter: "blur(8px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        },
      },
    }}
    className={className}
    style={{ perspective: 1000 }}
  >
    {children}
  </motion.div>
);
