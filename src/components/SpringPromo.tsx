import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles, ArrowRight } from "lucide-react";

// Konec akce — uprav datum podle potřeby
const PROMO_END = new Date("2026-04-30T23:59:59");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return timeLeft;
}

function getTimeLeft(target: Date) {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function SpringPromo() {
  const { days, hours, minutes, seconds } = useCountdown(PROMO_END);
  const isExpired = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  if (isExpired) return null;

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden bg-primary">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60vw] max-w-[700px] aspect-square bg-gold/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-surface to-primary border border-gold/20 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          {/* Corner badge */}
          <div className="absolute top-0 right-0 bg-gold text-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
            Limitovaná nabídka
          </div>

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles size={16} className="text-gold" />
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">
              Jarní akce 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Vaše auto přežilo zimu.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              Teď si zaslouží jarní péči.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto mb-8"
          >
            Sůl na laku, písek v kobercích, fleky na sedačkách — zima si na vašem
            autě pořádně smlsla. Dáme ho do pucu se slevou <strong className="text-gold">20 %</strong> na
            kompletní balíček Interiér + Exteriér.
          </motion.p>

          {/* Promo price */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="inline-flex items-center gap-4 bg-primary/60 border border-border rounded-xl px-6 sm:px-8 py-4 mb-8"
          >
            <div className="text-left">
              <p className="text-text-muted text-xs uppercase tracking-wider">Interiér + Exteriér</p>
              <div className="flex items-baseline gap-3">
                <span className="text-text-muted line-through text-lg">1 790 Kč</span>
                <span className="text-gold text-3xl sm:text-4xl font-bold">1 432 Kč</span>
              </div>
            </div>
            <div className="bg-red-500/20 text-red-400 text-sm font-bold px-3 py-1 rounded-lg">
              -20 %
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-2 text-text-muted text-xs uppercase tracking-wider mb-3">
              <Clock size={14} className="text-gold" />
              Akce končí za
            </div>
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {[
                { value: days, label: "dní" },
                { value: hours, label: "hod" },
                { value: minutes, label: "min" },
                { value: seconds, label: "sek" },
              ].map((unit, i) => (
                <div key={unit.label} className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-surface border border-border rounded-lg px-3 sm:px-4 py-2 min-w-[56px]">
                    <div className="text-gold text-2xl sm:text-3xl font-bold font-mono">
                      {String(unit.value).padStart(2, "0")}
                    </div>
                    <div className="text-text-muted text-[10px] uppercase tracking-wider">
                      {unit.label}
                    </div>
                  </div>
                  {i < 3 && (
                    <span className="text-gold/40 text-2xl font-bold">:</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <a
              href="#rezervace"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-primary px-10 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 rounded-lg hover:shadow-lg hover:shadow-gold/20 group"
            >
              Rezervovat se slevou
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-text-muted text-xs mt-3">
              Při rezervaci uveďte do poznámky kód <strong className="text-gold">JARO2026</strong>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
