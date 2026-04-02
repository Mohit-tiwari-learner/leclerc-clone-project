import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import team6 from "@/assets/team-6.jpg";

const teamMembers = [
  { src: team1, name: "Marcus Webb", role: "Founding Partner", specialty: "Conceptual Design", speed: -40 },
  { src: team2, name: "Elena Torres", role: "Design Director", specialty: "Sustainable Architecture", speed: 30 },
  { src: team3, name: "James Chen", role: "Lead Designer", specialty: "Urban Planning", speed: -20 },
  { src: team4, name: "Sarah Miller", role: "Project Director", specialty: "Commercial Spaces", speed: 45 },
  { src: team5, name: "David Laurent", role: "Senior Architect", specialty: "Structural Innovation", speed: -35 },
  { src: team6, name: "Mei Lin", role: "Interior Design Lead", specialty: "Material Research", speed: 25 },
];

const TeamCard = ({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
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

  return (
    <div ref={ref}>
      <motion.div
        ref={cardRef}
        style={{ y: smoothY }}
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.9,
          delay: index * 0.12,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="group relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <motion.img
            src={member.src}
            alt={member.name}
            loading="lazy"
            width={640}
            height={800}
            animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-[240px] md:h-[320px] object-cover object-top"
          />

          {/* Hover overlay */}
          <motion.div
            initial={false}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent flex flex-col justify-end p-4"
          >
            <motion.p
              initial={false}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="font-display text-[10px] tracking-[0.3em] uppercase text-primary"
            >
              {member.specialty}
            </motion.p>
            <motion.div
              initial={false}
              animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="w-8 h-[1px] bg-primary mt-2 origin-left"
            />
          </motion.div>

          {/* Index number */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-display text-[10px] tracking-[0.2em] text-primary-foreground/40">
              0{index + 1}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.4 }}
          className="mt-4 flex items-start justify-between"
        >
          <div>
            <p className="font-display text-sm font-bold text-foreground tracking-wide">
              {member.name}
            </p>
            <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mt-1">
              {member.role}
            </p>
          </div>
          <motion.div
            initial={false}
            animate={isHovered ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const TeamParallaxGrid = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <div ref={sectionRef} className="mt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="mb-12 flex items-end justify-between"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold">
              Our People
            </span>
          </div>
          <h3 className="font-display font-extrabold text-3xl md:text-4xl text-foreground uppercase">
            The Team
          </h3>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="hidden md:block font-display text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
        >
          {teamMembers.length} Professionals
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
        {teamMembers.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i} />
        ))}
      </div>
    </div>
  );
};

export default TeamParallaxGrid;
