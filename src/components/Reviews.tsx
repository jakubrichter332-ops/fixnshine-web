import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Martin K.",
    text: "Nejlepší myčka v Praze! Auto vypadalo jako nové.",
    stars: 5,
  },
  {
    name: "Petra S.",
    text: "Konečně někdo, kdo se o auto stará pečlivě. Interiér voněl ještě týden!",
    stars: 5,
  },
  {
    name: "Tomáš H.",
    text: "Tepování sedaček bylo dokonalé. Fleky po dětech zmizely.",
    stars: 5,
  },
  {
    name: "Jana M.",
    text: "Super přístup, férové ceny a skvělý výsledek. Doporučuji!",
    stars: 5,
  },
  {
    name: "David R.",
    text: "Přijel jsem s BMW plným prachu. Odjížděl jsem jako z autosalonu.",
    stars: 5,
  },
  {
    name: "Lucie V.",
    text: "Online rezervace, bez čekání, profesionální přístup. Vrátím se!",
    stars: 5,
  },
];

// Left side bubbles (indices 0, 1, 2), Right side (3, 4, 5)
const leftPositions = [
  { top: "15vh", delay: 0.3 },
  { top: "35vh", delay: 0.8 },
  { top: "58vh", delay: 1.3 },
];

const rightPositions = [
  { top: "12vh", delay: 0.5 },
  { top: "38vh", delay: 1.0 },
  { top: "60vh", delay: 1.5 },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={10} className="fill-gold text-gold" />
      ))}
    </div>
  );
}

function ReviewBubble({
  review,
  side,
  top,
  delay,
  floatDuration,
}: {
  review: (typeof reviews)[0];
  side: "left" | "right";
  top: string;
  delay: number;
  floatDuration: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -60 : 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: side === "left" ? -60 : 60 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`fixed z-30 pointer-events-none hidden xl:block ${
        side === "left" ? "left-4 2xl:left-8" : "right-4 2xl:right-8"
      }`}
      style={{ top }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="bg-surface/90 backdrop-blur-sm border border-border rounded-xl p-4 max-w-[220px] 2xl:max-w-[250px] shadow-lg shadow-black/30"
      >
        <Quote size={14} className="text-gold/30 mb-2" />
        <p className="text-text-secondary text-xs leading-relaxed mb-3">
          "{review.text}"
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold text-[10px] font-bold">
              {review.name.charAt(0)}
            </div>
            <span className="text-text-primary text-xs font-medium">
              {review.name}
            </span>
          </div>
          <StarRow count={review.stars} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Reviews() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const servicesEl = document.getElementById("sluzby");
      if (servicesEl) {
        const rect = servicesEl.getBoundingClientRect();
        setVisible(rect.top > window.innerHeight * 0.3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {reviews.slice(0, 3).map((review, i) => (
            <ReviewBubble
              key={review.name}
              review={review}
              side="left"
              top={leftPositions[i].top}
              delay={leftPositions[i].delay}
              floatDuration={4 + i * 0.7}
            />
          ))}
          {reviews.slice(3, 6).map((review, i) => (
            <ReviewBubble
              key={review.name}
              review={review}
              side="right"
              top={rightPositions[i].top}
              delay={rightPositions[i].delay}
              floatDuration={4.5 + i * 0.6}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
}
