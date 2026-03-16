import { motion } from "framer-motion";
import { Droplets, SprayCan, Sparkles, Car, Star, Settings } from "lucide-react";
import type { ReactNode } from "react";

interface ServiceCard {
  icon: ReactNode;
  program: string;
  title: string;
  description: string;
  price: string;
  popular?: boolean;
}

const services: ServiceCard[] = [
  {
    icon: <Droplets size={28} />,
    program: "Program č.1",
    title: "Kompletní čištění exteriéru",
    description:
      "Předmytí vozu, ruční mytí kol, oplach, ruční mytí šampónem, aplikace nano vosku, vysušení, čištění rámů dveří",
    price: "890 Kč",
  },
  {
    icon: <SprayCan size={28} />,
    program: "Program č.2",
    title: "Základní čištění interiéru",
    description:
      "Vyluxování celého vozu, čištění palubní desky, ošetření plastových ploch, vůně dle výběru, vyleštění skel a zrcátek, ošetření kůže",
    price: "1 290 Kč",
  },
  {
    icon: <Car size={28} />,
    program: "Program č.3",
    title: "Interiér + Exteriér",
    description:
      "Základní čištění interiéru + kompletní čištění exteriéru vozu — kompletní péče v jednom balíčku",
    price: "1 790 Kč",
    popular: true,
  },
  {
    icon: <Sparkles size={28} />,
    program: "Program č.4",
    title: "Tepování interiéru",
    description:
      "Základní čištění interiéru + tepování koberců vozu, koberečků, sedaček, vysušení vozu",
    price: "1 990 Kč",
  },
  {
    icon: <Star size={28} />,
    program: "Program č.5",
    title: "Kompletní detailing",
    description:
      "Tepování interiéru + kompletní čištění exteriéru vozu — naše nejkomplexnější služba pro dokonalý výsledek",
    price: "2 490 Kč",
  },
  {
    icon: <Settings size={28} />,
    program: "Program č.6",
    title: "Individuální tepování",
    description:
      "Tepování sedaček, kufru, koberců, zadní lavice a dalších částí vozu dle vašich potřeb",
    price: "Dle domluvy",
  },
];

export default function Services() {
  return (
    <section id="sluzby" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest font-medium">
            Ceník služeb
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Vyberte si svůj{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              program
            </span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Od základního mytí až po kompletní detailing — každý vůz si zaslouží
            individuální přístup a špičkovou péči.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.program}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group rounded-xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                service.popular
                  ? "bg-gradient-to-b from-gold/10 to-surface border-2 border-gold/30 hover:border-gold/60"
                  : "bg-surface border border-border hover:border-gold/30"
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-primary text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                  Nejoblíbenější
                </div>
              )}

              <div className="text-gold mb-4 sm:mb-5">{service.icon}</div>

              <span className="text-text-muted text-xs uppercase tracking-widest">
                {service.program}
              </span>

              <h3 className="text-lg sm:text-xl font-semibold mt-2 mb-3 text-text-primary group-hover:text-gold transition-colors">
                {service.title}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              <div>
                <span className="text-gold text-2xl sm:text-3xl font-bold">
                  {service.price}
                </span>
              </div>

              <a
                href="#rezervace"
                className={`block text-center mt-6 py-3 rounded text-sm font-semibold uppercase tracking-widest transition-all duration-200 ${
                  service.popular
                    ? "bg-gold text-primary hover:bg-gold-light"
                    : "border border-border text-text-primary hover:border-gold hover:text-gold"
                }`}
              >
                Objednat
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
