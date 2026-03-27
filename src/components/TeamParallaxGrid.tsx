import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import team6 from "@/assets/team-6.jpg";

const teamMembers = [
  { src: team1, name: "Marcus Webb", role: "Founding Partner", speed: -40 },
  { src: team2, name: "Elena Torres", role: "Design Director", speed: 30 },
  { src: team3, name: "James Chen", role: "Lead Designer", speed: -20 },
  { src: team4, name: "Sarah Miller", role: "Project Director", speed: 45 },
  { src: team5, name: "David Laurent", role: "Senior Architect", speed: -35 },
  { src: team6, name: "Mei Lin", role: "Interior Design Lead", speed: 25 },
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

  return (
    <div ref={ref}>
      <motion.div
        ref={cardRef}
        style={{ y: smoothY }}
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="group relative overflow-hidden"
      >
        <div className="relative overflow-hidden">
          <img
            src={member.src}
            alt={member.name}
            loading="lazy"
            width={640}
            height={800}
            className="w-full h-[220px] md:h-[280px] object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          className="mt-3"
        >
          <p className="font-display text-sm font-bold text-foreground tracking-wide">
            {member.name}
          </p>
          <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mt-0.5">
            {member.role}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const TeamParallaxGrid = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <div ref={sectionRef} className="mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[2px] bg-primary" />
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold">
            Our People
          </span>
        </div>
        <h3 className="font-display font-extrabold text-2xl md:text-3xl text-foreground uppercase">
          The Team
        </h3>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {teamMembers.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i} />
        ))}
      </div>
    </div>
  );
};

export default TeamParallaxGrid;
