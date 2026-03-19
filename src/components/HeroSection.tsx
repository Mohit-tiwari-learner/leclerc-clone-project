import { motion } from "framer-motion";
import heroImg from "@/assets/hero-racing.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-display font-black text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter text-primary-foreground">
            CL<span className="text-primary">16</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-display text-sm md:text-base text-primary-foreground/80 mt-4 tracking-[0.3em]"
        >
          Beyond Speed
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-primary-foreground/60 text-xs tracking-[0.2em] uppercase font-display">
            Scroll to explore
          </span>
          <div className="w-px h-12 bg-primary-foreground/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
