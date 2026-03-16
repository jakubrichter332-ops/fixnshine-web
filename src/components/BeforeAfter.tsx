import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

import trunkBefore from "../assets/before-after/01-trunk-before.jpeg";
import trunkAfter from "../assets/before-after/01-trunk-after.jpeg";
import octaviaBefore from "../assets/before-after/02-octavia-before.jpeg";
import octaviaAfter from "../assets/before-after/02-octavia-after.jpeg";
import seatsBefore from "../assets/before-after/03-seats-before.jpeg";
import seatsAfter from "../assets/before-after/03-seats-after.jpeg";
import seatLeonBefore from "../assets/before-after/04-seat-leon-before.jpeg";
import seatLeonAfter from "../assets/before-after/04-seat-leon-after.jpeg";

const comparisons = [
  { before: trunkBefore, after: trunkAfter, label: "Kufr — hloubkové čištění" },
  { before: octaviaBefore, after: octaviaAfter, label: "Škoda Octavia — interiér" },
  { before: seatsBefore, after: seatsAfter, label: "Zadní sedačky — tepování" },
  { before: seatLeonBefore, after: seatLeonAfter, label: "Seat Leon — kompletní interiér" },
];

function ComparisonSlider({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-col-resize border border-border select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* After image (full background) */}
        <img
          src={after}
          alt="Po"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={before}
            alt="Před"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${containerRef.current?.offsetWidth || 1000}px`, maxWidth: "none" }}
            draggable={false}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gold z-10"
          style={{ left: `${position}%` }}
        >
          {/* Slider handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg shadow-black/30">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 3L2 8L5 13" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 3L14 8L11 13" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm text-text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full z-20">
          Před
        </div>
        <div className="absolute top-3 right-3 bg-gold/90 backdrop-blur-sm text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full z-20">
          Po
        </div>
      </div>

      <p className="text-text-secondary text-sm text-center">{label}</p>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest font-medium">
            Výsledky
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Před{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              &
            </span>
            {" "}Po
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Posuňte jezdcem a přesvědčte se o rozdílu. Takhle vypadá profesionální péče.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {comparisons.map((comp, index) => (
            <motion.div
              key={comp.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ComparisonSlider
                before={comp.before}
                after={comp.after}
                label={comp.label}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
