import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

import img01 from "../assets/gallery/01-bmw7-exterior.jpeg";
import img02 from "../assets/gallery/02-bmw7-side.jpeg";
import img03 from "../assets/gallery/03-bmw7-front.jpeg";
import img04 from "../assets/gallery/04-bmw7-interior.jpeg";
import img05 from "../assets/gallery/05-seat-interior.jpeg";
import img06 from "../assets/gallery/06-seat-dashboard.jpeg";
import img07 from "../assets/gallery/07-bmw3-interior.jpeg";
import img08 from "../assets/gallery/08-bmw3-front.jpeg";
import img09 from "../assets/gallery/09-bmw3-side.jpeg";

const galleryItems = [
  { id: 1, src: img01, label: "BMW 7 — Exteriér po detailingu" },
  { id: 2, src: img05, label: "Čištění interiéru — před" },
  { id: 3, src: img04, label: "BMW 7 — Luxusní interiér" },
  { id: 4, src: img02, label: "BMW 7 — Lesk po nano vosku" },
  { id: 5, src: img07, label: "BMW 3 — Interiér po čištění" },
  { id: 6, src: img03, label: "BMW 7 — Dokonalý výsledek" },
  { id: 7, src: img06, label: "Ošetřená palubní deska" },
  { id: 8, src: img08, label: "BMW 3 — Exteriér" },
  { id: 9, src: img09, label: "BMW 3 — Detailing v procesu" },
];

export default function Gallery() {
  return (
    <section id="galerie" className="py-16 sm:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer border border-border hover:border-gold/30 transition-all duration-300"
            >
              {/* Fotka */}
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
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
            className="inline-flex items-center gap-3 bg-surface border border-border rounded-full px-6 py-3 text-text-secondary hover:text-gold hover:border-gold/30 transition-all duration-200 group"
          >
            <Instagram size={20} />
            <span className="text-xs sm:text-sm uppercase tracking-widest">
              Více na Instagramu
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
