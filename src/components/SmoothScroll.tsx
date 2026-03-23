import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 300,
    mass: 0.5,
  });

  const y = useTransform(smoothProgress, (v) => {
    return v * -(contentHeight - window.innerHeight);
  });

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    const observer = new ResizeObserver(updateHeight);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div style={{ height: contentHeight }} />
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 right-0 will-change-transform"
      >
        {children}
      </motion.div>
    </>
  );
};

export default SmoothScroll;
