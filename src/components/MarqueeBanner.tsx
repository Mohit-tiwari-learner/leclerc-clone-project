import { motion } from "framer-motion";

const Marquee = ({
  text = "CHARLES LECLERC",
  separator = "✦",
  speed = 20,
  className = "",
  reverse = false,
}: {
  text?: string;
  separator?: string;
  speed?: number;
  className?: string;
  reverse?: boolean;
}) => {
  const content = Array(8)
    .fill(null)
    .map((_, i) => (
      <span key={i} className="flex items-center gap-8 shrink-0 px-4">
        <span>{text}</span>
        <span className="text-primary">{separator}</span>
      </span>
    ));

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="flex"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {content}
        {content}
      </motion.div>
    </div>
  );
};

const MarqueeBanner = () => {
  return (
    <div className="bg-foreground py-6 md:py-8 overflow-hidden select-none">
      <Marquee
        text="CHARLES LECLERC"
        className="font-display font-black text-[clamp(3rem,8vw,7rem)] text-primary-foreground/[0.04] leading-none"
        speed={25}
      />
      <Marquee
        text="CL16 — SCUDERIA FERRARI — MONACO"
        separator="●"
        className="font-display font-bold text-xs md:text-sm tracking-[0.3em] text-primary/40 mt-4"
        speed={30}
        reverse
      />
    </div>
  );
};

export default MarqueeBanner;
