import { useState, useEffect } from "react";
import { X, Flame } from "lucide-react";

const PROMO_END = new Date("2026-04-30T23:59:59");

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - new Date().getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(PROMO_END));
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(PROMO_END));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isExpired || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-[#1a1a0a] via-[#2a2008] to-[#1a1a0a] border-t-2 border-gold/60 shadow-[0_-10px_40px_rgba(201,168,76,0.15)]">
        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-text-muted hover:text-text-primary transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          {/* Left - Message */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="hidden sm:flex w-10 h-10 bg-gold/10 rounded-full items-center justify-center flex-shrink-0">
              <Flame size={20} className="text-gold animate-pulse" />
            </div>
            <div>
              <p className="text-text-primary text-sm sm:text-base font-bold">
                <span className="text-gold">-20 %</span> na Interiér + Exteriér
                <span className="text-text-muted font-normal mx-1.5">|</span>
                <span className="line-through text-text-muted font-normal text-xs sm:text-sm">1 790 Kč</span>
                {" "}
                <span className="text-gold font-bold">1 432 Kč</span>
              </p>
              <p className="text-text-muted text-xs mt-0.5">
                Kód <span className="text-gold font-semibold">JARO2026</span> do poznámky při rezervaci
              </p>
            </div>
          </div>

          {/* Center - Countdown */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {[
              { value: timeLeft.days, label: "d" },
              { value: timeLeft.hours, label: "h" },
              { value: timeLeft.minutes, label: "m" },
              { value: timeLeft.seconds, label: "s" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-1.5 sm:gap-2">
                <div className="bg-primary border border-gold/20 rounded px-2 py-1 min-w-[38px] sm:min-w-[44px] text-center">
                  <span className="text-gold text-base sm:text-lg font-bold font-mono">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="text-text-muted text-[9px] ml-0.5">{unit.label}</span>
                </div>
                {i < 3 && <span className="text-gold/30 text-sm font-bold">:</span>}
              </div>
            ))}
          </div>

          {/* Right - CTA */}
          <a
            href="#rezervace"
            className="flex-shrink-0 bg-gold hover:bg-gold-light text-primary px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-200 rounded hover:shadow-lg hover:shadow-gold/30 animate-subtle-pulse"
          >
            Chci slevu
          </a>
        </div>
      </div>
    </div>
  );
}
