import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "../assets/logo.jpeg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Logo as background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src={logo}
          alt=""
          className="w-[60vw] max-w-[700px] opacity-10 object-contain select-none pointer-events-none"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[40vw] max-w-[500px] aspect-square bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 sm:px-5 py-2 mb-6 sm:mb-8"
        >
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-text-secondary text-xs sm:text-sm tracking-wide">
            Premium ruční mytí aut
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-4 sm:mb-6"
        >
          Vaše auto si zaslouží
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
            tu nejlepší péči
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-text-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          Profesionální ruční mytí a detailing s důrazem na každý detail.
          Používáme prémiovou autokosmetiku pro dokonalý výsledek.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#rezervace"
            className="w-full sm:w-auto bg-gold hover:bg-gold-light text-primary px-8 sm:px-10 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 rounded hover:shadow-lg hover:shadow-gold/20 text-center"
          >
            Zarezervovat termín
          </a>
          <a
            href="#sluzby"
            className="w-full sm:w-auto border border-border hover:border-gold text-text-primary px-8 sm:px-10 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 rounded text-center"
          >
            Naše služby
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto"
        >
          {[
            { value: "500+", label: "Spokojených zákazníků" },
            { value: "5★", label: "Hodnocení" },
            { value: "100%", label: "Ruční práce" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-gold text-xl sm:text-2xl md:text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-text-muted text-[10px] sm:text-xs mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#sluzby" className="text-text-muted hover:text-gold transition-colors">
          <ChevronDown size={28} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
