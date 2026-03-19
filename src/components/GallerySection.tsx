import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import heroImg from "@/assets/hero-racing.jpg";

const images = [
  { src: gallery1, caption: "Podium Celebration" },
  { src: gallery2, caption: "Monaco Street Circuit" },
  { src: gallery3, caption: "Crossing the Finish Line" },
  { src: heroImg, caption: "On Track at Sunset" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="section-padding bg-foreground" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-display text-xs text-primary mb-4 tracking-[0.3em]"
        >
          Gallery
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl md:text-5xl text-primary-foreground mb-16 uppercase"
        >
          Moments
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="relative overflow-hidden group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500 flex items-end p-6">
                <p className="text-primary-foreground font-display text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
