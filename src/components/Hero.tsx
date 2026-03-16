import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/90 to-primary" />

      {/* Subtle gold glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-5 py-2 mb-8"
        >
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-text-secondary text-sm tracking-wide">
            Premium ruční mytí aut
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          Vaše auto si zaslouží
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
            tu nejlepší péči
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Profesionální ruční mytí a detailing s důrazem na každý detail.
          Používáme prémiovou autokosmetiku pro dokonalý výsledek.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#rezervace"
            className="bg-gold hover:bg-gold-light text-primary px-10 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 rounded hover:shadow-lg hover:shadow-gold/20"
          >
            Zarezervovat termín
          </a>
          <a
            href="#sluzby"
            className="border border-border hover:border-gold text-text-primary px-10 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 rounded"
          >
            Naše služby
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "500+", label: "Spokojených zákazníků" },
            { value: "5★", label: "Hodnocení" },
            { value: "100%", label: "Ruční práce" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-gold text-2xl md:text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-text-muted text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#sluzby" className="text-text-muted hover:text-gold transition-colors">
          <ChevronDown size={28} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
