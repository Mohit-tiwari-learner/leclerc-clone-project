import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MagneticWrap, StaggerContainer, StaggerItem, SplitText } from "./ScrollAnimations";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/charles_leclerc/" },
  { label: "TikTok", href: "https://www.tiktok.com/@charlesleclerc" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCIzIX1qgW7P3eF6JCk_afCA" },
  { label: "Twitch", href: "https://www.twitch.tv/charlesleclerc" },
  { label: "X", href: "https://x.com/Charles_Leclerc" },
];

const FooterSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer className="bg-foreground section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div>
            <MagneticWrap strength={0.2}>
              <p className="font-display font-black text-5xl text-primary-foreground tracking-tighter">
                <SplitText text="CL" charClassName="text-primary-foreground" delay={0} />
                <SplitText text="16" charClassName="text-primary" delay={0.1} />
              </p>
            </MagneticWrap>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-primary-foreground/50 text-sm mt-4 max-w-sm"
            >
              Fan tribute site celebrating the career and journey of one of
              Formula 1's most talented drivers.
            </motion.p>
          </div>

          <StaggerContainer className="flex flex-col gap-3" staggerDelay={0.06}>
            <p className="text-display text-xs text-primary tracking-[0.3em] mb-2">
              Follow
            </p>
            {socials.map((s) => (
              <StaggerItem key={s.label}>
                <MagneticWrap strength={0.4}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-primary-foreground/60 text-sm hover:text-primary transition-colors inline-block"
                  >
                    {s.label}
                  </a>
                </MagneticWrap>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <StaggerContainer className="flex flex-col gap-3" staggerDelay={0.06}>
            <p className="text-display text-xs text-primary tracking-[0.3em] mb-2">
              Navigate
            </p>
            {["The Driver", "Career", "Gallery", "Life"].map((item) => (
              <StaggerItem key={item}>
                <MagneticWrap strength={0.4}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                    className="font-body text-primary-foreground/60 text-sm hover:text-primary transition-colors inline-block"
                  >
                    {item}
                  </a>
                </MagneticWrap>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="font-body text-primary-foreground/30 text-xs">
            © 2025 Fan Tribute. Not affiliated with Charles Leclerc or Ferrari.
          </p>
          <p className="font-body text-primary-foreground/30 text-xs">
            Built with passion for motorsport
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
