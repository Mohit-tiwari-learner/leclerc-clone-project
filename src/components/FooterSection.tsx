import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const FooterSection = () => {
  const ref = useRef(null);
  const bigTextRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");

  const { scrollYProgress } = useScroll({
    target: bigTextRef,
    offset: ["start end", "end start"],
  });

  const bigTextY = useTransform(scrollYProgress, [0, 1], [100, -50]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: cubicEase },
    },
  };

  const cubicEase = [0.76, 0, 0.24, 1] as const;

  const headingVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: "0%",
      transition: { duration: 0.9, ease: cubicEase },
    },
  };

  return (
    <footer id="contact" ref={ref}>
      {/* Dark upper section */}
      <div className="bg-foreground px-6 md:px-12 lg:px-24 pt-20 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Tagline */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mb-16"
          >
            <div className="overflow-hidden">
              <motion.h2
                variants={headingVariants}
                className="font-display font-black text-4xl md:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]"
              >
                Design In
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                variants={headingVariants}
                className="font-display font-black text-4xl md:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]"
              >
                Context
              </motion.h2>
            </div>
            <motion.p
              variants={itemVariants}
              className="font-body text-primary-foreground/40 text-sm mt-6 max-w-xs"
            >
              Coming<br />Early 2026
            </motion.p>
          </motion.div>

          {/* 3-column grid */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          >
            {/* Column 1: Let's Talk + Find Us */}
            <div className="space-y-10">
              <motion.div variants={itemVariants}>
                <div className="overflow-hidden">
                  <motion.h3
                    variants={headingVariants}
                    className="font-display font-bold text-lg md:text-xl text-primary-foreground uppercase tracking-tight mb-4"
                  >
                    Let's Talk
                  </motion.h3>
                </div>
                <a
                  href="mailto:hello@arcstudio.com"
                  className="font-body text-primary-foreground/60 text-sm hover:text-primary transition-colors"
                >
                  hello@arcstudio.com
                </a>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="overflow-hidden">
                  <motion.h3
                    variants={headingVariants}
                    className="font-display font-bold text-lg md:text-xl text-primary-foreground uppercase tracking-tight mb-4"
                  >
                    Find Us
                  </motion.h3>
                </div>
                <p className="font-body text-primary-foreground/60 text-sm leading-relaxed">
                  245 West 17th Street<br />
                  New York, NY 10011
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-body text-primary-foreground text-sm mt-4 border border-primary-foreground/30 px-4 py-2 hover:bg-primary-foreground/10 transition-colors"
                >
                  Map <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>

            {/* Column 2: Partner Links */}
            <motion.div variants={itemVariants}>
              <div className="overflow-hidden">
                <motion.h3
                  variants={headingVariants}
                  className="font-display font-bold text-lg md:text-xl text-primary-foreground uppercase tracking-tight mb-4"
                >
                  Partner Links
                </motion.h3>
              </div>
              <div className="flex flex-col gap-2">
                {["ARC Interiors", "ARC Landscapes", "ARC Development"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="font-body text-primary-foreground/60 text-sm hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  )
                )}
              </div>
            </motion.div>

            {/* Column 3: Stay in the Loop + Social */}
            <div className="space-y-10">
              <motion.div variants={itemVariants}>
                <div className="overflow-hidden">
                  <motion.h3
                    variants={headingVariants}
                    className="font-display font-bold text-lg md:text-xl text-primary-foreground uppercase tracking-tight mb-4"
                  >
                    Stay In The Loop
                  </motion.h3>
                </div>
                <p className="font-body text-primary-foreground/60 text-sm mb-4">
                  Sign up for ARC Studio emails to be the first to see inspiring
                  projects, news, and exclusive updates.
                </p>
                <div className="relative border-b border-primary-foreground/30">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent font-body text-primary-foreground text-sm py-3 pr-10 placeholder:text-primary-foreground/30 outline-none"
                  />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="overflow-hidden">
                  <motion.h3
                    variants={headingVariants}
                    className="font-display font-bold text-lg md:text-xl text-primary-foreground uppercase tracking-tight leading-tight"
                  >
                    Let's Get Social ↘<br />
                    <span className="text-primary">@ARCSTUDIO</span>
                  </motion.h3>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Giant brand text section */}
      <div
        ref={bigTextRef}
        className="bg-secondary relative overflow-hidden py-8 md:py-12"
      >
        <motion.div
          style={{ y: bigTextY }}
          className="flex justify-center items-center"
        >
          <h2 className="font-display font-black text-[18vw] md:text-[16vw] leading-[0.85] tracking-tighter text-foreground uppercase select-none whitespace-nowrap">
            {"ARCSTUDIO".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 120 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.05,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h2>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="bg-secondary px-6 md:px-12 lg:px-24 pb-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-foreground/10">
          <p className="font-display font-bold text-foreground/80 text-xs tracking-widest uppercase">
            ARC Studio
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-body text-foreground/50 text-xs uppercase tracking-widest hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="font-body text-foreground/50 text-xs uppercase tracking-widest hover:text-foreground transition-colors"
            >
              Privacy
            </a>
          </div>
          <p className="font-body text-foreground/40 text-xs tracking-wider">
            © 2025 ARC Studio. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
