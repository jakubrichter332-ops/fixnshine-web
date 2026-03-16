import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

const galleryItems = [
  { id: 1, label: "Exteriér detailing" },
  { id: 2, label: "Interiér čištění" },
  { id: 3, label: "Tepování sedaček" },
  { id: 4, label: "Leštění laku" },
  { id: 5, label: "Nano vosk aplikace" },
  { id: 6, label: "Kompletní detailing" },
];

export default function Gallery() {
  return (
    <section id="galerie" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest font-medium">
            Naše práce
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Galerie{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              proměn
            </span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Podívejte se na výsledky naší práce. Každý vůz opouští naši péči v
            dokonalém stavu.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square bg-surface-light rounded-lg overflow-hidden cursor-pointer border border-border hover:border-gold/30 transition-all duration-300"
            >
              {/* Placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted p-2">
                <div className="w-12 sm:w-16 h-12 sm:h-16 mb-2 sm:mb-3 rounded-full bg-border/30 flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-gold/50" />
                </div>
                <span className="text-xs sm:text-sm text-center">{item.label}</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                <span className="text-text-primary text-xs sm:text-sm font-medium">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 sm:mt-12"
        >
          <a
            href="https://instagram.com/fns_fixnshine"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-text-secondary hover:text-gold transition-colors duration-200 group"
          >
            <Instagram size={20} />
            <span className="text-xs sm:text-sm uppercase tracking-widest">
              Sledujte nás na Instagramu
            </span>
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
