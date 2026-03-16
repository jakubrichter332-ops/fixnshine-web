import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

import img01 from "../assets/gallery/01-bmw7-exterior.jpeg";
import img02 from "../assets/gallery/02-bmw7-front.jpeg";
import img03 from "../assets/gallery/03-bmw7-interior.jpeg";
import img04 from "../assets/gallery/04-seat-interior.jpeg";
import img05 from "../assets/gallery/05-seat-dashboard.jpeg";
import img06 from "../assets/gallery/06-bmw3-interior.jpeg";
import img07 from "../assets/gallery/07-bmw3-steering.jpeg";

const galleryItems = [
  { id: 1, src: img01, label: "BMW 7 — Exteriér po detailingu" },
  { id: 2, src: img02, label: "BMW 7 — Dokonalý lesk zepředu" },
  { id: 3, src: img03, label: "BMW 7 — Luxusní interiér" },
  { id: 4, src: img04, label: "Seat Leon — Interiér po čištění" },
  { id: 5, src: img05, label: "Seat Leon — Ošetřená palubní deska" },
  { id: 6, src: img06, label: "BMW 3 — Interiér po detailingu" },
  { id: 7, src: img07, label: "BMW 3 — M volant v detailu" },
];

function GalleryCard({ item }: { item: (typeof galleryItems)[number] }) {
  return (
    <div className="group relative flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-[30vw] aspect-[3/4] rounded-xl overflow-hidden border border-border hover:border-gold/30 transition-all duration-300">
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent flex items-end p-4 sm:p-6">
        <span className="text-text-primary text-xs sm:text-sm font-medium uppercase tracking-widest">
          {item.label}
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="galerie" className="py-16 sm:py-24 bg-surface overflow-hidden">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest font-medium">
            Galerie
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Naše práce{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              mluví za vše
            </span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Prohlédněte si výsledky naší práce. Každé auto opouští naši dílnu
            ve špičkovém stavu.
          </p>
        </motion.div>
      </div>

      {/* Auto-scrolling carousel */}
      <div
        className="relative group/carousel"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="flex gap-4 sm:gap-6 w-max animate-[marquee_40s_linear_infinite] group-hover/carousel:[animation-play-state:paused]">
          {/* Original set */}
          {galleryItems.map((item) => (
            <GalleryCard key={`a-${item.id}`} item={item} />
          ))}
          {/* Duplicated set for seamless loop */}
          {galleryItems.map((item) => (
            <GalleryCard key={`b-${item.id}`} item={item} />
          ))}
        </div>
      </div>

      {/* Instagram CTA */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
