import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import heroImg from "@/assets/hero-racing.jpg";
import { SplitText, RevealLine } from "./ScrollAnimations";
import { ElasticReveal, WipeReveal } from "./SectionReveal";

const images = [
  { src: gallery1, caption: "Podium Celebration", size: "tall" },
  { src: gallery2, caption: "Monaco Street Circuit", size: "normal" },
  { src: gallery3, caption: "Crossing the Finish Line", size: "normal" },
  { src: heroImg, caption: "On Track at Sunset", size: "tall" },
];

const GalleryImage = ({
  img,
  index,
}: {
  img: { src: string; caption: string; size: string };
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, clipPath: "inset(15% 0 15% 0)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0% 0)" }
          : {}
      }
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.76, 0, 0.24, 1],
      }}
      className={`relative overflow-hidden group cursor-pointer ${
        img.size === "tall" ? "md:row-span-2" : ""
      }`}
    >
      <div ref={containerRef} className="h-full overflow-hidden">
        <motion.img
          src={img.src}
          alt={img.caption}
          style={{ y: imgY }}
          className="w-full h-[300px] md:h-full min-h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-foreground/50 flex items-end p-6"
      >
        <motion.p
          initial={{ y: 20 }}
          whileHover={{ y: 0 }}
          className="text-primary-foreground font-display text-xs uppercase tracking-[0.2em]"
        >
          {img.caption}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const GallerySection = () => {
  return (
    <section id="gallery" className="section-padding bg-foreground">
      <div className="max-w-7xl mx-auto">
        <WipeReveal direction="left">
          <RevealLine className="mb-8 max-w-[80px]" />
        </WipeReveal>

        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="text-display text-xs text-primary tracking-[0.3em]"
          >
            Gallery
          </motion.p>
        </div>

        <ElasticReveal>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-primary-foreground mb-16 uppercase">
            <SplitText text="Moments" charClassName="text-primary-foreground" delay={0.1} />
          </h2>
        </ElasticReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-1 md:h-[800px]">
          {images.map((img, i) => (
            <GalleryImage key={i} img={img} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
