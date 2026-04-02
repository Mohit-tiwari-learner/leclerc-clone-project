import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import team6 from "@/assets/team-6.jpg";

const teamMembers = [
  { src: team1, name: "Marcus Webb", role: "Founding Partner", specialty: "Conceptual Design", speed: -30, featured: true },
  { src: team2, name: "Elena Torres", role: "Design Director", specialty: "Sustainable Architecture", speed: 25 },
  { src: team3, name: "James Chen", role: "Lead Designer", specialty: "Urban Planning", speed: -15 },
  { src: team4, name: "Sarah Miller", role: "Project Director", specialty: "Commercial Spaces", speed: 35, featured: true },
  { src: team5, name: "David Laurent", role: "Senior Architect", specialty: "Structural Innovation", speed: -25 },
  { src: team6, name: "Mei Lin", role: "Interior Design Lead", specialty: "Material Research", speed: 20 },
];

const TeamCard = ({
  member,
  index,
  layout = "default",
}: {
  member: (typeof teamMembers)[0];
  index: number;
  layout?: "featured" | "default";
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, member.speed]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 25 });
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });
  const [isHovered, setIsHovered] = useState(false);

  const isFeatured = layout === "featured";
  const imgHeight = isFeatured ? "h-[340px] md:h-[480px]" : "h-[260px] md:h-[340px]";

  return (
    <div ref={ref}>
      <motion.div
        ref={cardRef}
        style={{ y: smoothY }}
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 1,
          delay: index * 0.1,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="group relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative overflow-hidden">
          <motion.img
            src={member.src}
            alt={member.name}
            loading="lazy"
            width={640}
            height={800}
            animate={isHovered ? { scale: 1.06 } : { scale: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className={`w-full ${imgHeight} object-cover object-top`}
          />

          {/* Persistent subtle gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent pointer-events-none" />

          {/* Hover overlay with blur bar */}
          <motion.div
            initial={false}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/30 to-foreground/10 pointer-events-none"
          />

          {/* Bottom content on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
            <motion.div
              initial={false}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  initial={false}
                  animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
                  className="w-6 h-[1.5px] bg-primary origin-left"
                />
                <span className="font-display text-[9px] tracking-[0.4em] uppercase text-primary font-semibold">
                  Specialty
                </span>
              </div>
              <p className="font-body text-[11px] md:text-xs text-primary-foreground/80 leading-relaxed">
                {member.specialty}
              </p>
            </motion.div>
          </div>

          {/* Top-left index */}
          <motion.div
            initial={false}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 left-4 z-10"
          >
            <span className="font-display text-3xl md:text-4xl font-black text-primary-foreground/10 leading-none">
              0{index + 1}
            </span>
          </motion.div>

          {/* Corner accent on hover */}
          <motion.div
            initial={false}
            animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute top-4 right-4 z-10"
          >
            <div className="w-6 h-6 border-t border-r border-primary/60" />
          </motion.div>
          <motion.div
            initial={false}
            animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="absolute bottom-4 left-4 z-10"
          >
            <div className="w-6 h-6 border-b border-l border-primary/60" />
          </motion.div>
        </div>

        {/* Info below image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
          className="mt-5 relative"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-sm md:text-base font-bold text-foreground tracking-wide leading-tight">
                {member.name}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="w-3 h-[1px] bg-primary" />
                <p className="font-display text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                  {member.role}
                </p>
              </div>
            </div>
            <motion.div
              initial={false}
              animate={isHovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="mt-1 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L13 1M13 1H5M13 1V9" stroke="hsl(var(--foreground))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const TeamParallaxGrid = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <div ref={sectionRef} className="mt-32">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-[2px] bg-primary" />
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold">
            Our People
          </span>
          <div className="flex-1 h-[1px] bg-border hidden md:block" />
          <span className="hidden md:block font-display text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
            {teamMembers.length} Members
          </span>
        </div>
        <div className="flex items-end justify-between gap-8">
          <div>
            <h3 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground uppercase leading-[0.9]">
              The Creative
              <br />
              <span className="text-primary">Minds</span>
            </h3>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden md:block max-w-[260px] font-body text-xs text-muted-foreground leading-relaxed text-right"
          >
            An interdisciplinary team of architects, designers, and visionaries shaping the built environment.
          </motion.p>
        </div>
      </motion.div>

      {/* Asymmetric masonry layout */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-5 md:gap-6">
        {/* Row 1: Featured large + regular */}
        <div className="col-span-1 md:col-span-5">
          <TeamCard member={teamMembers[0]} index={0} layout="featured" />
        </div>
        <div className="col-span-1 md:col-span-4 md:mt-20">
          <TeamCard member={teamMembers[1]} index={1} />
        </div>
        <div className="col-span-1 md:col-span-3 md:mt-8">
          <TeamCard member={teamMembers[2]} index={2} />
        </div>

        {/* Row 2: Offset rhythm */}
        <div className="col-span-1 md:col-span-3 md:-mt-12">
          <TeamCard member={teamMembers[3]} index={3} />
        </div>
        <div className="col-span-1 md:col-span-4 md:-mt-24">
          <TeamCard member={teamMembers[4]} index={4} />
        </div>
        <div className="col-span-2 md:col-span-5 md:-mt-6">
          <TeamCard member={teamMembers[5]} index={5} layout="featured" />
        </div>
      </div>
    </div>
  );
};

export default TeamParallaxGrid;
