import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "reveal" | "done">("counting");

  useEffect(() => {
    // Simulate loading with eased counter
    const targets = [12, 27, 41, 58, 73, 85, 91, 96, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < targets.length) {
        setCount(targets[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase("reveal"), 300);
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 1400);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <>
          {/* Top curtain */}
          <motion.div
            className="fixed inset-x-0 top-0 h-1/2 bg-foreground z-[100] flex items-end justify-center"
            initial={{ y: 0 }}
            animate={phase === "reveal" ? { y: "-100%" } : { y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="pb-0 overflow-hidden"
              initial={{ opacity: 1 }}
              animate={phase === "reveal" ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Counter */}
              <motion.p
                className="font-display font-black text-[clamp(5rem,20vw,14rem)] leading-none text-primary-foreground/10 select-none"
                key={count}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {count}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Bottom curtain */}
          <motion.div
            className="fixed inset-x-0 bottom-0 h-1/2 bg-foreground z-[100] flex flex-col items-center justify-start"
            initial={{ y: 0 }}
            animate={phase === "reveal" ? { y: "100%" } : { y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Brand mark */}
            <motion.div
              className="pt-4 flex flex-col items-center gap-4"
              initial={{ opacity: 1 }}
              animate={phase === "reveal" ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-[1px] bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.p
                className="font-display text-[10px] tracking-[0.5em] text-primary-foreground/40 uppercase"
                initial={{ opacity: 0, letterSpacing: "0.8em" }}
                animate={{ opacity: 1, letterSpacing: "0.5em" }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Charles Leclerc
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Center line that grows then splits */}
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={phase === "reveal" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="h-[1px] bg-primary"
              initial={{ width: 0 }}
              animate={{ width: phase === "counting" ? "60px" : "100vw" }}
              transition={{
                duration: phase === "counting" ? 1.5 : 0.6,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="fixed bottom-0 left-0 h-[2px] bg-primary z-[102]"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
