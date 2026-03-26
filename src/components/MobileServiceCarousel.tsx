import { motion, useMotionValue, useTransform, animate, PanInfo, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { AnimatedCounter } from "./ScrollAnimations";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";

interface CardData {
  title: string;
  desc: string;
  img: string;
  icon: React.ElementType;
  stat: number;
  statLabel: string;
}

// ─── Progress Dots ───────────────────────────────────────────
const ProgressDots = ({ count, active }: { count: number; active: number }) => (
  <div className="flex items-center justify-center gap-2 mt-8">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="rounded-full"
        animate={{
          width: i === active ? 24 : 8,
          height: 8,
          background:
            i === active
              ? "hsl(var(--primary))"
              : "hsl(var(--primary-foreground) / 0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    ))}
  </div>
);

// ─── Mobile Card ─────────────────────────────────────────────
const MobileCard = ({
  card,
  index,
  isActive,
  isTapped,
  onTap,
}: {
  card: CardData;
  index: number;
  isActive: boolean;
  isTapped: boolean;
  onTap: () => void;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = card.icon;
  const showDetails = isActive && isTapped;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
      animate={
        inView
          ? { opacity: 1, x: 0, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="flex-shrink-0 w-[85vw] max-w-[340px]"
    >
      <motion.div
        onTap={onTap}
        animate={{
          scale: isActive ? 1 : 0.92,
          opacity: isActive ? 1 : 0.5,
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative rounded-2xl overflow-hidden h-[320px] cursor-pointer"
        style={{
          boxShadow: isActive
            ? "0 0 30px hsl(var(--primary) / 0.15), 0 20px 40px -15px hsl(0 0% 0% / 0.4)"
            : "0 8px 20px -8px hsl(0 0% 0% / 0.3)",
        }}
      >
        {/* Glow border */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl z-0"
          animate={{
            opacity: isActive ? [0.4, 0.7, 0.4] : 0.15,
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut",
          }}
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary) / 0.5), transparent 40%, hsl(var(--primary) / 0.3) 70%, transparent)",
          }}
        />

        {/* Card body */}
        <div
          className="absolute inset-[1px] rounded-2xl overflow-hidden z-10"
          style={{
            background: "hsl(var(--foreground) / 0.88)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Image */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover"
              animate={{
                scale: showDetails ? 1.08 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, hsl(var(--foreground) / 0.95) 15%, hsl(var(--foreground) / 0.5) 50%, hsl(var(--foreground) / 0.15) 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-between p-5">
            {/* Top row: icon + stat */}
            <div className="flex items-start justify-between">
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  background: showDetails
                    ? "hsl(var(--primary) / 0.2)"
                    : "hsl(var(--primary-foreground) / 0.08)",
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  background: { duration: 0.4 },
                }}
                className="p-2.5 rounded-xl"
                style={{
                  boxShadow: showDetails
                    ? "0 0 20px hsl(var(--primary) / 0.25)"
                    : "none",
                }}
              >
                <Icon
                  size={22}
                  className="transition-colors duration-400"
                  style={{
                    color: showDetails
                      ? "hsl(var(--primary))"
                      : "hsl(var(--primary-foreground) / 0.6)",
                    filter: showDetails
                      ? "drop-shadow(0 0 6px hsl(var(--primary) / 0.4))"
                      : "none",
                  }}
                />
              </motion.div>

              <div className="text-right">
                <span
                  className="font-display font-extrabold text-xl"
                  style={{ color: "hsl(var(--primary-foreground))" }}
                >
                  <AnimatedCounter value={card.stat} delay={0.3 + index * 0.1} />
                  <span className="text-sm">+</span>
                </span>
                <p
                  className="font-body text-[10px] tracking-wider uppercase"
                  style={{ color: "hsl(var(--primary-foreground) / 0.45)" }}
                >
                  {card.statLabel}
                </p>
              </div>
            </div>

            {/* Bottom: title + reveal desc */}
            <div>
              <motion.h3
                className="font-display font-bold text-lg uppercase tracking-wider mb-1"
                style={{ color: "hsl(var(--primary-foreground))" }}
                animate={{ y: showDetails ? -4 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              >
                {card.title}
              </motion.h3>

              <motion.p
                className="font-body text-xs leading-relaxed"
                style={{ color: "hsl(var(--primary-foreground) / 0.55)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: showDetails ? 1 : 0,
                  y: showDetails ? 0 : 12,
                }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              >
                {card.desc}
              </motion.p>

              {/* Accent line */}
              <motion.div
                className="h-[2px] mt-3 origin-left"
                style={{ background: "hsl(var(--primary))" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: showDetails ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              />

              {/* Tap hint */}
              <motion.p
                className="font-body text-[10px] mt-2 tracking-wide"
                style={{ color: "hsl(var(--primary) / 0.6)" }}
                animate={{ opacity: isActive && !isTapped ? [0.4, 0.8, 0.4] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Tap to explore →
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Bottom Sheet Detail ─────────────────────────────────────
const CardBottomSheet = ({
  card,
  open,
  onClose,
}: {
  card: CardData | null;
  open: boolean;
  onClose: () => void;
}) => {
  if (!card) return null;
  const Icon = card.icon;

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="border-t border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--foreground))]">
        <DrawerHeader className="text-left pb-0">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="p-2 rounded-xl"
              style={{ background: "hsl(var(--primary) / 0.15)" }}
            >
              <Icon size={20} style={{ color: "hsl(var(--primary))" }} />
            </div>
            <DrawerTitle
              className="font-display font-bold text-lg uppercase tracking-wider"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              {card.title}
            </DrawerTitle>
          </div>
        </DrawerHeader>

        <div className="px-4 pb-6">
          {/* Image */}
          <div className="rounded-xl overflow-hidden h-[200px] mb-4">
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Stat */}
          <div
            className="flex items-baseline gap-1 mb-3"
          >
            <span
              className="font-display font-extrabold text-3xl"
              style={{ color: "hsl(var(--primary))" }}
            >
              {card.stat}+
            </span>
            <span
              className="font-body text-xs tracking-wider uppercase"
              style={{ color: "hsl(var(--primary-foreground) / 0.5)" }}
            >
              {card.statLabel}
            </span>
          </div>

          <DrawerDescription
            className="font-body text-sm leading-relaxed"
            style={{ color: "hsl(var(--primary-foreground) / 0.7)" }}
          >
            {card.desc}
          </DrawerDescription>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

// ─── Main Carousel ───────────────────────────────────────────
const MobileServiceCarousel = ({ cards }: { cards: CardData[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const [sheetCard, setSheetCard] = useState<CardData | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = Math.min(window.innerWidth * 0.85, 340);
  const GAP = 16;
  const OFFSET = (window.innerWidth - CARD_WIDTH) / 2;

  const getX = useCallback(
    (index: number) => OFFSET - index * (CARD_WIDTH + GAP),
    [OFFSET, CARD_WIDTH, GAP]
  );

  const x = useMotionValue(getX(0));

  const snapTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(cards.length - 1, index));
      setActiveIndex(clamped);
      animate(x, getX(clamped), {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    },
    [cards.length, getX, x]
  );

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      const threshold = CARD_WIDTH / 4;
      if (info.offset.x < -threshold) {
        snapTo(activeIndex + 1);
      } else if (info.offset.x > threshold) {
        snapTo(activeIndex - 1);
      } else {
        snapTo(activeIndex);
      }
    },
    [activeIndex, CARD_WIDTH, snapTo]
  );

  const handleCardTap = useCallback(
    (index: number) => {
      if (index !== activeIndex) {
        snapTo(index);
        setTappedIndex(null);
        return;
      }

      if (tappedIndex === index) {
        // Second tap — open bottom sheet
        setSheetCard(cards[index]);
        setSheetOpen(true);
        setTappedIndex(null);
      } else {
        setTappedIndex(index);
      }
    },
    [activeIndex, tappedIndex, cards, snapTo]
  );

  // Reset tap state when swiping away
  useEffect(() => {
    setTappedIndex(null);
  }, [activeIndex]);

  return (
    <div className="relative -mx-6">
      {/* Carousel track */}
      <motion.div
        ref={containerRef}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{
          left: getX(cards.length - 1) - 20,
          right: getX(0) + 20,
        }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
      >
        {cards.map((card, i) => (
          <MobileCard
            key={card.title}
            card={card}
            index={i}
            isActive={i === activeIndex}
            isTapped={tappedIndex === i}
            onTap={() => handleCardTap(i)}
          />
        ))}
      </motion.div>

      {/* Progress dots */}
      <ProgressDots count={cards.length} active={activeIndex} />

      {/* Bottom sheet */}
      <CardBottomSheet
        card={sheetCard}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </div>
  );
};

export default MobileServiceCarousel;
